import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Trash2 } from "lucide-react"; // 🗑️ ícono moderno

const Store = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // 🔹 Cargar productos desde Firebase
  useEffect(() => {
    const loadProductsFromFirebase = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(items);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    loadProductsFromFirebase();

    // Cargar carrito guardado
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  // 🔹 Agregar producto al carrito
  const addToCart = (product) => {
    const updated = [...cart, product];
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // 🔹 Eliminar producto del carrito
  const removeFromCart = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // 🔹 Calcular total (corrige el NaN)
  const total = cart.reduce((acc, item) => acc + Number(item.precio || 0), 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-28 pb-20 px-6 md:px-20 bg-purple-50 text-gray-800"
    >
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-purple-600 mb-2">
          Tienda PetChanel
        </h1>
        <p className="text-lg text-gray-600">
          Productos y servicios para tu mejor amigo 🐾
        </p>
      </div>

      {/* 🔹 Productos */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={product.imagen}
                alt={product.nombre}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{product.nombre}</h2>
                <p className="text-purple-600 font-bold">Q{product.precio}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-3 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔹 Carrito */}
      <div className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-purple-700">🛒 Tu carrito</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Aún no has agregado productos.</p>
        ) : (
          <ul className="space-y-2 mb-4">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>{item.nombre}</span>
                <div className="flex items-center gap-3">
                  <span className="text-purple-600 font-semibold">
                    Q{item.precio}
                  </span>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-red-500 hover:text-red-700"
                    title="Eliminar"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="text-right text-lg font-bold text-pink-600">
          Total: Q{total}
        </div>
      </div>
    </motion.div>
  );
};

export default Store;
