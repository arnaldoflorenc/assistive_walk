import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaChartBar, FaRegIdBadge, FaChevronLeft, FaChevronRight, FaSignOutAlt } from 'react-icons/fa';


const Sidebar = () => {
  const [minimizada, setMinimizada] = useState(false);
  const [user, setUser] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Busca dados do usuário do localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setUser({ name: parsed.name || '', email: parsed.email || '' });
      } catch {
        setUser({ name: '', email: '' });
      }
    } else {
      setUser({ name: '', email: '' });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  return (
    <aside className={`h-screen bg-gray-900 text-white flex flex-col py-8 px-2 shadow-lg transition-all duration-200 ${minimizada ? 'w-20' : 'w-56'}`}>
      {/* Botão de minimizar/ampliar */}
      <button
        className="self-end mb-6 p-1 rounded hover:bg-gray-800 transition"
        onClick={() => setMinimizada((m) => !m)}
        aria-label={minimizada ? 'Expandir sidebar' : 'Minimizar sidebar'}
      >
        {minimizada ? <FaChevronRight size={20} /> : <FaChevronLeft size={20} />}
      </button>

      {/* Mini perfil */}
      <div className={`flex items-center gap-3 mb-10 ${minimizada ? 'flex-col' : ''}`}>
        <div className="bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center">
          <FaUser size={22} />
        </div>
        {!minimizada && (
          <div>
            <div className="font-semibold text-base leading-tight">{user.name || 'Usuário'}</div>
            <div className="text-xs text-gray-300">{user.email || ''}</div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-8 flex-1">
        <Link to="/assinatura" className={`flex items-center gap-3 cursor-pointer hover:bg-gray-800 rounded p-2 ${minimizada ? 'justify-center' : ''}`}>
          <FaRegIdBadge size={22} />
          {!minimizada && <span className="text-lg">Assinaturas</span>}
        </Link>
        <Link to="/perfil" className={`flex items-center gap-3 cursor-pointer hover:bg-gray-800 rounded p-2 ${minimizada ? 'justify-center' : ''}`}>
          <FaUser size={22} />
          {!minimizada && <span className="text-lg">Perfil</span>}
        </Link>
        <Link to="/metricas" className={`flex items-center gap-3 cursor-pointer hover:bg-gray-800 rounded p-2 ${minimizada ? 'justify-center' : ''}`}>
          <FaChartBar size={22} />
          {!minimizada && <span className="text-lg">Métricas</span>}
        </Link>
      </div>

      {/* Botão de logout */}
      <button
        className={`mt-8 flex items-center gap-2 px-3 py-2 rounded bg-red-600 hover:bg-red-700 transition ${minimizada ? 'justify-center w-10' : 'w-full'}`}
        onClick={handleLogout}
        title="Sair"
      >
        <FaSignOutAlt size={20} />
        {!minimizada && <span className="font-semibold">Logout</span>}
      </button>
    </aside>
  );
};

export default Sidebar;
