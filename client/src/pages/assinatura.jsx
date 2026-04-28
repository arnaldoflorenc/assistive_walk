import React, { useEffect, useState } from 'react';

function ModalAssinatura({ onClose, onEscolherPlano }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-80 flex flex-col items-center">
        <h3 className="text-xl font-bold mb-4">Escolha seu plano</h3>
        <button
          className="w-full mb-3 py-2 px-4 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          onClick={() => onEscolherPlano('anual')}
        >
          Assinar Anual
        </button>
        <button
          className="w-full mb-3 py-2 px-4 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition"
          onClick={() => onEscolherPlano('mensal')}
        >
          Assinar Mensal
        </button>
        <button
          className="mt-2 text-gray-500 hover:underline"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}


const Assinatura = () => {
  const [assinatura, setAssinatura] = useState(null);
  const [erro, setErro] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetch('http://localhost:5000/users/assinatura', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setCarregado(true);
        if (data && data.plan) setAssinatura(data);
        else setShowModal(true);
      })
      .catch(() => {
        setCarregado(true);
        setErro('Erro ao conectar ao servidor.');
      });
  }, []);

  const handleEscolherPlano = (plano) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetch('http://localhost:5000/users/assinatura', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ plan: plano })
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.plan) {
          setAssinatura(data);
          setShowModal(false);
          alert(`Plano escolhido: ${plano}`);
          window.location.reload();
        }
      })
      .catch(() => {
        setErro('Erro ao conectar ao servidor.');
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Assinatura</h2>
      <div className="bg-white rounded-lg shadow p-8 w-full max-w-md flex flex-col items-center">
        {assinatura ? (
          <>
            <p className="mb-2"><strong>Plano:</strong> {assinatura.plan}</p>
            <p className="mb-2"><strong>Validade:</strong> {assinatura.expiresAt}</p>
            <p className="mb-2"><strong>Status:</strong> {assinatura.status}</p>
          </>
        ) : (
          <p>{carregado ? erro || 'Sem assinatura ativa.' : 'Carregando...'}</p>
        )}
      </div>
      {showModal && (
        <ModalAssinatura
          onClose={() => setShowModal(false)}
          onEscolherPlano={handleEscolherPlano}
        />
      )}
    </div>
  );
};

export default Assinatura;
