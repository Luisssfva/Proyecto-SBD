-- Script del proyecto con instrucciones.


-- Crear la base de datos si no existe
IF DB_ID('DBProyectoSBD') IS NULL
BEGIN
  CREATE DATABASE DBProyectoSBD;
  PRINT 'Base de datos DBProyectoSBD creada exitosamente.';
END
ELSE
BEGIN
  PRINT 'La base de datos DBProyectoSBD ya existe.';
END
GO

-- Usar la base de datos
USE DBProyectoSBD;
GO

-- Tabla de Usuarios 
IF OBJECT_ID('Usuarios','U') IS NULL
BEGIN
  CREATE TABLE Usuarios(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    NombreCompleto NVARCHAR(120) NOT NULL,
    NombreUsuario NVARCHAR(50) NOT NULL UNIQUE,
    CorreoElectronico NVARCHAR(120) NOT NULL UNIQUE,
    Contrasena NVARCHAR(255) NOT NULL,
    FechaRegistro DATETIME2 DEFAULT SYSDATETIME(),
    Activo BIT DEFAULT 1,
    CONSTRAINT CK_CorreoESPOL CHECK (CorreoElectronico LIKE '%@espol.edu.ec')
  );
  PRINT 'Tabla Usuarios creada exitosamente.';
END
GO

-- Tablas de películas
IF OBJECT_ID('Peliculas','U') IS NULL
BEGIN
  CREATE TABLE Peliculas(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Titulo NVARCHAR(200) NOT NULL,
    Genero NVARCHAR(60) NOT NULL,
    DuracionMinutos INT NOT NULL,
    Sinopsis NVARCHAR(1000) NOT NULL,
    Calificacion DECIMAL(2,1) DEFAULT 0.0,
    UrlImagen NVARCHAR(400) NULL,
    AsientosTotales INT NOT NULL DEFAULT 100,
    AsientosDisponibles INT NOT NULL DEFAULT 100,
    Estado NVARCHAR(20) DEFAULT 'Activa',
    FechaCreacion DATETIME2 DEFAULT SYSDATETIME(),
    CONSTRAINT CK_Calificacion CHECK (Calificacion >= 0.0 AND Calificacion <= 5.0),
    CONSTRAINT CK_Asientos CHECK (AsientosDisponibles >= 0 AND AsientosDisponibles <= AsientosTotales)
  );
  PRINT 'Tabla Peliculas creada exitosamente.';
END
GO

-- Tablas de Horarios
IF OBJECT_ID('Horarios','U') IS NULL
BEGIN
  CREATE TABLE Horarios(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    PeliculaId INT NOT NULL,
    HoraInicio TIME NOT NULL,
    HoraFin TIME NOT NULL,
    DiaSemana NVARCHAR(20) NOT NULL,
    Activo BIT DEFAULT 1,
    CONSTRAINT FK_Horarios_Peliculas FOREIGN KEY (PeliculaId) REFERENCES Peliculas(Id) ON DELETE NO ACTION
  );
  PRINT 'Tabla Horarios creada exitosamente.';
END
GO

-- Tablas de reservas
IF OBJECT_ID('Reservas','U') IS NULL
BEGIN
  CREATE TABLE Reservas(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UsuarioId INT NOT NULL,
    PeliculaId INT NOT NULL,
    HorarioId INT NOT NULL,
    CantidadAsientos INT NOT NULL,
    AsientosSeleccionados NVARCHAR(200) NULL,
    FilaAsiento NVARCHAR(10) NULL,
    PrecioTotal DECIMAL(10,2) NOT NULL,
    Estado NVARCHAR(20) DEFAULT 'Confirmada',
    FechaReserva DATETIME2 DEFAULT SYSDATETIME(),
    FechaFuncion DATE NOT NULL,
    CONSTRAINT FK_Reservas_Usuarios FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id) ON DELETE NO ACTION,
    CONSTRAINT FK_Reservas_Peliculas FOREIGN KEY (PeliculaId) REFERENCES Peliculas(Id) ON DELETE NO ACTION,
    CONSTRAINT FK_Reservas_Horarios FOREIGN KEY (HorarioId) REFERENCES Horarios(Id) ON DELETE NO ACTION,
    CONSTRAINT CK_CantidadAsientos CHECK (CantidadAsientos > 0 AND CantidadAsientos <= 10),
    CONSTRAINT CK_PrecioTotal CHECK (PrecioTotal > 0)
  );
  PRINT 'Tabla Reservas creada exitosamente.';
END
GO


