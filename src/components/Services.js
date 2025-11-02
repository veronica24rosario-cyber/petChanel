import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GroomingImg from '../imagenes/grooming.jpg';
import HospedajeImg from '../imagenes/hospedaje.jpg';
import DermatologiaImg from '../imagenes/dermatologia.jpg';
import DentalImg from '../imagenes/dental.jpg';
import AccesoriosImg from '../imagenes/accesorios.jpg';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      title: 'Grooming y Cortes',
      img: GroomingImg,
      description: 'Servicios de estética y limpieza para mascotas.',
      details: [
        { name: 'Grooming completo', price: 'Q150', desc: 'Corte, baño, secado y cepillado general.' },
        { name: 'Baño medicado', price: 'Q150', desc: 'Limpieza con shampoo especial para piel sensible o con tratamiento.' },
        { name: 'Baño normal', price: 'Q100', desc: 'Baño regular con productos estándar y secado.' },
        { name: 'Corte de uñas', price: 'Q25', desc: 'Corte seguro y cuidadoso de uñas.' },
        { name: 'Cepillado de dientes', price: 'Q50', desc: 'Limpieza dental básica con cepillo y pasta para perros.' },
        { name: 'Limpieza de oídos', price: 'Q50', desc: 'Limpieza profunda del canal auditivo.' },
        { name: 'Corte estilo raza', price: 'Q0', desc: 'Corte estético adaptado al tipo de raza (probablemente en promoción).' },
      ]
    },
    {
      title: 'Hospedaje',
      img: HospedajeImg,
      description: 'Servicios para el cuidado y alojamiento de mascotas.',
      details: [
        { name: 'Día completo (24h)', price: 'Q180', desc: 'Hospedaje por día completo con alimentación y atención.' },
        { name: 'Medio día', price: 'Q80', desc: 'Estancia de medio día con cuidado supervisado.' },
        { name: 'Paquete fin de semana', price: 'Q325', desc: 'Hospedaje de viernes a domingo.' },
        { name: 'Paquete semanal', price: 'Q1000', desc: 'Hospedaje de varios días con paseos y atención diaria.' },
      ]
    },
    {
      title: 'Dermatología',
      img: DermatologiaImg,
      description: 'Servicios enfocados en la salud y el cuidado de la piel de las mascotas.',
      details: [
        { name: 'Consulta dermatológica', price: 'Q350', desc: 'Evaluación médica de la piel y pelaje.' },
        { name: 'Tratamiento para sarna', price: 'Q75', desc: 'Terapia especializada contra sarna.' },
        { name: 'Alergias cutáneas', price: 'Q299.99', desc: 'Diagnóstico y tratamiento de alergias en la piel.' },
        { name: 'Limpieza profunda de piel', price: 'Q299.99', desc: 'Baño terapéutico con productos especiales.' },
        { name: 'Champús dermatológicos', price: 'Q120', desc: 'Productos especializados para piel sensible o tratada.' },
        { name: 'Terapia antipulgas', price: 'Q50', desc: 'Tratamiento contra pulgas y parásitos externos.' },
      ]
    },
    {
      title: 'Tratamientos Dentales',
      img: DentalImg,
      description: 'Cuidado dental profesional para mascotas.',
      details: [
        { name: 'Limpieza dental básica', price: 'Q300', desc: 'Limpieza simple de sarro y placa.' },
        { name: 'Limpieza bajo sedación', price: 'Q350', desc: 'Limpieza profunda realizada con anestesia.' },
        { name: 'Extracciones', price: 'Q399.99', desc: 'Retiro de piezas dentales dañadas.' },
        { name: 'Eliminación de sarro', price: 'Q199.99', desc: 'Tratamiento para remover acumulación de sarro dental.' },
      ]
    },
    {
      title: 'Tienda de Alimentos y Accesorios',
      img: AccesoriosImg,
      description: 'Productos para la nutrición y bienestar de las mascotas.',
      details: [
        { name: 'Alimento seco para perro', price: 'Q400', desc: 'Croquetas nutritivas para perros adultos.' },
        { name: 'Alimento húmedo para perro', price: 'Q35', desc: 'Comida en lata o sobre, blanda y sabrosa.' },
        { name: 'Alimento especial', price: 'Q399.99', desc: 'Dietas veterinarias para condiciones específicas.' },
      ]
    },
  ];

  return (
    <div className="pt-20 pb-10 px-6 md:px-20 bg-rose-50 text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-10">Nuestros Servicios Detallados</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden text-center p-6 flex flex-col items-center">
            <img src={service.img} alt={service.title} className="w-full h-48 object-contain rounded-lg mb-4" />
            <h2 className="text-xl font-bold mb-2">
              <span className="text-pink-500">{service.title.split(' ')[0]}</span>{' '}
              <span className="text-purple-600">{service.title.split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-gray-700 mb-4">{service.description}</p>
            <button
              onClick={() => setSelectedService(service)}
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
            >
              Ver más
            </button>
          </div>
        ))}
      </div>

      {/* Modal moderno */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-4xl w-full relative overflow-auto max-h-[80vh]"
          >
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-lg"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">
              <span className="text-pink-500">{selectedService.title.split(' ')[0]}</span>{' '}
              <span className="text-purple-600">{selectedService.title.split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-gray-700 mb-6 text-center">{selectedService.description}</p>

            <div className="grid md:grid-cols-2 gap-4 overflow-auto max-h-[60vh]">
              {selectedService.details.map((item, idx) => (
                <div key={idx} className="bg-purple-50 p-4 rounded-lg shadow-sm hover:shadow-md transition">
                  <h3 className="font-semibold text-lg text-purple-700 mb-1">{item.name}</h3>
                  <p className="text-pink-600 font-semibold mb-1">{item.price}</p>
                  <p className="text-gray-700">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Services;
