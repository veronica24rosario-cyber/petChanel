import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ReservaForm = ({ serviceName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telefono: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus('');

    // Aquí va tu link de Formspree
    const FORM_URL = 'https://formspree.io/f/mwpwwnag';

    const data = new FormData();
    data.append('service', serviceName);
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('telefono', formData.telefono);
    data.append('message', formData.message);

    try {
      const res = await fetch(FORM_URL, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('¡Reserva enviada con éxito! Un asesor te contactará pronto.');
        setFormData({ name: '', email: '', telefono: '', message: '' });
      } else {
        setStatus('Hubo un error al enviar la reserva. Intenta de nuevo.');
      }
    } catch (err) {
      setStatus('Hubo un error al enviar la reserva. Intenta de nuevo.');
    }

    setSending(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="bg-white p-8 rounded-xl shadow-xl max-w-2xl mx-auto"
    >
      <h3 className="text-2xl font-bold text-purple-700 mb-4">
        Reservar: {serviceName}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="service" value={serviceName} />

        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg mt-1"
            placeholder="Tu nombre completo"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg mt-1"
            placeholder="tucorreo@ejemplo.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg mt-1"
            placeholder="+502 1234-5678"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mensaje o Detalles</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
            className="w-full p-3 border rounded-lg mt-1"
            placeholder="Ej. Quisiera agendar para un Shih Tzu pequeño este sábado..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={sending}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
        >
          {sending ? 'Enviando...' : 'Confirmar Reserva'}
        </button>
      </form>

      {status && (
        <p className="mt-4 text-center text-sm text-green-600 font-medium">{status}</p>
      )}
    </motion.div>
  );
};

export default ReservaForm;
