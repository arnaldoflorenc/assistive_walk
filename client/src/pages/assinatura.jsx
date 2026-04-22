import React from 'react';

const Assinatura = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Assinatura</h2>
      <div className="bg-white rounded-lg shadow p-6 max-w-md">
        <p><strong>Plano:</strong> Premium</p>
        <p><strong>Validade:</strong> 31/12/2026</p>
        <p><strong>Status:</strong> Ativa</p>
      </div>
    </div>
  );
};

export default Assinatura;
