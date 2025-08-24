USE DBProyectoSBD;
GO

-- Trigger 1: Validar que no se inserten reservas con asientos negativos
CREATE TRIGGER TR_ValidarAsientos
ON Reservas
INSTEAD OF INSERT
AS
BEGIN
  IF EXISTS (SELECT 1 FROM inserted WHERE CantidadAsientos <= 0)
  BEGIN
    RAISERROR('La cantidad de asientos debe ser mayor a 0', 16, 1);
    RETURN;
  END
  
  INSERT INTO Reservas
  SELECT * FROM inserted;
END
GO

-- Trigger 2: Actualizar asientos disponibles al insertar reserva
CREATE TRIGGER TR_ActualizarAsientos
ON Reservas
AFTER INSERT
AS
BEGIN
  UPDATE p
  SET AsientosDisponibles = p.AsientosDisponibles - i.CantidadAsientos
  FROM Peliculas p
  INNER JOIN inserted i ON p.Id = i.PeliculaId;
END
GO

-- Trigger 3: Validar que la película esté activa
CREATE TRIGGER TR_ValidarPeliculaActiva
ON Reservas
INSTEAD OF INSERT
AS
BEGIN
  IF EXISTS (
    SELECT 1 FROM inserted i
    INNER JOIN Peliculas p ON i.PeliculaId = p.Id
    WHERE p.Estado != 'Activa'
  )
  BEGIN
    RAISERROR('No se puede reservar una película inactiva', 16, 1);
    RETURN;
  END
  
  INSERT INTO Reservas
  SELECT * FROM inserted;
END
GO

-- Trigger 4: Validar que el usuario esté activo
CREATE TRIGGER TR_ValidarUsuarioActivo
ON Reservas
INSTEAD OF INSERT
AS
BEGIN
  IF EXISTS (
    SELECT 1 FROM inserted i
    INNER JOIN Usuarios u ON i.UsuarioId = u.Id
    WHERE u.Activo = 0
  )
  BEGIN
    RAISERROR('No se puede reservar con un usuario inactivo', 16, 1);
    RETURN;
  END
  
  INSERT INTO Reservas
  SELECT * FROM inserted;
END
GO

PRINT 'Triggers básicos creados.';
GO
