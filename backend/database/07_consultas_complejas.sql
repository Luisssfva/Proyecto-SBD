USE DBProyectoSBD;
GO

-- Consulta 1: Mostrar todas las películas activas
PRINT '=== CONSULTA 1: Películas activas ===';
SELECT Id, Titulo, Genero, DuracionMinutos, Calificacion, AsientosDisponibles
FROM Peliculas 
WHERE Estado = 'Activa'
ORDER BY Titulo;
GO

-- Consulta 2: Mostrar reservas con información del usuario y película
PRINT '=== CONSULTA 2: Reservas con información completa ===';
SELECT 
  r.Id,
  r.FechaReserva,
  r.FechaFuncion,
  r.CantidadAsientos,
  r.PrecioTotal,
  r.Estado,
  u.NombreCompleto as Usuario,
  p.Titulo as Pelicula
FROM Reservas r
INNER JOIN Usuarios u ON r.UsuarioId = u.Id
INNER JOIN Peliculas p ON r.PeliculaId = p.Id
ORDER BY r.FechaReserva DESC;
GO

-- Consulta 3: Contar reservas por película
PRINT '=== CONSULTA 3: Total de reservas por película ===';
SELECT 
  p.Titulo,
  COUNT(r.Id) as TotalReservas,
  SUM(r.CantidadAsientos) as TotalAsientos
FROM Peliculas p
LEFT JOIN Reservas r ON p.Id = r.PeliculaId
GROUP BY p.Titulo
ORDER BY TotalReservas DESC;
GO

-- Consulta 4: Mostrar horarios disponibles
PRINT '=== CONSULTA 4: Horarios disponibles ===';
SELECT 
  p.Titulo,
  h.HoraInicio,
  h.HoraFin,
  h.DiaSemana
FROM Horarios h
INNER JOIN Peliculas p ON h.PeliculaId = p.Id
WHERE h.Activo = 1
ORDER BY p.Titulo, h.HoraInicio;
GO

-- Consulta 5: Mostrar usuarios con sus reservas
PRINT '=== CONSULTA 5: Usuarios y sus reservas ===';
SELECT 
  u.NombreCompleto,
  u.CorreoElectronico,
  COUNT(r.Id) as TotalReservas,
  SUM(r.PrecioTotal) as TotalGastado
FROM Usuarios u
LEFT JOIN Reservas r ON u.Id = r.UsuarioId
GROUP BY u.NombreCompleto, u.CorreoElectronico
ORDER BY TotalReservas DESC;
GO

PRINT 'Consultas básicas ejecutadas.';
GO
