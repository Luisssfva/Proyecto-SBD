import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSignOutAlt, FaClock, FaChair, FaTicketAlt, FaStar, FaPlay } from 'react-icons/fa';

export default function Main({ user, onLogout }) {
  const [selectedTimes, setSelectedTimes] = useState({});
  const [selections, setSelections] = useState({});

  const toggleSeat = (movieIndex, time, seat) => {
    if (!time) return alert("Selecciona una hora primero");
    const key = `${movieIndex}-${time}`;
    setSelections(prev => {
      const currentSeats = prev[key] || [];
      return {
        ...prev,
        [key]: currentSeats.includes(seat)
          ? currentSeats.filter(s => s !== seat)
          : [...currentSeats, seat]
      };
    });
  };

  const reservar = (movieIndex) => {
    const time = selectedTimes[movieIndex];
    if (!time) return alert("Selecciona una hora primero");
    const key = `${movieIndex}-${time}`;
    const seats = selections[key] || [];
    if (seats.length === 0) return alert("Selecciona al menos un asiento");
    alert(`✅ Reserva exitosa para "${movies[movieIndex].title}" a las ${time} con asientos: ${seats.join(", ")}`);
  };

  const movies = [
    { 
      title: 'Avengers: Endgame', 
      img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=600&fit=crop', 
      desc: 'Los Vengadores se reúnen una vez más para revertir las acciones de Thanos y restaurar el equilibrio del universo en esta épica conclusión.',
      rating: 4.9,
      duration: '3h 1min',
      genre: 'Acción/Aventura'
    },
    { 
      title: 'Dune', 
      img: 'https://images.unsplash.com/photo-1633613286991-611fe299c4be?w=800&h=600&fit=crop', 
      desc: 'Paul Atreides, un joven brillante y talentoso, debe viajar al planeta más peligroso del universo para asegurar el futuro de su familia y su pueblo.',
      rating: 4.8,
      duration: '2h 35min',
      genre: 'Ciencia Ficción'
    },
    { 
      title: 'Interestelar', 
      img: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=600&fit=crop', 
      desc: 'Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento de asegurar la supervivencia de la humanidad.',
      rating: 4.9,
      duration: '2h 49min',
      genre: 'Ciencia Ficción'
    },
    { 
      title: 'The Dark Knight', 
      img: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=800&h=600&fit=crop', 
      desc: 'Batman se enfrenta al mayor desafío psicológico y físico de su carrera cuando el misterioso Joker desata el caos en Gotham City.',
      rating: 4.9,
      duration: '2h 32min',
      genre: 'Acción/Drama'
    }
  ];

  const times = ['14:00', '17:00', '20:00'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header mejorado */}
      <motion.div 
        className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <FaPlay className="text-3xl text-blue-600" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CinePolito
              </h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm text-gray-600">Bienvenido</p>
                <p className="font-semibold text-gray-800">{user}</p>
              </div>
              <motion.button 
                onClick={onLogout} 
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSignOutAlt />
                <span>Cerrar sesión</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Películas en Cartelera</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Selecciona tu película favorita, elige el horario perfecto y reserva tus asientos preferidos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {movies.map((movie, idx) => {
            const time = selectedTimes[idx];
            const seats = selections[`${idx}-${time}`] || [];
            return (
              <motion.div
                key={idx}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
              >
                {/* Imagen de la película */}
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={movie.img} 
                    alt={movie.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Información de la película sobre la imagen */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold">{movie.title}</h3>
                      <div className="flex items-center space-x-1 bg-yellow-500 text-black px-2 py-1 rounded-full">
                        <FaStar className="text-sm" />
                        <span className="text-sm font-semibold">{movie.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm opacity-90">
                      <span className="flex items-center space-x-1">
                        <FaClock />
                        <span>{movie.duration}</span>
                      </span>
                      <span className="bg-blue-500 px-2 py-1 rounded-full text-xs font-medium">
                        {movie.genre}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-6 leading-relaxed">{movie.desc}</p>

                  {/* Selección de horario */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <FaClock className="text-blue-600" />
                      <h4 className="font-semibold text-gray-800">Selecciona el horario:</h4>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {times.map((t) => (
                        <motion.label 
                          key={t} 
                          className={`flex items-center space-x-2 px-4 py-2 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                            selectedTimes[idx] === t
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <input
                            type="radio"
                            name={`time-${idx}`}
                            value={t}
                            onChange={() => setSelectedTimes(prev => ({ ...prev, [idx]: t }))}
                            className="sr-only"
                          />
                          <span className="font-medium">{t}</span>
                        </motion.label>
                      ))}
                    </div>
                  </div>

                  {/* Selección de asientos */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <FaChair className="text-green-600" />
                      <h4 className="font-semibold text-gray-800">Selecciona tus asientos:</h4>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-xl">
                      <div className="grid grid-cols-5 gap-2">
                        {[...Array(15)].map((_, i) => {
                          const seat = `${i + 1}`;
                          const isSelected = seats.includes(seat);
                          return (
                            <motion.div
                              key={seat}
                              onClick={() => toggleSeat(idx, time, seat)}
                              className={`w-12 h-12 flex items-center justify-center cursor-pointer rounded-lg font-medium transition-all duration-200 ${
                                isSelected
                                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                                  : 'bg-white hover:bg-blue-100 border border-gray-200 hover:border-blue-300'
                              }`}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {seat}
                            </motion.div>
                          );
                        })}
                      </div>
                      <div className="mt-3 text-center text-sm text-gray-600">
                        Asientos seleccionados: {seats.length}
                      </div>
                    </div>
                  </div>

                  {/* Botón de reserva */}
                  <motion.button
                    onClick={() => reservar(idx)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaTicketAlt />
                    <span>Reservar Entradas</span>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
