import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import Cadastro from './pages/cadastro';
import Login from './pages/login';
import Sidebar from './components/Sidebar';
import Perfil from './pages/perfil';
import Assinatura from './pages/assinatura';
import Metricas from './pages/metricas';
import './App.css';


import { useState, useEffect } from 'react';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function App() {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    setIsLogged(!!localStorage.getItem('token'));
  }, []);

  return (
    <Router>
      <div className="App flex">
        {isLogged && <Sidebar />}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login onLogin={() => setIsLogged(true)} />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
            <Route path="/assinatura" element={<PrivateRoute><Assinatura /></PrivateRoute>} />
            <Route path="/metricas" element={<PrivateRoute><Metricas /></PrivateRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