-- INSERT de las películas
IF NOT EXISTS(SELECT 1 FROM Peliculas)
BEGIN
  INSERT INTO Peliculas (Titulo, Genero, DuracionMinutos, Sinopsis, Calificacion, AsientosTotales, AsientosDisponibles) VALUES
  (N'Avengers: Endgame', N'Acción/Aventura', 181, N'Los Vengadores se reúnen una vez más para revertir las acciones de Thanos y restaurar el equilibrio del universo en esta épica conclusión que cambiará el destino de la humanidad para siempre.', 4.9, 120, 120),
  (N'Dune', N'Ciencia Ficción', 155, N'Paul Atreides, un joven brillante y talentoso, debe viajar al planeta más peligroso del universo para asegurar el futuro de su familia y su pueblo mientras enfrenta terribles secretos del pasado.', 4.8, 100, 100),
  (N'Interestelar', N'Ciencia Ficción', 169, N'Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento de asegurar la supervivencia de la humanidad mientras enfrenta dilemas morales y físicos.', 4.9, 90, 90),
  (N'The Dark Knight', N'Acción/Drama', 152, N'Batman se enfrenta al mayor desafío psicológico y físico de su carrera cuando el misterioso Joker desata el caos en Gotham City, poniendo a prueba los límites de la justicia.', 4.9, 110, 110);
  PRINT 'Películas iniciales insertadas.';
END
GO

-- Insertar horarios para las películas
IF NOT EXISTS(SELECT 1 FROM Horarios)
BEGIN
  -- Horarios para Avengers: Endgame
  INSERT INTO Horarios (PeliculaId, HoraInicio, HoraFin, DiaSemana) VALUES
  (1, '14:00', '17:01', N'Lunes a Viernes'),
  (1, '17:00', '20:01', N'Lunes a Viernes'),
  (1, '20:00', '23:01', N'Lunes a Viernes');
  
  -- Horarios para Dune
  INSERT INTO Horarios (PeliculaId, HoraInicio, HoraFin, DiaSemana) VALUES
  (2, '14:00', '16:35', N'Lunes a Viernes'),
  (2, '17:00', '19:35', N'Lunes a Viernes'),
  (2, '20:00', '22:35', N'Lunes a Viernes');
  
  -- Horarios para Interestelar
  INSERT INTO Horarios (PeliculaId, HoraInicio, HoraFin, DiaSemana) VALUES
  (3, '14:00', '16:49', N'Lunes a Viernes'),
  (3, '17:00', '19:49', N'Lunes a Viernes'),
  (3, '20:00', '22:49', N'Lunes a Viernes');
  
  -- Horarios para The Dark Knight
  INSERT INTO Horarios (PeliculaId, HoraInicio, HoraFin, DiaSemana) VALUES
  (4, '14:00', '16:32', N'Lunes a Viernes'),
  (4, '17:00', '19:32', N'Lunes a Viernes'),
  (4, '20:00', '22:32', N'Lunes a Viernes');
  
  PRINT 'Horarios iniciales insertados.';
END
GO


-- SECCIÓN DE INDICES

-- Índices para la tabla Usuarios
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Usuarios_Correo' AND object_id = OBJECT_ID('Usuarios'))
BEGIN
  CREATE INDEX IX_Usuarios_Correo ON Usuarios(CorreoElectronico);
END

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Usuarios_NombreUsuario' AND object_id = OBJECT_ID('Usuarios'))
BEGIN
  CREATE INDEX IX_Usuarios_NombreUsuario ON Usuarios(NombreUsuario);
END

-- Índices para la tabla Peliculas
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Peliculas_Titulo' AND object_id = OBJECT_ID('Peliculas'))
BEGIN
  CREATE INDEX IX_Peliculas_Titulo ON Peliculas(Titulo);
END

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Peliculas_Genero' AND object_id = OBJECT_ID('Peliculas'))
BEGIN
  CREATE INDEX IX_Peliculas_Genero ON Peliculas(Genero);
END

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Peliculas_Estado' AND object_id = OBJECT_ID('Peliculas'))
BEGIN
  CREATE INDEX IX_Peliculas_Estado ON Peliculas(Estado);
END

-- Índices para la tabla Reservas
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Reservas_UsuarioId' AND object_id = OBJECT_ID('Reservas'))
BEGIN
  CREATE INDEX IX_Reservas_UsuarioId ON Reservas(UsuarioId);
END

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Reservas_PeliculaId' AND object_id = OBJECT_ID('Reservas'))
BEGIN
  CREATE INDEX IX_Reservas_PeliculaId ON Reservas(PeliculaId);
END

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Reservas_FechaFuncion' AND object_id = OBJECT_ID('Reservas'))
BEGIN
  CREATE INDEX IX_Reservas_FechaFuncion ON Reservas(FechaFuncion);
END

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Reservas_Estado' AND object_id = OBJECT_ID('Reservas'))
BEGIN
  CREATE INDEX IX_Reservas_Estado ON Reservas(Estado);
END

-- Índices para la tabla Horarios
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Horarios_PeliculaId' AND object_id = OBJECT_ID('Horarios'))
BEGIN
  CREATE INDEX IX_Horarios_PeliculaId ON Horarios(PeliculaId);
END

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Horarios_HoraInicio' AND object_id = OBJECT_ID('Horarios'))
BEGIN
  CREATE INDEX IX_Horarios_HoraInicio ON Horarios(HoraInicio);
END

PRINT 'Índices creados para optimizar consultas.';
GO

-- SECCIÓN DE VISTAS

