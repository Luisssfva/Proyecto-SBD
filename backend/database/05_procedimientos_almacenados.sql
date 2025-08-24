USE DBProyectoSBD;
GO

-- Procedimiento 1: Crear una reserva
CREATE PROCEDURE CrearReserva
  @UsuarioId INT,
  @PeliculaId INT,
  @HorarioId INT,
  @CantidadAsientos INT,
  @PrecioUnitario DECIMAL(10,2)
AS
BEGIN
  DECLARE @PrecioTotal DECIMAL(10,2);
  SET @PrecioTotal = @CantidadAsientos * @PrecioUnitario;
  
  INSERT INTO Reservas (UsuarioId, PeliculaId, HorarioId, CantidadAsientos, PrecioTotal, FechaFuncion)
  VALUES (@UsuarioId, @PeliculaId, @HorarioId, @CantidadAsientos, @PrecioTotal, GETDATE() + 1);
  
  UPDATE Peliculas 
  SET AsientosDisponibles = AsientosDisponibles - @CantidadAsientos
  WHERE Id = @PeliculaId;
  
  PRINT 'Reserva creada exitosamente.';
END
GO

-- Procedimiento 2: Cancelar una reserva
CREATE PROCEDURE CancelarReserva
  @ReservaId INT
AS
BEGIN
  DECLARE @PeliculaId INT;
  DECLARE @CantidadAsientos INT;
  
  SELECT @PeliculaId = PeliculaId, @CantidadAsientos = CantidadAsientos
  FROM Reservas WHERE Id = @ReservaId;
  
  UPDATE Reservas SET Estado = 'Cancelada' WHERE Id = @ReservaId;
  
  UPDATE Peliculas 
  SET AsientosDisponibles = AsientosDisponibles + @CantidadAsientos
  WHERE Id = @PeliculaId;
  
  PRINT 'Reserva cancelada.';
END
GO

-- Procedimiento 3: Obtener películas por género
CREATE PROCEDURE ObtenerPeliculasPorGenero
  @Genero NVARCHAR(60)
AS
BEGIN
  SELECT Id, Titulo, Genero, DuracionMinutos, Calificacion, AsientosDisponibles
  FROM Peliculas 
  WHERE Genero = @Genero AND Estado = 'Activa';
END
GO

-- Procedimiento 4: Obtener reservas de un usuario
CREATE PROCEDURE ObtenerReservasUsuario
  @UsuarioId INT
AS
BEGIN
  SELECT r.Id, r.FechaReserva, r.FechaFuncion, r.CantidadAsientos, r.PrecioTotal, r.Estado,
         p.Titulo as Pelicula
  FROM Reservas r
  INNER JOIN Peliculas p ON r.PeliculaId = p.Id
  WHERE r.UsuarioId = @UsuarioId
  ORDER BY r.FechaReserva DESC;
END
GO

PRINT 'Procedimientos almacenados creados.';
GO
