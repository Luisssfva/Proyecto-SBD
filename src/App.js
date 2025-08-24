import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Main from './components/Main';
import { motion } from 'framer-motion';
import { FaFilm, FaTicketAlt, FaStar } from 'react-icons/fa';

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('home');
  const [users, setUsers] = useState([]);

  // Cargar usuarios registrados del localStorage al iniciar
  useEffect(() => {
    const savedUsers = localStorage.getItem('cinepolito_users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  const handleLogin = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setUser(user.username);
      setView('main');
      return { success: true };
    } else {
      return { success: false, message: 'Email o contraseña incorrectos' };
    }
  };

  const handleRegister = (userData) => {
    // Verificar si el usuario ya existe
    const existingUser = users.find(u => u.username === userData.username || u.email === userData.email);
    if (existingUser) {
      return { success: false, message: 'El usuario o email ya existe' };
    }

    // Verificar que el email sea de ESPOL
    if (!userData.email.endsWith('@espol.edu.ec')) {
      return { success: false, message: 'Solo se permiten correos de ESPOL (@espol.edu.ec)' };
    }

    // Agregar nuevo usuario
    const newUsers = [...users, userData];
    setUsers(newUsers);
    localStorage.setItem('cinepolito_users', JSON.stringify(newUsers));
    return { success: true, message: 'Usuario registrado exitosamente' };
  };

  const handleLogout = () => {
    setUser(null);
    setView('home');
  };

  return (
    <>
      {view === 'home' && (
        <motion.div 
          className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
        >
          {/* Elementos de fondo decorativos */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-500/10 rounded-full blur-2xl"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Logo y título */}
              <div className="flex items-center justify-center mb-6">
                <FaFilm className="text-6xl text-yellow-400 mr-4" />
                <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  CinePolito
                </h1>
              </div>
              
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Descubre las mejores películas en una experiencia cinematográfica única
              </p>

              {/* Características destacadas */}
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                <div className="flex items-center text-white/80">
                  <FaTicketAlt className="text-2xl text-yellow-400 mr-3" />
                  <span className="text-lg">Reservas Fáciles</span>
                </div>
                <div className="flex items-center text-white/80">
                  <FaStar className="text-2xl text-yellow-400 mr-3" />
                  <span className="text-lg">Mejores Películas</span>
                </div>
                <div className="flex items-center text-white/80">
                  <FaFilm className="text-2xl text-yellow-400 mr-3" />
                  <span className="text-lg">Experiencia Premium</span>
                </div>
              </div>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.button 
                  onClick={() => setView('login')} 
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Iniciar Sesión</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
                
                <motion.button 
                  onClick={() => setView('register')} 
                  className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-rose-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Registrarse</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
      {view === 'login' && <Login onLogin={handleLogin} goRegister={() => setView('register')} />}
      {view === 'register' && <Register onRegister={handleRegister} goLogin={() => setView('login')} />}
      {view === 'main' && <Main user={user} onLogout={handleLogout} />}
    </>
  );
}