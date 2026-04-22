import React from 'react';

const Perfil = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Perfil do Usuário</h2>
      <div className="bg-white rounded-lg shadow p-6 max-w-md">
        <p><strong>Nome:</strong> Seu Nome</p>
        <p><strong>Email:</strong> seuemail@email.com</p>
        <p><strong>Status:</strong> Ativo</p>
      </div>
    </div>
  );
};

export default Perfil;
