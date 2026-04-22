import React from 'react';

const Metricas = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Métricas da IA</h2>
      <div className="bg-white rounded-lg shadow p-6 max-w-md">
        <p><strong>Textos gerados:</strong> 42</p>
        <p><strong>Palavras geradas:</strong> 12.345</p>
        <p><strong>Última geração:</strong> 22/04/2026</p>
      </div>
    </div>
  );
};

export default Metricas;
