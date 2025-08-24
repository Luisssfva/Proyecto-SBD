# Backend CinePolito

## Configuración

### 1. Variables de Entorno

Crea un archivo `.env` en la raíz del backend con la siguiente configuración:

```env
# Configuración de la Base de Datos
DB_SERVER=localhost
DB_DATABASE=DBProyectoSBD
DB_PORT=1433
DB_USER=sa
DB_PASSWORD=your_password_here
DB_TRUSTED=true

# Configuración del Servidor
PORT=4000

# Configuración de Archivos
STATIC_UPLOADS_DIR=public/images/posters

# Configuración de Seguridad
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

### 2. Instalación de Dependencias

```bash
npm install
```

### 3. Base de Datos

1. Ejecuta el script SQL en SQL Server Management Studio
2. Asegúrate de que la base de datos `DBProyectoSBD` esté creada
3. Verifica que las tablas estén creadas correctamente

### 4. Ejecutar el Servidor

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## Endpoints Disponibles

### Autenticación
- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Inicio de sesión

### Películas
- `GET /api/movies` - Obtener todas las películas
- `GET /api/movies/:id` - Obtener película por ID
- `GET /api/movies/:id/horarios` - Obtener horarios de una película
- `POST /api/movies/:id/poster` - Subir poster de película

### Reservas
- `POST /api/reservations` - Crear nueva reserva
- `GET /api/reservations/by-user/:userId` - Obtener reservas de un usuario
- `PUT /api/reservations/:id/cancel` - Cancelar reserva

### Salud del Servidor
- `GET /api/health` - Verificar estado del servidor

## Estructura del Proyecto

```
backend/
├── src/
│   ├── config/
│   │   └── db.js          # Configuración de base de datos
│   ├── routes/
│   │   ├── auth.routes.js      # Rutas de autenticación
│   │   ├── movies.routes.js    # Rutas de películas
│   │   └── reservation.routes.js # Rutas de reservas
│   └── server.js          # Servidor principal
├── database/
│   └── script.sql         # Script de base de datos
├── package.json
└── README.md
```

## Notas Importantes

- Solo se permiten correos de ESPOL (@espol.edu.ec)
- Las contraseñas se encriptan con bcrypt
- Se usan procedimientos almacenados para las reservas
- El servidor corre en el puerto 4000 por defecto
