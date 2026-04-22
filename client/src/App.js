import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import Cadastro from './pages/cadastro';
import Login from './pages/login';
import Sidebar from './components/Sidebar';
import Perfil from './pages/perfil';
import Assinatura from './pages/assinatura';
import Metricas from './pages/metricas';
import './App.css';

import { useState } from 'react';


function App() {
  // Simulação de autenticação
  const [isLogged, setIsLogged] = useState(false);

  return (
    <Router>
      <div className="App flex">
        {isLogged && <Sidebar />}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login onLogin={() => setIsLogged(true)} />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/assinatura" element={<Assinatura />} />
            <Route path="/metricas" element={<Metricas />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
