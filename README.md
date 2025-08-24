# CinePolito - Sistema de Reservas de Cine

Este es un proyecto de la materia Sistemas de Bases de Datos, nuestro grupo está conformado por los estudiantes:

- Luis Daniel Flores


## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz elegante con gradientes y animaciones suaves
- 🔐 **Autenticación**: Sistema de login y registro con validaciones
- 🎟️ **Reserva de Entradas**: Selección de películas, horarios y asientos
- 📱 **Responsive**: Diseño adaptativo para todos los dispositivos
- ⚡ **Animaciones**: Transiciones fluidas con Framer Motion
- 🎯 **UX Mejorada**: Feedback visual y estados de carga

## 🚀 Tecnologías Utilizadas

- **React 18** - Biblioteca de interfaz de usuario
- **Tailwind CSS** - Framework de CSS utilitario
- **Framer Motion** - Biblioteca de animaciones
- **React Icons** - Iconografía moderna
- **PostCSS** - Procesador de CSS

## 📦 Instalación

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd ProyectoSBDFront
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm start
   ```

4. **Abre tu navegador**
   ```
   http://localhost:3000
   ```

## 🎯 Uso

### Página Principal
- Visualiza la página de bienvenida con información sobre CinePolito
- Navega entre las opciones de inicio de sesión y registro

### Autenticación
- **Login**: Usa cualquier usuario y contraseña para probar la aplicación
- **Registro**: Crea una nueva cuenta con validación de campos

### Reserva de Entradas
1. Selecciona una película de la cartelera
2. Elige el horario preferido (14:00, 17:00, 20:00)
3. Selecciona tus asientos en el mapa interactivo
4. Confirma tu reserva

## 🎨 Mejoras de Diseño Implementadas

### Sistema de Colores
- Paleta de colores consistente con variables CSS
- Gradientes modernos y atractivos
- Estados visuales claros para interacciones

### Tipografía
- Fuente Poppins para mejor legibilidad
- Jerarquía tipográfica clara
- Pesos de fuente optimizados

### Componentes
- **Cards modernas** con sombras y bordes redondeados
- **Botones interactivos** con efectos hover
- **Formularios mejorados** con iconos y validación
- **Animaciones suaves** para transiciones

### Experiencia de Usuario
- **Estados de carga** con spinners animados
- **Feedback visual** para todas las acciones
- **Navegación intuitiva** entre secciones
- **Responsive design** para móviles y tablets

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Login.js          # Componente de inicio de sesión
│   ├── Register.js       # Componente de registro
│   ├── Main.js          # Componente principal de reservas
│   ├── Loading.js       # Componente de carga
│   └── Notification.js  # Componente de notificaciones
├── App.js               # Componente principal
├── index.js             # Punto de entrada
└── index.css            # Estilos globales
```

## 🛠️ Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas
- `npm eject` - Expone la configuración de webpack

## 🎨 Personalización

### Colores
Los colores se pueden personalizar editando las variables CSS en `src/index.css`:

```css
:root {
  --primary-500: #3b82f6;  /* Color principal */
  --secondary-500: #ec4899; /* Color secundario */
}
```

### Animaciones
Las animaciones se pueden ajustar en `tailwind.config.js`:

```javascript
animation: {
  'fade-in': 'fadeIn 0.5s ease-in-out',
  'slide-up': 'slideUp 0.3s ease-out',
}
```

## 📱 Compatibilidad

- ✅ Chrome (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Dispositivos móviles



## Autor :D

**Luis Flores** - Backend Developer 

---

Fue un proyecto hecho con mucho amor, cariño y dedicación, me gusta la programación <3

