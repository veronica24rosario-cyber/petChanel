import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash, Upload, Pencil } from "lucide-react";

// Función para obtener productos desde localStorage
const getStoredProducts = () => {
  const data = localStorage.getItem("products");
  return data ? JSON.parse(data) : [];
};

const categories = [
  "Grooming y Cortes",
  "Hospedaje",
  "Dermatología",
  "Tratamientos Dentales",
  "Tienda de Alimentos y Accesorios",
];

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", image: "", category: categories[0] });
  const [fileImage, setFileImage] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setProducts(getStoredProducts());
  }, []);

  const updateLocalStorage = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      name: form.name,
      price: parseFloat(form.price),
      image: fileImage
        ? URL.createObjectURL(fileImage)
        : form.image || "https://via.placeholder.com/300",
      category: form.category,
    };

    const updatedProducts = [...products];
    if (editIndex !== null) {
      updatedProducts[editIndex] = newProduct;
      setStatus("Producto actualizado exitosamente ✅");
      setEditIndex(null);
    } else {
      updatedProducts.push(newProduct);
      setStatus("Producto agregado exitosamente ✅");
    }

    updateLocalStorage(updatedProducts);
    setForm({ name: "", price: "", image: "", category: categories[0] });
    setFileImage(null);

    // Ocultar mensaje después de 3 segundos
    setTimeout(() => setStatus(""), 3000);
  };

  const handleDelete = (index) => {
    const newList = [...products];
    newList.splice(index, 1);
    updateLocalStorage(newList);
  };

  const handleEdit = (index) => {
    const item = products[index];
    setForm({ name: item.name, price: item.price, image: item.image, category: item.category });
    setEditIndex(index);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-28 pb-10 px-6 md:px-20 bg-pink-50 text-gray-800"
    >
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Panel de Administración</h1>

      {status && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
          {status}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-purple-600">
          {editIndex !== null ? "Editar Producto" : "Agregar Nuevo Producto"}
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Nombre del producto"
            className="border p-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Precio"
            className="border p-2 rounded"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="URL de la imagen (opcional)"
            className="border p-2 rounded"
            value={form.image}
            onChange={(e) => {
              setForm({ ...form, image: e.target.value });
              setFileImage(null);
            }}
          />
          <select
            className="border p-2 rounded"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <input
          type="file"
          accept="image/*"
          className="mt-2"
          onChange={(e) => {
            setFileImage(e.target.files[0]);
            setForm({ ...form, image: "" });
          }}
        />

        <button
          type="submit"
          className="mt-4 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
        >
          {editIndex !== null ? "Guardar Cambios" : "Agregar Producto"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-purple-600 font-semibold">Q{product.price}</p>
              <p className="text-gray-500 text-sm mb-2">Categoría: {product.category}</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                >
                  <Pencil className="w-4 h-4" /> Editar
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:underline text-sm flex items-center gap-1"
                >
                  <Trash className="w-4 h-4" /> Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AdminPanel;
