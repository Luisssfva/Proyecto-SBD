USE DBProyectoSBD;
GO

-- Índices simples para mejorar búsquedas
CREATE INDEX IX_Usuarios_Correo ON Usuarios(CorreoElectronico);
CREATE INDEX IX_Usuarios_NombreUsuario ON Usuarios(NombreUsuario);

CREATE INDEX IX_Peliculas_Titulo ON Peliculas(Titulo);
CREATE INDEX IX_Peliculas_Genero ON Peliculas(Genero);
CREATE INDEX IX_Peliculas_Estado ON Peliculas(Estado);

CREATE INDEX IX_Reservas_UsuarioId ON Reservas(UsuarioId);
CREATE INDEX IX_Reservas_PeliculaId ON Reservas(PeliculaId);
CREATE INDEX IX_Reservas_FechaFuncion ON Reservas(FechaFuncion);

CREATE INDEX IX_Horarios_PeliculaId ON Horarios(PeliculaId);
CREATE INDEX IX_Horarios_Activo ON Horarios(Activo);

PRINT 'Índices básicos creados.';
GO