-- Vista para mostrar información completa de películas
IF OBJECT_ID('VistaPeliculasCompletas','V') IS NULL
BEGIN
  EXEC('CREATE VIEW VistaPeliculasCompletas AS
  SELECT 
    p.Id,
    p.Titulo,
    p.Genero,
    p.DuracionMinutos,
    p.Sinopsis,
    p.Calificacion,
    p.UrlImagen,
    p.AsientosTotales,
    p.AsientosDisponibles,
    p.Estado,
    p.FechaCreacion,
    COUNT(h.Id) as TotalHorarios
  FROM Peliculas p
  LEFT JOIN Horarios h ON p.Id = h.PeliculaId AND h.Activo = 1
  GROUP BY p.Id, p.Titulo, p.Genero, p.DuracionMinutos, p.Sinopsis, 
           p.Calificacion, p.UrlImagen, p.AsientosTotales, p.AsientosDisponibles, 
           p.Estado, p.FechaCreacion');
  PRINT 'Vista VistaPeliculasCompletas creada.';
END
GO

-- Vista para mostrar reservas con información completa
IF OBJECT_ID('VistaReservasCompletas','V') IS NULL
BEGIN
  EXEC('CREATE VIEW VistaReservasCompletas AS
  SELECT 
    r.Id,
    r.FechaReserva,
    r.FechaFuncion,
    r.CantidadAsientos,
    r.AsientosSeleccionados,
    r.PrecioTotal,
    r.Estado,
    u.NombreCompleto as NombreUsuario,
    u.CorreoElectronico,
    p.Titulo as TituloPelicula,
    h.HoraInicio,
    h.HoraFin
  FROM Reservas r
  INNER JOIN Usuarios u ON r.UsuarioId = u.Id
  INNER JOIN Peliculas p ON r.PeliculaId = p.Id
  INNER JOIN Horarios h ON r.HorarioId = h.Id');
  PRINT 'Vista VistaReservasCompletas creada.';
END
GO

-- SECCIÓN DE PROCEDIMIENTOS

-- Procedimiento para crear una nueva reserva
IF OBJECT_ID('CrearReserva','P') IS NULL
BEGIN
  EXEC('CREATE PROCEDURE CrearReserva
    @UsuarioId INT,
    @PeliculaId INT,
    @HorarioId INT,
    @CantidadAsientos INT,
    @AsientosSeleccionados NVARCHAR(200),
    @FechaFuncion DATE,
    @PrecioUnitario DECIMAL(10,2)
  AS
  BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
      -- Verificar disponibilidad de asientos
      DECLARE @AsientosDisponibles INT;
      SELECT @AsientosDisponibles = AsientosDisponibles 
      FROM Peliculas WHERE Id = @PeliculaId;
      
      IF @AsientosDisponibles < @CantidadAsientos
        THROW 50001, ''No hay suficientes asientos disponibles'', 1;
      
      -- Crear la reserva
      INSERT INTO Reservas (UsuarioId, PeliculaId, HorarioId, CantidadAsientos, 
                           AsientosSeleccionados, PrecioTotal, FechaFuncion)
      VALUES (@UsuarioId, @PeliculaId, @HorarioId, @CantidadAsientos, 
              @AsientosSeleccionados, @CantidadAsientos * @PrecioUnitario, @FechaFuncion);
      
      -- Actualizar asientos disponibles
      UPDATE Peliculas 
      SET AsientosDisponibles = AsientosDisponibles - @CantidadAsientos
      WHERE Id = @PeliculaId;
      
      COMMIT TRANSACTION;
      PRINT ''Reserva creada exitosamente.'';
    END TRY
    BEGIN CATCH
      ROLLBACK TRANSACTION;
      THROW;
    END CATCH
  END');
  PRINT 'Procedimiento CrearReserva creado.';
END
GO

-- Procedimiento para cancelar una reserva
IF OBJECT_ID('CancelarReserva','P') IS NULL
BEGIN
  EXEC('CREATE PROCEDURE CancelarReserva
    @ReservaId INT
  AS
  BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
      DECLARE @PeliculaId INT, @CantidadAsientos INT;
      
      SELECT @PeliculaId = PeliculaId, @CantidadAsientos = CantidadAsientos
      FROM Reservas WHERE Id = @ReservaId;
      
      IF @@ROWCOUNT = 0
        THROW 50002, ''Reserva no encontrada'', 1;
      
      -- Cancelar la reserva
      UPDATE Reservas SET Estado = ''Cancelada'' WHERE Id = @ReservaId;
      
      -- Liberar asientos
      UPDATE Peliculas 
      SET AsientosDisponibles = AsientosDisponibles + @CantidadAsientos
      WHERE Id = @PeliculaId;
      
      COMMIT TRANSACTION;
      PRINT ''Reserva cancelada exitosamente.'';
    END TRY
    BEGIN CATCH
      ROLLBACK TRANSACTION;
      THROW;
    END CATCH
  END');
  PRINT 'Procedimiento CancelarReserva creado.';
END
GO



