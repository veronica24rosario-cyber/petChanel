import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Edit, Save, Plus, Trash2 } from 'lucide-react';

const Admin = ({ onLogout }) => {
  const [services, setServices] = useState([
    { id: 1, name: 'Grooming', price: 50 },
    { id: 2, name: 'Hospedaje', price: 30 },
    { id: 3, name: 'Dermatología', price: 80 }
  ]);
  const [inventory, setInventory] = useState([
    { id: 1, item: 'Croquetas Premium', stock: 100, price: 25 },
    { id: 2, item: 'Juguete Peluche', stock: 50, price: 10 }
  ]);
  const [newService, setNewService] = useState({ name: '', price: '' });
  const [newItem, setNewItem] = useState({ item: '', stock: '', price: '' });

  const handleServiceChange = (id, field, value) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addService = () => {
    if (newService.name && newService.price) {
      setServices(prev => [...prev, { id: Date.now(), ...newService, price: Number(newService.price) }]);
      setNewService({ name: '', price: '' });
    }
  };

  const deleteService = (id) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const handleItemChange = (id, field, value) => {
    setInventory(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const addItem = () => {
    if (newItem.item && newItem.stock && newItem.price) {
      setInventory(prev => [...prev, { id: Date.now(), ...newItem, stock: Number(newItem.stock), price: Number(newItem.price) }]);
      setNewItem({ item: '', stock: '', price: '' });
    }
  };

  const deleteItem = (id) => {
    setInventory(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="pt-20 pb-8 bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="max-w-6xl mx-auto px-4 py-8"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-purple-600 flex items-center gap-2">
            <Settings className="w-8 h-8" />
            Panel Admin - Gestión Interna
          </h1>
          <button
            onClick={onLogout}
            className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Salir
          </button>
        </div>

        {/* Gestión de Servicios */}
        <motion.section 
          initial={{ y: 20 }} 
          animate={{ y: 0 }} 
          className="bg-white rounded-2xl p-6 mb-8 shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Modificar Precios de Servicios</h2>
          <div className="space-y-4">
            {services.map(service => (
              <div key={service.id} className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                <span className="font-medium">{service.name}</span>
                <input
                  type="number"
                  value={service.price}
                  onChange={(e) => handleServiceChange(service.id, 'price', e.target.value)}
                  className="px-3 py-2 border border-purple-300 rounded-lg w-20"
                  placeholder="Precio"
                />
                <button
                  onClick={() => deleteService(service.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <div className="flex gap-2 mt-4">
              <input
                type="text"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                placeholder="Nuevo servicio"
                className="px-3 py-2 border border-purple-300 rounded-lg flex-1"
              />
              <input
                type="number"
                value={newService.price}
                onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                placeholder="Precio"
                className="px-3 py-2 border border-purple-300 rounded-lg w-20"
              />
              <button
                onClick={addService}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700"
              >
                <Plus className="w-4 h-4" />
                Agregar
              </button>
            </div>
          </div>
        </motion.section>

        {/* Gestión de Inventario */}
        <motion.section 
          initial={{ y: 20 }} 
          animate={{ y: 0 }} 
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 mb-8 shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Gestión de Comida y Artículos</h2>
          <div className="space-y-4">
            {inventory.map(item => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-pink-50 rounded-lg">
                <span className="font-medium flex-1">{item.item}</span>
                <input
                  type="number"
                  value={item.stock}
                  onChange={(e) => handleItemChange(item.id, 'stock', e.target.value)}
                  className="px-3 py-2 border border-pink-300 rounded-lg w-20"
                  placeholder="Stock"
                />
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
                  className="px-3 py-2 border border-pink-300 rounded-lg w-20"
                  placeholder="Precio"
                />
                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <div className="flex gap-2 mt-4">
              <input
                type="text"
                value={newItem.item}
                onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
                placeholder="Nuevo artículo/comida"
                className="px-3 py-2 border border-pink-300 rounded-lg flex-1"
              />
              <input
                type="number"
                value={newItem.stock}
                onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })}
                placeholder="Stock"
                className="px-3 py-2 border border-pink-300 rounded-lg w-20"
              />
              <input
                type="number"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                placeholder="Precio"
                className="px-3 py-2 border border-pink-300 rounded-lg w-20"
              />
              <button
                onClick={addItem}
                className="bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-pink-700"
              >
                <Plus className="w-4 h-4" />
                Agregar
              </button>
            </div>
          </div>
        </motion.section>

        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-center text-gray-500"
        >
          ¡Cambios guardados automáticamente! (En este demo, se actualizan en la pantalla).
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Admin;