import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Trash2 } from "lucide-react";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [client, setClient] = useState({ nombre: "", telefono: "" });
  const [pedido, setPedido] = useState(null);

  // 🔹 Cargar productos desde Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    };
    fetchProducts();
  }, []);

  // 🔹 Agregar al carrito
  const addToCart = (product) => {
    const updated = [...cart, product];
    setCart(updated);
  };

  // 🔹 Eliminar del carrito
  const removeFromCart = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
  };

  // 🔹 Calcular total
  const total = cart.reduce((acc, item) => acc + (Number(item.precio) || 0), 0);

  // 🔹 Enviar pedido
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!client.nombre || !client.telefono || cart.length === 0) {
      alert("Por favor completa tus datos y agrega productos al carrito.");
      return;
    }

    try {
      const pedidoData = {
        cliente: client,
        productos: cart.map((item) => ({
          nombre: item.nombre,
          precio: item.precio,
        })),
        total,
        fecha: new Date().toLocaleString(),
      };

      // Guardar en Firebase
      await addDoc(collection(db, "pedidos"), pedidoData);

      // Enviar correo con Formspree
      await fetch("https://formspree.io/f/myzbljvw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: "🐾 Nuevo pedido en PetChanel (Tienda)",
          nombre: client.nombre,
          telefono: client.telefono,
          total: `Q${pedidoData.total}`,
          productos: pedidoData.productos
            .map((p) => `${p.nombre} (Q${p.precio})`)
            .join(", "),
          fecha: pedidoData.fecha,
        }),
      });

      setPedido(pedidoData);
      setCart([]);
      setClient({ nombre: "", telefono: "" });
      alert("✅ Pedido enviado correctamente. Un asesor se pondrá en contacto contigo.");

    } catch (error) {
      console.error("Error al enviar pedido:", error);
      alert("❌ Ocurrió un error al enviar el pedido.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-28 pb-20 px-6 md:px-20 bg-purple-50 text-gray-800"
    >
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-purple-600 mb-2">Tienda PetChanel</h1>
        <p className="text-lg text-gray-600">
          Productos y servicios para tu mejor amigo 🐾
        </p>
      </div>

      {/* 🐶 Productos */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product, idx) => (
            <div
              key={idx}
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

      {/* 🛒 Carrito */}
      <div className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-purple-700">🛒 Tu carrito</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Aún no has agregado productos.</p>
        ) : (
          <ul className="space-y-3 mb-4">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{item.nombre}</span>
                <div className="flex items-center gap-2">
                  <span className="text-purple-600 font-semibold">Q{item.precio}</span>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-red-500 hover:text-red-700"
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

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <label className="font-semibold text-gray-700">Nombre:</label>
          <input
            type="text"
            value={client.nombre}
            onChange={(e) => setClient({ ...client, nombre: e.target.value })}
            className="border rounded px-3 py-2 w-full"
            placeholder="Tu nombre completo"
            required
          />
          <label className="font-semibold text-gray-700">Teléfono de contacto:</label>
          <input
            type="tel"
            value={client.telefono}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 8) setClient({ ...client, telefono: value });
            }}
            className="border rounded px-3 py-2 w-full"
            placeholder="Ej: 55551234"
            required
            pattern="[0-9]{8}"
            title="Debe contener solo 8 dígitos numéricos"
          />
          <button
            type="submit"
            className="w-full mt-3 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            Enviar pedido
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Store;
