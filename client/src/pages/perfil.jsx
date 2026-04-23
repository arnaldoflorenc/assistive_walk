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
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Perfil do Usuário</h2>
      <div className="bg-white rounded-lg shadow p-6 max-w-md">
        {user ? (
          <>
            <p><strong>Nome:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Status:</strong> Ativo</p>
          </>
        ) : (
          <p>{erro || 'Carregando...'}</p>
        )}
      </div>
    </div>
  );
};

export default Perfil;
