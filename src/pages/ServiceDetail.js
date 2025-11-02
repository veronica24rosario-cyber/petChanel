// src/pages/ServiceDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const servicesData = {
  grooming: {
    title: 'Grooming y Cortes de Pelo',
    description: 'Servicios de estética y limpieza para mascotas.',
    items: [
      { servicio: 'Grooming completo', precio: 'Q150', descripcion: 'Corte, baño, secado y cepillado general.' },
      { servicio: 'Baño medicado', precio: 'Q150', descripcion: 'Limpieza con shampoo especial para piel sensible o con tratamiento.' },
      { servicio: 'Baño normal', precio: 'Q100', descripcion: 'Baño regular con productos estándar y secado.' },
      { servicio: 'Corte de uñas', precio: 'Q25', descripcion: 'Corte seguro y cuidadoso de uñas.' },
      { servicio: 'Cepillado de dientes', precio: 'Q50', descripcion: 'Limpieza dental básica con cepillo y pasta para perros.' },
      { servicio: 'Limpieza de oídos', precio: 'Q50', descripcion: 'Limpieza profunda del canal auditivo.' },
      { servicio: 'Corte estilo raza', precio: 'Q0', descripcion: 'Corte estético adaptado al tipo de raza (probablemente en promoción).' },
    ],
  },
  hospedaje: {
    title: 'Hospedaje',
    description: 'Servicios para el cuidado y alojamiento de mascotas.',
    items: [
      { servicio: 'Día completo (24h)', precio: 'Q180', descripcion: 'Hospedaje por día completo con alimentación y atención.' },
      { servicio: 'Medio día', precio: 'Q80', descripcion: 'Estancia de medio día con cuidado supervisado.' },
      { servicio: 'Paquete fin de semana', precio: 'Q325', descripcion: 'Hospedaje de viernes a domingo.' },
      { servicio: 'Paquete semanal', precio: 'Q1000', descripcion: 'Hospedaje de varios días con paseos y atención diaria.' },
    ],
  },
  dermatologia: {
    title: 'Dermatología',
    description: 'Servicios enfocados en la salud y el cuidado de la piel de las mascotas.',
    items: [
      { servicio: 'Consulta dermatológica', precio: 'Q350', descripcion: 'Evaluación médica de la piel y pelaje.' },
      { servicio: 'Tratamiento para sarna', precio: 'Q75', descripcion: 'Terapia especializada contra sarna.' },
      { servicio: 'Alergias cutáneas', precio: 'Q299.99', descripcion: 'Diagnóstico y tratamiento de alergias en la piel.' },
      { servicio: 'Limpieza profunda de piel (baño medicado)', precio: 'Q299.99', descripcion: 'Baño terapéutico con productos especiales.' },
      { servicio: 'Champús dermatológicos', precio: 'Q120', descripcion: 'Productos especializados para piel sensible o tratada.' },
      { servicio: 'Terapia antipulgas', precio: 'Q50', descripcion: 'Tratamiento contra pulgas y parásitos externos.' },
    ],
  },
  dentales: {
    title: 'Tratamientos Dentales',
    description: 'Cuidado dental profesional para mascotas.',
    items: [
      { servicio: 'Limpieza dental básica', precio: 'Q300', descripcion: 'Limpieza simple de sarro y placa.' },
      { servicio: 'Limpieza bajo sedación', precio: 'Q350', descripcion: 'Limpieza profunda realizada con anestesia.' },
      { servicio: 'Extracciones', precio: 'Q399.99', descripcion: 'Retiro de piezas dentales dañadas.' },
      { servicio: 'Eliminación de sarro', precio: 'Q199.99', descripcion: 'Tratamiento para remover acumulación de sarro dental.' },
    ],
  },
  tienda: {
    title: 'Tienda de Alimentos y Accesorios',
    description: 'Productos para la nutrición y bienestar de las mascotas.',
    items: [
      { servicio: 'Alimento seco para perro', precio: 'Q400', descripcion: 'Croquetas nutritivas para perros adultos.' },
      { servicio: 'Alimento húmedo para perro', precio: 'Q35', descripcion: 'Comida en lata o sobre, blanda y sabrosa.' },
      { servicio: 'Alimento especial (diabéticos, renal, etc.)', precio: 'Q399.99', descripcion: 'Dietas veterinarias para condiciones específicas.' },
    ],
  },
};

const ServiceDetail = () => {
  const { id } = useParams();
  const service = servicesData[id];

  if (!service) {
    return <div className="text-center py-20">Servicio no encontrado</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-28 pb-20 px-6 md:px-20 bg-purple-50 text-gray-800"
    >
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-6">{service.title}</h1>
      <p className="text-lg text-gray-700 text-center mb-12">{service.description}</p>

      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white rounded-xl shadow-md">
          <thead className="bg-purple-100">
            <tr>
              <th className="px-4 py-2 text-left">Servicio</th>
              <th className="px-4 py-2 text-left">Precio</th>
              <th className="px-4 py-2 text-left">Descripción aproximada</th>
            </tr>
          </thead>
          <tbody>
            {service.items.map((item, index) => (
              <tr key={index} className="border-b hover:bg-purple-50">
                <td className="px-4 py-3">{item.servicio}</td>
                <td className="px-4 py-3">{item.precio}</td>
                <td className="px-4 py-3">{item.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ServiceDetail;
