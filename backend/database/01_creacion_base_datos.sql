IF DB_ID('DBProyectoSBD') IS NULL
BEGIN
  CREATE DATABASE DBProyectoSBD;
  PRINT 'Base de datos creada.';
END
GO

USE DBProyectoSBD;
GO

-- Tabla de Usuarios 
CREATE TABLE Usuarios(
  Id INT IDENTITY(1,1) PRIMARY KEY,
  NombreCompleto NVARCHAR(120) NOT NULL,
  NombreUsuario NVARCHAR(50) NOT NULL UNIQUE,
  CorreoElectronico NVARCHAR(120) NOT NULL UNIQUE,
  Contrasena NVARCHAR(255) NOT NULL,
  FechaRegistro DATETIME2 DEFAULT GETDATE(),
  Activo BIT DEFAULT 1
);
PRINT 'Tabla Usuarios creada.';
GO

-- Tabla de Películas
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
  FechaCreacion DATETIME2 DEFAULT GETDATE()
);
PRINT 'Tabla Peliculas creada.';
GO

-- Tabla de Horarios
CREATE TABLE Horarios(
  Id INT IDENTITY(1,1) PRIMARY KEY,
  PeliculaId INT NOT NULL,
  HoraInicio TIME NOT NULL,
  HoraFin TIME NOT NULL,
  DiaSemana NVARCHAR(20) NOT NULL,
  Activo BIT DEFAULT 1,
  FOREIGN KEY (PeliculaId) REFERENCES Peliculas(Id)
);
PRINT 'Tabla Horarios creada.';
GO

-- Tabla de Reservas
CREATE TABLE Reservas(
  Id INT IDENTITY(1,1) PRIMARY KEY,
  UsuarioId INT NOT NULL,
  PeliculaId INT NOT NULL,
  HorarioId INT NOT NULL,
  CantidadAsientos INT NOT NULL,
  AsientosSeleccionados NVARCHAR(200) NULL,
  PrecioTotal DECIMAL(10,2) NOT NULL,
  Estado NVARCHAR(20) DEFAULT 'Confirmada',
  FechaReserva DATETIME2 DEFAULT GETDATE(),
  FechaFuncion DATE NOT NULL,
  FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id),
  FOREIGN KEY (PeliculaId) REFERENCES Peliculas(Id),
  FOREIGN KEY (HorarioId) REFERENCES Horarios(Id)
);
PRINT 'Tabla Reservas creada.';
GO

PRINT 'Todas las tablas han sido creadas.';
GO
