import { Router } from "express";
import bcrypt from "bcryptjs";
import { getPool } from "../config/db.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { fullname, email, password, username } = req.body;
    if (!fullname || !email || !password || !username) return res.status(400).json({ success: false, message: "Faltan campos" });

    // Verificar que el email sea de ESPOL
    if (!email.endsWith('@espol.edu.ec')) {
      return res.status(400).json({ success: false, message: "Solo se permiten correos de ESPOL (@espol.edu.ec)" });
    }

    const pool = await getPool();
    const exists = await pool.request()
      .input("email", email)
      .input("username", username)
      .query("SELECT Id FROM Usuarios WHERE CorreoElectronico = @email OR NombreUsuario = @username");
    
    if (exists.recordset.length) return res.json({ success: false, message: "El correo o nombre de usuario ya está registrado" });

    const hash = await bcrypt.hash(password, 10);
    await pool.request()
      .input("fullname", fullname)
      .input("username", username)
      .input("email", email)
      .input("hash", hash)
      .query("INSERT INTO Usuarios(NombreCompleto, NombreUsuario, CorreoElectronico, Contrasena) VALUES(@fullname, @username, @email, @hash)");

    return res.json({ success: true, message: "Usuario registrado exitosamente" });
  } catch (err) {
    console.error("Error en registro:", err);
    return res.status(500).json({ success: false, message: "Error del servidor" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: "Faltan campos" });

    const pool = await getPool();
    const result = await pool.request()
      .input("email", email)
      .query("SELECT Id, NombreCompleto, NombreUsuario, CorreoElectronico, Contrasena FROM Usuarios WHERE CorreoElectronico = @email AND Activo = 1");
    
    if (!result.recordset.length) return res.json({ success: false, message: "Usuario no encontrado" });

    const user = result.recordset[0];
    const ok = await bcrypt.compare(password, user.Contrasena);
    if (!ok) return res.json({ success: false, message: "Credenciales inválidas" });

    return res.json({
      success: true,
      user: { 
        id: user.Id, 
        fullname: user.NombreCompleto, 
        username: user.NombreUsuario,
        email: user.CorreoElectronico 
      },
      message: "Inicio de sesión exitoso"
    });
  } catch (err) {
    console.error("Error en login:", err);
    return res.status(500).json({ success: false, message: "Error del servidor" });
  }
});

export default router;