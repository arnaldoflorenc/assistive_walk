import React, { useEffect, useState } from 'react';

const Assinatura = () => {
  const [assinatura, setAssinatura] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    // Exemplo de requisição autenticada
    fetch('http://localhost:5000/users/assinatura', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.plan) setAssinatura(data);
        else setErro('Erro ao carregar assinatura');
      })
      .catch(() => setErro('Erro ao conectar ao servidor.'));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Assinatura</h2>
      <div className="bg-white rounded-lg shadow p-6 max-w-md">
        {assinatura ? (
          <>
            <p><strong>Plano:</strong> {assinatura.plan}</p>
            <p><strong>Validade:</strong> {assinatura.expiresAt}</p>
            <p><strong>Status:</strong> {assinatura.status}</p>
          </>
        ) : (
          <p>{erro || 'Carregando...'}</p>
        )}
      </div>
    </div>
  );
};

export default Assinatura;
