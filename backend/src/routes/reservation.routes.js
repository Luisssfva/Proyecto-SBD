import { Router } from "express";
import { getPool } from "../config/db.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { userId, movieId, horarioId, cantidadAsientos, asientosSeleccionados, fechaFuncion, precioUnitario } = req.body;
    
    if (!userId || !movieId || !horarioId || !cantidadAsientos || !fechaFuncion || !precioUnitario) {
      return res.status(400).json({ success: false, message: "Faltan campos requeridos" });
    }

    const pool = await getPool();
    
    // Verificar que la película existe y tiene asientos disponibles
    const movie = await pool.request()
      .input("id", Number(movieId))
      .query("SELECT AsientosDisponibles FROM Peliculas WHERE Id = @id AND Estado = 'Activa'");
    
    if (!movie.recordset.length) {
      return res.json({ success: false, message: "Película no encontrada" });
    }
    
    if (movie.recordset[0].AsientosDisponibles < Number(cantidadAsientos)) {
      return res.json({ success: false, message: "No hay suficientes asientos disponibles" });
    }

    // Crear la reserva usando el procedimiento almacenado
    await pool.request()
      .input("UsuarioId", Number(userId))
      .input("PeliculaId", Number(movieId))
      .input("HorarioId", Number(horarioId))
      .input("CantidadAsientos", Number(cantidadAsientos))
      .input("AsientosSeleccionados", asientosSeleccionados || null)
      .input("FechaFuncion", fechaFuncion)
      .input("PrecioUnitario", Number(precioUnitario))
      .execute("CrearReserva");

    return res.json({ 
      success: true, 
      message: "Reserva creada exitosamente",
      precioTotal: Number(cantidadAsientos) * Number(precioUnitario)
    });
  } catch (err) {
    console.error("Error creando reserva:", err);
    return res.status(500).json({ success: false, message: "Error del servidor" });
  }
});

router.get("/by-user/:userId", async (req, res) => {
  try {
    const pool = await getPool();
    const r = await pool.request()
      .input("uid", Number(req.params.userId))
      .query(`
        SELECT r.Id, r.CantidadAsientos, r.AsientosSeleccionados, r.PrecioTotal, r.Estado, r.FechaReserva, r.FechaFuncion,
               p.Titulo, p.UrlImagen AS ImageUrl,
               h.HoraInicio, h.HoraFin
        FROM Reservas r
        JOIN Peliculas p ON p.Id = r.PeliculaId
        JOIN Horarios h ON h.Id = r.HorarioId
        WHERE r.UsuarioId = @uid
        ORDER BY r.FechaReserva DESC
      `);
    
    return res.json({ success: true, reservations: r.recordset });
  } catch (err) {
    console.error("Error obteniendo reservas:", err);
    return res.status(500).json({ success: false, message: "Error del servidor" });
  }
});

router.put("/:id/cancel", async (req, res) => {
  try {
    const pool = await getPool();
    await pool.request()
      .input("ReservaId", Number(req.params.id))
      .execute("CancelarReserva");
    
    return res.json({ success: true, message: "Reserva cancelada exitosamente" });
  } catch (err) {
    console.error("Error cancelando reserva:", err);
    return res.status(500).json({ success: false, message: "Error del servidor" });
  }
});

export default router;
