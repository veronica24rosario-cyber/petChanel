import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Home, Info, PawPrint, ShoppingCart, Mail, User, Settings, LogOut } from 'lucide-react';

const Header = ({ isLoggedIn, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const sideMenuItems = [
    { to: '/about', label: 'Nosotros', icon: Info },
    { to: '/services', label: 'Servicios', icon: PawPrint },
    { to: '/contact', label: 'Contacto', icon: Mail },
    isLoggedIn
      ? { to: '/admin', label: 'Panel Admin', icon: Settings }
      : { to: '/login', label: 'Login', icon: User },
  ];

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <>
      {/* Encabezado */}
      <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4">
        {/* Logo + Links principales */}
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-bold text-purple-700 flex items-center gap-2">
            🐾 PetChanel
          </Link>

          <Link
            to="/"
            className={`flex items-center gap-1 px-3 py-1 rounded-lg ${
              location.pathname === '/' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <Home className="w-5 h-5" />
            Inicio
          </Link>

          <Link
            to="/store"
            className={`flex items-center gap-1 px-3 py-1 rounded-lg ${
              location.pathname === '/store'
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            Tienda
          </Link>
        </div>

        {/* Botón menú lateral */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 text-gray-600 hover:text-purple-600"
        >
          <Menu className="w-6 h-6" />
          <span className="text-sm font-medium">Menú Más</span>
        </button>
      </header>

      {/* Sidebar lateral derecho */}
      {menuOpen && (
        <div className="fixed top-20 right-0 w-52 h-full bg-white shadow-lg z-40 p-4">
          <nav className="space-y-4">
            {sideMenuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${
                    location.pathname === item.to
                      ? 'bg-purple-100 text-purple-700 font-semibold'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}

            {isLoggedIn && (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-red-500 hover:text-red-700"
              >
                <LogOut className="w-5 h-5" />
                Cerrar sesión
              </button>
            )}
          </nav>
        </div>
      )}

      {/* Espacio para que el contenido no quede tapado */}
      <div className="pt-20" />
    </>
  );
};

export default Header;
