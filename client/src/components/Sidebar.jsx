import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaChartBar, FaRegIdBadge, FaChevronLeft, FaChevronRight } from 'react-icons/fa';


const Sidebar = () => {
  // Simulação de usuário logado
  const user = {
    nome: 'Seu Nome',
    email: 'seuemail@email.com',
  };

  const [minimizada, setMinimizada] = useState(false);

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
            <div className="font-semibold text-base leading-tight">{user.nome}</div>
            <div className="text-xs text-gray-300">{user.email}</div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-8">
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
    </aside>
  );
};

export default Sidebar;
