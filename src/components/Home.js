import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PawPrint, Heart } from 'lucide-react';
import GroomingImg from '../imagenes/grooming.jpg';
import HospedajeImg from '../imagenes/hospedaje.jpg';
import DermatologiaImg from '../imagenes/dermatologia.jpg';
import DentalImg from '../imagenes/dental.jpg';
import AccesoriosImg from '../imagenes/accesorios.jpg';
import ReservaForm from './ReservaForm'; // Ajusta la ruta según tu proyecto

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const services = [
    { title: 'Grooming y Cortes', desc: 'Baños, cortes de pelo y cuidado estético para que tu mascota luzca impecable.', img: GroomingImg },
    { title: 'Hospedaje', desc: 'Alojamiento seguro y amoroso mientras estás de viaje. ¡Fiesta para tu peludo!', img: HospedajeImg },
    { title: 'Dermatología', desc: 'Tratamientos para piel y pelo sanos. Adiós a las molestias.', img: DermatologiaImg },
    { title: 'Tienda de Alimentos y Accesorios', desc: 'Todo lo que necesitas: comida premium, juguetes y collares divertidos.', img: AccesoriosImg },
    { title: 'Tratamientos Dentales', desc: 'Limpieza y cuidado dental para sonrisas brillantes en tus mascotas.', img: DentalImg },
  ];

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      {/* Sección de bienvenida */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div className="mb-6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
            <PawPrint className="w-16 h-16 text-purple-500 mx-auto mb-4" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Bienvenido a <span className="text-purple-600">Petchanel</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Tu veterinaria completa: peluquería, hospedaje, dermatología, dentales y todo para mimar a tu mascota. ¡Ven y cuéntanos de tus amigos peludos!
          </p>

          {/* Botón que abre el modal */}
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            className="bg-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-700"
            onClick={() => setModalOpen(true)}
          >
            Agenda una cita <Heart className="inline w-5 h-5 ml-2" />
          </motion.button>
        </div>
      </motion.section>

      {/* Modal de reserva */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative w-full max-w-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-black font-bold text-2xl"
            >
              &times;
            </button>
            <ReservaForm serviceName="Reserva general" />
          </div>
        </div>
      )}

      {/* Sección de servicios */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Nuestros Servicios</h2>

          <div className="flex flex-wrap justify-center gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg transition-all w-full sm:w-[45%] md:w-[30%] lg:w-[28%] flex flex-col items-center text-center"
              >
                <img src={service.img} alt={service.title} className="w-full h-64 object-contain rounded-lg mb-4" />
                <h3 
                  className={`text-2xl font-bold mb-2 ${
                    index % 2 === 0 ? 'text-pink-500' : 'text-purple-600'
                  }`}
                >
                  {service.title}
                </h3>
                <p className="text-gray-700 text-lg">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
