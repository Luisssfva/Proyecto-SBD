import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import bcrypt from "bcryptjs";
import { initConnection, getConnection } from "./config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/assets", express.static(path.join(__dirname, "../../frontend/assets")));
app.use(express.static(path.join(__dirname, "../../frontend")));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../../frontend/index.html")));
app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "../../frontend/login.html")));
app.get("/register", (req, res) => res.sendFile(path.join(__dirname, "../../frontend/register.html")));
app.get("/home", (req, res) => res.sendFile(path.join(__dirname, "../../frontend/home.html")));

const uploadFolder = path.join(__dirname, "../../frontend/assets/uploads");
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadFolder),
    filename: (req, file, cb) => {
        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, `${unique}${ext}`);
    }
});
const upload = multer({ storage });

app.post("/api/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.json({ success: false, message: "Faltan campos" });
        const pool = getConnection();
        const hashed = await bcrypt.hash(password, 10);
        const result = await pool.request()
            .input("email", email)
            .input("password", hashed)
            .query("INSERT INTO Users (Email, PasswordHash) VALUES (@email, @password); SELECT SCOPE_IDENTITY() as id;");
        return res.json({ success: true, redirect: "/login" });
    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
});

app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.json({ success: false, message: "Faltan campos" });
        const pool = getConnection();
        const dbRes = await pool.request()
            .input("email", email)
            .query("SELECT Id, Email, PasswordHash FROM Users WHERE Email = @email");
        const user = dbRes.recordset[0];
        if (!user) return res.json({ success: false, message: "Usuario no encontrado" });
        const match = await bcrypt.compare(password, user.PasswordHash);
        if (!match) return res.json({ success: false, message: "Credenciales inválidas" });
        return res.json({ success: true, redirect: "/home", userId: user.Id });
    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
});

app.get("/api/movies", async (req, res) => {
    try {
        const pool = getConnection();
        const dbRes = await pool.request().query("SELECT Id, Title, Genre, Duration, Synopsis, ImagePath, SeatsAvailable FROM Movies");
        return res.json({ success: true, movies: dbRes.recordset });
    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
});

app.post("/api/movies/upload", upload.single("poster"), async (req, res) => {
    try {
        const { title, genre, duration, synopsis, seats } = req.body;
        const file = req.file;
        const imagePath = file ? `/assets/uploads/${file.filename}` : null;
        const pool = getConnection();
        await pool.request()
            .input("title", title)
            .input("genre", genre)
            .input("duration", duration)
            .input("synopsis", synopsis)
            .input("imagePath", imagePath)
            .input("seatsAvailable", seats || 100)
            .query("INSERT INTO Movies (Title, Genre, Duration, Synopsis, ImagePath, SeatsAvailable) VALUES (@title, @genre, @duration, @synopsis, @imagePath, @seatsAvailable)");
        return res.json({ success: true });
    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
});

app.post("/api/reserve", async (req, res) => {
    try {
        const { userId, movieId, rowNumber, quantity, time } = req.body;
        if (!userId || !movieId || !quantity) return res.json({ success: false, message: "Faltan campos" });
        const pool = getConnection();
        const movieRes = await pool.request().input("id", movieId).query("SELECT SeatsAvailable FROM Movies WHERE Id = @id");
        const movie = movieRes.recordset[0];
        if (!movie) return res.json({ success: false, message: "Pelicula no existe" });
        if (movie.SeatsAvailable < quantity) return res.json({ success: false, message: "No hay suficientes boletos disponibles" });
        await pool.request()
            .input("movieId", movieId)
            .input("userId", userId)
            .input("rowNumber", rowNumber)
            .input("quantity", quantity)
            .input("time", time)
            .query("INSERT INTO Reservations (MovieId, UserId, RowNumber, Quantity, Showtime, CreatedAt) VALUES (@movieId, @userId, @rowNumber, @quantity, @time, GETDATE())");
        await pool.request().input("qty", quantity).input("id", movieId).query("UPDATE Movies SET SeatsAvailable = SeatsAvailable - @qty WHERE Id = @id");
        return res.json({ success: true });
    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
});

app.get("/api/movie/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const pool = getConnection();
        const dbRes = await pool.request().input("id", id).query("SELECT Id, Title, Genre, Duration, Synopsis, ImagePath, SeatsAvailable FROM Movies WHERE Id = @id");
        const movie = dbRes.recordset[0];
        if (!movie) return res.json({ success: false, message: "No encontrado" });
        return res.json({ success: true, movie });
    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
});

const PORT = process.env.PORT || 3000;

initConnection().then(() => {
    const server = app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            const newPort = Number(PORT) + 1;
            app.listen(newPort, () => {
                console.log(`Puerto ${PORT} ocupado, usando puerto ${newPort}...`);
                console.log(`Servidor corriendo en http://localhost:${newPort}`);
            });
        }
    });
}).catch(err => {
    console.error('No fue posible iniciar el servidor por error de DB:', err.message);
    process.exit(1);
});
