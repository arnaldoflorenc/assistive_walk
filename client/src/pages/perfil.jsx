import React, { useEffect, useState } from 'react';

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    // Exemplo de requisição autenticada
    fetch('http://localhost:5000/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.email) setUser(data);
        else setErro('Erro ao carregar perfil');
      })
      .catch(() => setErro('Erro ao conectar ao servidor.'));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Perfil do Usuário</h2>
      <div className="bg-white rounded-lg shadow p-8 w-full max-w-md flex flex-col items-center">
        {user ? (
          <>
            <p className="mb-2"><strong>Nome:</strong> {user.name}</p>
            <p className="mb-2"><strong>Email:</strong> {user.email}</p>
            <p className="mb-2"><strong>Status:</strong> Ativo</p>
          </>
        ) : (
          <p>{erro || 'Carregando...'}</p>
        )}
      </div>
    </div>
  );
};

export default Perfil;
