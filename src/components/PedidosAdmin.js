import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const PedidosAdmin = () => {
  const [pedidos, setPedidos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  // 🔹 Cargar pedidos desde Firebase
  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pedidos"));
        const data = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setPedidos(data);
      } catch (error) {
        console.error("Error al cargar pedidos:", error);
      }
    };
    fetchPedidos();
  }, []);

  // 🔹 Marcar pedido como Atendido
  const marcarAtendido = async (id) => {
    try {
      const pedidoRef = doc(db, "pedidos", id);
      await updateDoc(pedidoRef, { estado: "Atendido" });
      setPedidos((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, estado: "Atendido" } : p
        )
      );
      setMensaje("✅ Pedido marcado como atendido");
      setTimeout(() => setMensaje(""), 3000);
    } catch (error) {
      console.error("Error al actualizar pedido:", error);
    }
  };

  // 🔹 Marcar pedido como Pendiente
  const marcarPendiente = async (id) => {
    try {
      const pedidoRef = doc(db, "pedidos", id);
      await updateDoc(pedidoRef, { estado: "Pendiente" });
      setPedidos((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, estado: "Pendiente" } : p
        )
      );
      setMensaje("⚠️ Pedido marcado como pendiente");
      setTimeout(() => setMensaje(""), 3000);
    } catch (error) {
      console.error("Error al actualizar pedido:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-28 pb-20 px-6 md:px-20 bg-purple-50 text-gray-800"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-700">
          📦 Pedidos Recibidos
        </h1>

        {/* 🔙 Botón Regresar */}
        <Link
          to="/admin"
          className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md font-semibold transition"
        >
          <ArrowLeft className="mr-2" size={18} />
          Regresar
        </Link>
      </div>

      {mensaje && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
          {mensaje}
        </div>
      )}

      {pedidos.length === 0 ? (
        <p className="text-center text-gray-500">No hay pedidos registrados.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pedidos.map((pedido) => (
            <div
              key={pedido.id}
              className="bg-white shadow-md rounded-xl p-6 border border-purple-100"
            >
              <h2 className="text-xl font-bold text-purple-700 mb-2">
                {pedido.cliente?.nombre || "Cliente sin nombre"}
              </h2>
              <p className="text-gray-600 mb-1">
                📞 <strong>Teléfono:</strong> {pedido.cliente?.telefono}
              </p>
              <p className="text-gray-600 mb-1">
                🕒 <strong>Fecha:</strong> {pedido.fecha}
              </p>
              <p className="text-gray-600 mb-3">
                💰 <strong>Total:</strong> Q{pedido.total}
              </p>

              <div className="border-t pt-3 mb-3">
                <h3 className="font-semibold text-purple-600 mb-2">
                  Productos solicitados:
                </h3>
                <ul className="list-disc ml-6 text-gray-700 text-sm">
                  {pedido.productos?.map((prod, i) => (
                    <li key={i}>
                      {prod.nombre} — Q{prod.precio}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 🔹 Estado actual */}
              <p
                className={`font-semibold mb-3 ${
                  pedido.estado === "Atendido"
                    ? "text-green-600"
                    : "text-orange-500"
                }`}
              >
                Estado: {pedido.estado || "Pendiente"}
              </p>

              {/* 🔹 Botones de acción */}
              <div className="flex gap-3">
                <button
                  onClick={() => marcarAtendido(pedido.id)}
                  disabled={pedido.estado === "Atendido"}
                  className={`flex items-center justify-center px-4 py-2 rounded-md font-semibold transition ${
                    pedido.estado === "Atendido"
                      ? "bg-green-100 text-green-600 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  <CheckCircle className="mr-2" size={18} />
                  Atendido
                </button>

                <button
                  onClick={() => marcarPendiente(pedido.id)}
                  disabled={pedido.estado === "Pendiente"}
                  className={`flex items-center justify-center px-4 py-2 rounded-md font-semibold transition ${
                    pedido.estado === "Pendiente"
                      ? "bg-orange-100 text-orange-600 cursor-not-allowed"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                  }`}
                >
                  <Clock className="mr-2" size={18} />
                  Pendiente
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default PedidosAdmin;
