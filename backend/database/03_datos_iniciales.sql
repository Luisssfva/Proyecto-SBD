-- Este script es solo para agregar los datos a la cartelera
USE DBProyectoSBD;
GO

-- Insertar las películas del frontend
INSERT INTO Peliculas (Titulo, Genero, DuracionMinutos, Sinopsis, Calificacion, AsientosTotales, AsientosDisponibles) VALUES
('Avengers: Endgame', 'Acción/Aventura', 181, 'Los Vengadores se reúnen una vez más para revertir las acciones de Thanos y restaurar el equilibrio del universo en esta épica conclusión.', 4.9, 120, 120),
('Dune', 'Ciencia Ficción', 155, 'Paul Atreides, un joven brillante y talentoso, debe viajar al planeta más peligroso del universo para asegurar el futuro de su familia y su pueblo.', 4.8, 100, 100),
('Interestelar', 'Ciencia Ficción', 169, 'Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento de asegurar la supervivencia de la humanidad.', 4.9, 90, 90),
('The Dark Knight', 'Acción/Drama', 152, 'Batman se enfrenta al mayor desafío psicológico y físico de su carrera cuando el misterioso Joker desata el caos en Gotham City.', 4.9, 110, 110);
PRINT 'Películas insertadas.';
GO

-- Insertar horarios básicos
INSERT INTO Horarios (PeliculaId, HoraInicio, HoraFin, DiaSemana) VALUES
(1, '14:00', '17:01', 'Lunes a Viernes'),
(1, '17:00', '20:01', 'Lunes a Viernes'),
(1, '20:00', '23:01', 'Lunes a Viernes'),
(2, '14:00', '16:35', 'Lunes a Viernes'),
(2, '17:00', '19:35', 'Lunes a Viernes'),
(2, '20:00', '22:35', 'Lunes a Viernes'),
(3, '14:00', '16:49', 'Lunes a Viernes'),
(3, '17:00', '19:49', 'Lunes a Viernes'),
(3, '20:00', '22:49', 'Lunes a Viernes'),
(4, '14:00', '16:32', 'Lunes a Viernes'),
(4, '17:00', '19:32', 'Lunes a Viernes'),
(4, '20:00', '22:32', 'Lunes a Viernes');
PRINT 'Horarios insertados.';
GO

-- Insertar usuarios de prueba
INSERT INTO Usuarios (NombreCompleto, NombreUsuario, CorreoElectronico, Contrasena) VALUES
('Juan Pérez', 'juan.perez', 'juan.perez@espol.edu.ec', 'password123'),
('María Rodríguez', 'maria.rodriguez', 'maria.rodriguez@espol.edu.ec', 'password456');
PRINT 'Usuarios de prueba insertados.';
GO

PRINT 'Datos iniciales completados.';
GO
