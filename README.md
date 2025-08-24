# CinePolito - Sistema de Reservas de Cine

Este es un proyecto para la materia de Sistemas de Bases de Datos, somos 4 estudiantes de la Escuela Superior Politécnica del Litoral 🐢, hicimos este proyecto con esfuerzo y dedicación espero les guste <3.

## Autores

- Luis Daniel Flores
- Anthony Mosquera
- Andrey Arias
- Anthony Paredes

## Características

- Interfaz moderna con diseño responsive
- Sistema de autenticación (login/registro)
- Reserva de entradas con selección de películas, horarios y asientos
- Animaciones fluidas con Framer Motion
- Compatible con dispositivos móviles

## Tecnologías

- **Frontend**: React 18, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **Base de Datos**: SQL Server Management Studio
- **Iconos**: React Icons

## Instalación

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd // Ruta donde guardaste tu repositorio localmente //
   ```

2. **Instala dependencias del frontend**
   ```bash
   npm install
   ```

3. **Instala dependencias del backend**
   ```bash
   cd backend
   npm install
   ```

4. **Configura la base de datos**
   - Ejecuta los scripts SQL en `backend/database/`
   - Configura las credenciales en `backend/src/config/db.js`

5. **Inicia el servidor backend**
   ```bash
   cd backend
   npm start
   ```

6. **Inicia el frontend**
   ```bash
   npm start
   ```

7. **Abre tu navegador**
   ```
   http://localhost:3000
   ```

## Funcionalidades

### Autenticación
- Login con validación de campos
- Registro de nuevos usuarios
- Gestión de sesiones

### Reserva de Entradas
- Visualización de cartelera de películas
- Selección de horarios disponibles (14:00, 17:00, 20:00)
- Mapa interactivo de asientos
- Confirmación y gestión de reservas

## Estructura del Proyecto

```
ProyectoSBDFront/
├── src/                    # Frontend React
│   ├── components/
│   │   ├── Login.js       # Componente de autenticación
│   │   ├── Register.js    # Componente de registro
│   │   ├── Main.js        # Componente principal de reservas
│   │   ├── Loading.js     # Componente de carga
│   │   └── Notification.js # Componente de notificaciones
│   ├── App.js             # Componente principal
│   ├── index.js           # Punto de entrada
│   └── index.css          # Estilos globales
├── backend/               # Servidor Node.js
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js      # Configuración de base de datos
│   │   ├── routes/
│   │   │   ├── auth.routes.js      # Rutas de autenticación
│   │   │   ├── movies.routes.js    # Rutas de películas
│   │   │   └── reservation.routes.js # Rutas de reservas
│   │   └── server.js      # Servidor principal
│   └── database/          # Scripts SQL
│       ├── 01_creacion_base_datos.sql
│       ├── 02_indices_optimizacion.sql
│       ├── 03_datos_iniciales.sql
│       ├── 04_vistas.sql
│       ├── 05_procedimientos_almacenados.sql
│       ├── 06_triggers.sql
│       └── 07_consultas_complejas.sql
├── public/                # Archivos estáticos
└── package.json           # Dependencias del frontend
```

## Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas


## Compatibilidad

- Chrome, Firefox, Safari, Edge



