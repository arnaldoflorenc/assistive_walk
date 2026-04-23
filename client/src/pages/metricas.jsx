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
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Métricas da IA</h2>
      <div className="bg-white rounded-lg shadow p-6 max-w-md">
        {metricas ? (
          <>
            <p><strong>Textos gerados:</strong> {metricas.textosGerados}</p>
            <p><strong>Palavras geradas:</strong> {metricas.palavrasGeradas}</p>
            <p><strong>Última geração:</strong> {metricas.ultimaGeracao}</p>
          </>
        ) : (
          <p>{erro || 'Carregando...'}</p>
        )}
      </div>
    </div>
  );
};

export default Metricas;
