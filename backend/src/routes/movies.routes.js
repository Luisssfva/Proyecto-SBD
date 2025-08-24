import { Router } from "express";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import fs from "fs";
import { getPool } from "../config/db.js";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, "../../", process.env.STATIC_UPLOADS_DIR || "public/images/posters");
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadsDir),
  filename: (_, file, cb) => cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get("/", async (_, res) => {
  try {
    const pool = await getPool();
    const r = await pool.request().query(`
      SELECT Id, Titulo, Genero, DuracionMinutos AS Duration, Sinopsis, UrlImagen AS ImageUrl, 
             AsientosTotales AS SeatsTotal, AsientosDisponibles AS SeatsAvailable, Calificacion
      FROM Peliculas
      WHERE Estado = 'Activa'
      ORDER BY Id DESC
    `);
    return res.json({ success: true, movies: r.recordset });
  } catch (err) {
    console.error("Error obteniendo películas:", err);
    return res.status(500).json({ success: false, message: "Error del servidor" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const pool = await getPool();
    const r = await pool.request()
      .input("id", Number(req.params.id))
      .query(`
        SELECT Id, Titulo, Genero, DuracionMinutos AS Duration, Sinopsis, UrlImagen AS ImageUrl, 
               AsientosTotales AS SeatsTotal, AsientosDisponibles AS SeatsAvailable, Calificacion
        FROM Peliculas 
        WHERE Id = @id AND Estado = 'Activa'
      `);
    
    if (!r.recordset.length) return res.json({ success: false, message: "Película no encontrada" });
    return res.json({ success: true, movie: r.recordset[0] });
  } catch (err) {
    console.error("Error obteniendo película:", err);
    return res.status(500).json({ success: false, message: "Error del servidor" });
  }
});

router.get("/:id/horarios", async (req, res) => {
  try {
    const pool = await getPool();
    const r = await pool.request()
      .input("id", Number(req.params.id))
      .query(`
        SELECT Id, HoraInicio, HoraFin, DiaSemana
        FROM Horarios 
        WHERE PeliculaId = @id AND Activo = 1
        ORDER BY HoraInicio
      `);
    
    return res.json({ success: true, horarios: r.recordset });
  } catch (err) {
    console.error("Error obteniendo horarios:", err);
    return res.status(500).json({ success: false, message: "Error del servidor" });
  }
});

router.post("/:id/poster", upload.single("poster"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "Sin archivo" });
    const rel = "/images/posters/" + req.file.filename;
    const pool = await getPool();
    await pool.request()
      .input("url", rel)
      .input("id", Number(req.params.id))
      .query("UPDATE Peliculas SET UrlImagen = @url WHERE Id = @id");
    
    return res.json({ success: true, url: rel });
  } catch (err) {
    console.error("Error subiendo poster:", err);
    return res.status(500).json({ success: false, message: "Error del servidor" });
  }
});

export default router;
