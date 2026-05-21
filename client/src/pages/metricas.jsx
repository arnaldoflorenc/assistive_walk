import React, { useEffect, useState } from 'react';

const Metricas = () => {

  const [result, setResult] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {

    const token = localStorage.getItem('token');

    if (!token) {
      setErro('Usuário não autenticado.');
      return;
    }

    const fetchResults = () => {

      fetch('http://localhost:5000/ai/results', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

        .then(res => {

          if (!res.ok) {
            throw new Error(
              'Erro ao buscar resultados da IA'
            );
          }

          return res.json();
        })

        .then(data => {

          if (!data) {
            setErro('Nenhum resultado disponível.');
            return;
          }

          if (data.detections) {

            data.detections = data.detections.filter(
              item =>
                item.distance_m !== null &&
                item.distance_m <= 10
            );
          }

          setResult(data);
        })

        .catch(() => {
          setErro('Erro ao conectar ao servidor.');
        });

    };

    fetchResults();

    const interval = setInterval(() => {
      fetchResults();
    }, 1000);

    return () => clearInterval(interval);

  }, []);

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-8">
          Resultados da IA
        </h1>

        {!result ? (

          <div className="bg-white rounded-xl p-6 shadow text-center">
            {erro || 'Carregando...'}
          </div>

        ) : (

          <div className="space-y-8">

            {result.frame && (

              <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-2xl font-semibold mb-4">
                  Imagem Processada
                </h2>

                <img
                  src={`data:image/jpeg;base64,${result.frame}`}
                  alt="frame"
                  className="w-full rounded-lg"
                />

              </div>

            )}

            <div className="bg-white rounded-xl shadow p-6">

              <h2 className="text-2xl font-semibold mb-6">
                Objetos Detectados
              </h2>

              {result.detections.length === 0 ? (

                <p>
                  Nenhum objeto detectado.
                </p>

              ) : (

                <div className="grid gap-4">

                  {result.detections.map((item, index) => (

                    <div
                      key={index}
                      className={`
                        border rounded-xl p-5
                        ${item.danger
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200'}
                      `}
                    >

                      <div className="flex justify-between items-center mb-3">

                        <h3 className="text-xl font-bold capitalize">
                          {item.class}
                        </h3>

                        <span className={`
                          px-3 py-1 rounded-full text-sm font-semibold
                          ${item.danger
                            ? 'bg-red-500 text-white'
                            : 'bg-green-500 text-white'}
                        `}>
                          {item.danger
                            ? 'PERIGO'
                            : 'SEGURO'}
                        </span>

                      </div>

                      <div className="grid grid-cols-2 gap-3">

                        <p>
                          <strong>Confiança:</strong>{' '}
                          {item.confidence}
                        </p>

                        <p>
                          <strong>Distância:</strong>{' '}
                          {item.distance_m}m
                        </p>

                        <p>
                          <strong>Direção:</strong>{' '}
                          {item.direction}
                        </p>

                        <p>
                          <strong>Mensagem:</strong>{' '}
                          {item.message}
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default Metricas;