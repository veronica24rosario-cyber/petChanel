import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Importa las 12 imágenes
import perrita1 from '../imagenes/perrita1.jpg';
import perrita2 from '../imagenes/perrita2.jpg';
import perrita3 from '../imagenes/perrita3.jpg';
import perrita4 from '../imagenes/perrita4.jpg';
import perrita5 from '../imagenes/perrita5.jpg';
import perrita6 from '../imagenes/perrita6.jpg';
import perrita7 from '../imagenes/perrita7.jpg';
import perrita8 from '../imagenes/perrita8.jpg';
import perrita9 from '../imagenes/perrita9.jpg';
import perrita10 from '../imagenes/perrita10.jpg';
import perrita11 from '../imagenes/perrita11.jpg';
import perrita12 from '../imagenes/perrita12.jpg';

const About = () => {
  const [galleryOpen, setGalleryOpen] = useState(false);

  const inspirationImages = [
    perrita1,
    perrita2,
    perrita3,
    perrita4,
    perrita5,
    perrita6,
    perrita7,
    perrita8,
    perrita9,
    perrita10,
    perrita11,
    perrita12,
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-pink-50 pt-28 pb-16 px-6 md:px-20 text-gray-800"
    >
      {/* Sección principal */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-purple-600 mb-4">Sobre Nosotros</h1>
        <p className="text-lg text-gray-600">Conoce más sobre nuestro compromiso con tus mascotas</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-pink-600 mb-2">¿Quiénes Somos?</h2>
          <p>
            En <strong>Petchanel</strong>, somos un equipo apasionado por el bienestar de los animales.
            Ofrecemos servicios de grooming, hospedaje, salud dermatológica y venta de productos con amor y dedicación.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-pink-600 mb-2">Nuestra Misión</h2>
          <p>
            Brindar atención integral, amorosa y profesional a todas las mascotas que atendemos, 
            mejorando su calidad de vida y fortaleciendo el vínculo con sus humanos.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-pink-600 mb-2">Nuestra Visión</h2>
          <p>
            Ser la clínica y centro de bienestar animal preferido por las familias, 
            destacando por nuestra excelencia, innovación y cuidado ético hacia los animales.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-pink-600 mb-2">Nuestros Valores</h2>
          <ul className="list-disc pl-6 text-left space-y-1">
            <li>Amor y respeto por todos los animales</li>
            <li>Profesionalismo y ética en el servicio</li>
            <li>Innovación constante</li>
            <li>Atención personalizada y humana</li>
          </ul>
        </section>

        {/* Inspiración */}
        <section className="text-center mt-6">
          <h2 className="text-2xl font-semibold text-purple-600 mb-2">Nuestra Inspiración</h2>
          <p className="mb-4">Conoce a nuestra querida perrita que nos inspira cada día.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 font-semibold"
            onClick={() => setGalleryOpen(true)}
          >
            Ver fotos
          </motion.button>
        </section>
      </div>

      {/* Modal de galería */}
      {galleryOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-4xl w-full overflow-auto max-h-[80vh] relative"
          >
            <button
              onClick={() => setGalleryOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-xl"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold text-center mb-4 text-purple-700">Galería Inspiradora</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {inspirationImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Inspiración ${idx + 1}`}
                  className="w-full h-64 object-contain rounded-lg shadow-md"
                />
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default About;
