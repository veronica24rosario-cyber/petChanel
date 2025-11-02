import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Trash2 } from "lucide-react";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [client, setClient] = useState({ nombre: "", telefono: "" });
  const [pedido, setPedido] = useState(null);
  const [activeCategory, setActiveCategory] = useState("todos");

  // 🔹 Cargar productos desde Firestore
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

  // 🔹 Calcular total
  const total = cart.reduce((acc, item) => acc + Number(item.precio || 0), 0);

  // 🔹 Categorías disponibles
  const categories = [
    "todos",
    ...new Set(products.map((p) => p.categoria || "otros")),
  ];

  const categoryNames = {
    grooming: "🧼 Grooming y Cortes de Pelo",
    hospedaje: "🏨 Hospedaje",
    dermatologia: "🧴 Dermatología Veterinaria",
    dentales: "🦷 Tratamientos Dentales",
    tienda: "🛍️ Tienda de Alimentos y Accesorios",
    otros: "📦 Otros Productos",
    todos: "🌟 Todos",
  };

  // 🔹 Enviar pedido a Firebase y correo (Formspree)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!client.nombre || !client.telefono || cart.length === 0) {
      alert("Por favor completa tus datos y agrega productos al carrito.");
      return;
    }

    // Validación extra del teléfono
    if (!/^\d{8}$/.test(client.telefono)) {
      alert("El número de teléfono debe tener exactamente 8 dígitos numéricos.");
      return;
    }

    // Validación extra del nombre
    if (!/^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/.test(client.nombre)) {
      alert("El nombre solo puede contener letras y espacios.");
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

      // 🔸 1. Guardar en Firebase
      await addDoc(collection(db, "pedidos"), pedidoData);

      // 🔸 2. Enviar correo con Formspree
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

      localStorage.removeItem("cart");
      setPedido(pedidoData);
      setCart([]);
      setClient({ nombre: "", telefono: "" });
      alert("✅ Pedido enviado correctamente. Un asesor se pondrá en contacto contigo.");

    } catch (error) {
      console.error("Error al enviar pedido:", error);
      alert("❌ Ocurrió un error al enviar el pedido.");
    }
  };

  // 🔹 Filtrar productos por categoría
  const filteredProducts =
    activeCategory === "todos"
      ? products
      : products.filter((p) => (p.categoria || "otros") === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-28 pb-20 px-6 md:px-20 bg-purple-50 text-gray-800"
    >
      {/* Encabezado */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-purple-600 mb-2">
          Tienda PetChanel
        </h1>
        <p className="text-lg text-gray-600">
          Productos y servicios para tu mejor amigo 🐾
        </p>
      </div>

      {/* 🔹 Filtros de categorías */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeCategory === cat
                ? "bg-purple-600 text-white shadow-md"
                : "bg-white text-purple-600 border border-purple-300 hover:bg-purple-100"
            }`}
          >
            {categoryNames[cat] || cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* 🔹 Productos */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          No hay productos en esta categoría.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProducts.map((product) => (
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
                {product.descripcion && (
                  <p className="text-gray-600 text-sm mb-2">
                    {product.descripcion}
                  </p>
                )}
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
      <div className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto mt-16">
        <h2 className="text-2xl font-bold mb-4 text-purple-700">
          🛒 Tu carrito
        </h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Aún no has agregado productos.</p>
        ) : (
          <>
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

            <div className="text-right text-lg font-bold text-pink-600 mb-6">
              Total: Q{total}
            </div>

            {/* Formulario */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 text-left"
            >
              <label className="font-semibold text-gray-700">
                Nombre del cliente:
              </label>
              <input
                type="text"
                value={client.nombre}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]*$/.test(value)) {
                    setClient({ ...client, nombre: value });
                  }
                }}
                className="border rounded px-3 py-2"
                placeholder="Ej: Angélica Rosario"
                required
              />

              <label className="font-semibold text-gray-700">
                Teléfono de contacto:
              </label>
              <input
                type="tel"
                value={client.telefono}
                onChange={(e) =>
                  setClient({
                    ...client,
                    telefono: e.target.value.replace(/\D/g, ""),
                  })
                }
                className="border rounded px-3 py-2"
                placeholder="Ej: 55551234"
                maxLength={8}
                required
              />

              <button
                type="submit"
                className="mt-4 bg-green-500 text-white py-2 rounded hover:bg-green-600 font-semibold"
              >
                Enviar pedido
              </button>
            </form>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Store;
