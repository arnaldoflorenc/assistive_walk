import React, { useEffect, useState } from 'react';

const Metricas = () => {
  const [metricas, setMetricas] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    // Exemplo de requisição autenticada
    fetch('http://localhost:5000/users/metricas', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.textosGerados !== undefined) setMetricas(data);
        else setErro('Erro ao carregar métricas');
      })
      .catch(() => setErro('Erro ao conectar ao servidor.'));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Métricas da IA</h2>
      <div className="bg-white rounded-lg shadow p-8 w-full max-w-md flex flex-col items-center">
        {metricas ? (
          <>
            <p className="mb-2"><strong>Textos gerados:</strong> {metricas.textosGerados}</p>
            <p className="mb-2"><strong>Palavras geradas:</strong> {metricas.palavrasGeradas}</p>
            <p className="mb-2"><strong>Última geração:</strong> {metricas.ultimaGeracao}</p>
          </>
        ) : (
          <p>{erro || 'Carregando...'}</p>
        )}
      </div>
    </div>
  );
};

export default Metricas;
