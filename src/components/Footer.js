import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Phone, MapPin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }} 
      whileInView={{ opacity: 1 }} 
      className="bg-purple-800 text-white py-8 mt-12"
    >
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Petchanel </h3>
          <p className="text-purple-200">
            Tu veterinaria favorita para grooming, hospedaje y más. 
            ¡Cuidamos a tus peluditos con amor!
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Servicios</h4>
          <ul className="space-y-2 text-sm">
            <li>Grooming y cortes</li>
            <li>Hospedaje seguro</li>
            <li>Dermatología</li>
            <li>Tratamientos dentales</li>
            <li>Tienda de accesorios</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
          <div className="flex gap-4 mb-4">
            <a 
              href="https://www.facebook.com/?locale=es_LA" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-white/20 rounded-full hover:bg-white/30"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="https://www.instagram.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-white/20 rounded-full hover:bg-white/30"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://x.com/?lang=es" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-white/20 rounded-full hover:bg-white/30"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>

          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +502 4188-3820
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> info@Petchanel.com
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Calle Mascotas 123
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
