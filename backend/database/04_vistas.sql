USE DBProyectoSBD;
GO

-- Vista 1: Películas con información básica
CREATE VIEW VistaPeliculas AS
SELECT 
  Id,
  Titulo,
  Genero,
  DuracionMinutos,
  Calificacion,
  AsientosTotales,
  AsientosDisponibles,
  Estado
FROM Peliculas;
PRINT 'Vista VistaPeliculas creada.';
GO

-- Vista 2: Reservas con información del usuario
CREATE VIEW VistaReservas AS
SELECT 
  r.Id,
  r.FechaReserva,
  r.FechaFuncion,
  r.CantidadAsientos,
  r.PrecioTotal,
  r.Estado,
  u.NombreCompleto as NombreUsuario,
  p.Titulo as TituloPelicula
FROM Reservas r
INNER JOIN Usuarios u ON r.UsuarioId = u.Id
INNER JOIN Peliculas p ON r.PeliculaId = p.Id;
PRINT 'Vista VistaReservas creada.';
GO

-- Vista 3: Horarios disponibles
CREATE VIEW VistaHorarios AS
SELECT 
  h.Id,
  p.Titulo,
  h.HoraInicio,
  h.HoraFin,
  h.DiaSemana,
  h.Activo
FROM Horarios h
INNER JOIN Peliculas p ON h.PeliculaId = p.Id;
PRINT 'Vista VistaHorarios creada.';
GO

-- Vista 4: Estadísticas simples
CREATE VIEW VistaEstadisticas AS
SELECT 
  p.Titulo,
  p.Genero,
  COUNT(r.Id) as TotalReservas,
  SUM(r.CantidadAsientos) as TotalAsientos
FROM Peliculas p
LEFT JOIN Reservas r ON p.Id = r.PeliculaId
GROUP BY p.Titulo, p.Genero;
PRINT 'Vista VistaEstadisticas creada.';
GO

PRINT 'Todas las vistas han sido creadas.';
GO
