import React, { useEffect, useRef, useState } from 'react';

const Metricas = () => {

  const [result, setResult] = useState(null);
  const [erro, setErro] = useState('');
  const [iaAtiva, setIaAtiva] = useState(false);
  const [metricasSalvas, setMetricasSalvas] = useState(null);

  const imagensProcessadas = useRef(0);

  const classesDetectadas = useRef({
    pessoa: 0,
    veiculos: 0,
    arvore: 0,
    poste: 0,
    placa: 0,
    semaforo: 0,
    cachorro: 0,
    cone: 0
  });

  useEffect(() => {

    const token = localStorage.getItem('token');

    if (!token) {
      setErro('Usuário não autenticado.');
      return;
    }

    if (!iaAtiva) {

      fetch(
        'http://localhost:5000/ai/getmetrics',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

        .then(res => {

          if (!res.ok) {

            if (res.status === 404) {
              return null;
            }

            throw new Error(
              'Erro ao buscar métricas'
            );

          }

          return res.json();

        })

        .then(data => {

          if (data) {
            setMetricasSalvas(data);
          }

        })

        .catch(() => {

          setErro(
            'Erro ao buscar métricas'
          );

        });

      return;

    }

    const fetchResults = () => {

      fetch(
        'http://localhost:5000/ai/results',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

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

            setErro(
              'Nenhum resultado disponível.'
            );

            return;

          }

          imagensProcessadas.current += 1;

          if (data.detections) {

            data.detections.forEach(item => {

              let classe =
                item.class.toLowerCase();

              const veiculos = [
                'carro',
                'moto',
                'onibus',
                'caminhao',
                'van',
                'bicicleta'
              ];

              if (
                veiculos.includes(classe)
              ) {

                classe = 'veiculos';

              }

              if (
                classesDetectadas.current[classe] !==
                undefined
              ) {

                classesDetectadas.current[classe] += 1;

              }

              else {

                classesDetectadas.current[classe] = 1;

              }

            });

            data.detections =
              data.detections.filter(
                item =>
                  item.distance_m !== null &&
                  item.distance_m <= 10
              );

          }

          setResult(data);

        })

        .catch(() => {

          setErro(
            'Erro ao conectar ao servidor.'
          );

        });

    };

    fetchResults();

    const interval = setInterval(() => {

      fetchResults();

    }, 1000);

    return () => clearInterval(interval);

  }, [iaAtiva]);

  const conectarIA = () => {

    imagensProcessadas.current = 0;

    classesDetectadas.current = {
      pessoa: 0,
      veiculos: 0,
      arvore: 0,
      poste: 0,
      placa: 0,
      semaforo: 0,
      cachorro: 0,
      cone: 0
    };

    setMetricasSalvas(null);

    setIaAtiva(true);

  };

  const desconectarIA = async () => {

    const token =
      localStorage.getItem('token');

    const totalClassesDetectadas =
      Object.values(
        classesDetectadas.current
      ).reduce(
        (acc, valor) => acc + valor,
        0
      );

    const payload = {

      total: totalClassesDetectadas,

      imgs: imagensProcessadas.current,

      pessoa:
        classesDetectadas.current.pessoa,

      veiculos:
        classesDetectadas.current.veiculos,

      arvore:
        classesDetectadas.current.arvore,

      poste:
        classesDetectadas.current.poste,

      placa:
        classesDetectadas.current.placa,

      semaforo:
        classesDetectadas.current.semaforo,

      cachorro:
        classesDetectadas.current.cachorro,

      cone:
        classesDetectadas.current.cone

    };

    try {

      const postResponse =
        await fetch(
          'http://localhost:5000/ai/postmetrics',
          {
            method: 'POST',

            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },

            body: JSON.stringify(payload)
          }
        );

      if (!postResponse.ok) {

        throw new Error(
          'Erro ao salvar métricas'
        );

      }

      const metricsResponse =
        await fetch(
          'http://localhost:5000/ai/getmetrics',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

      if (!metricsResponse.ok) {

        throw new Error(
          'Erro ao buscar métricas'
        );

      }

      const metricsData =
        await metricsResponse.json();

      setMetricasSalvas(metricsData);

    }

    catch (e) {

      console.log(e);

    }

    setIaAtiva(false);

  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-8">
          Métricas e Detecção de Objetos
        </h1>

        <div className="flex justify-center mb-8">

          {!iaAtiva ? (

            <button
              onClick={conectarIA}
              className="
                px-6 py-3 rounded-xl
                text-white font-bold
                shadow-lg transition
                bg-green-600 hover:bg-green-700
              "
            >
              Conectar IA
            </button>

          ) : (

            <button
              onClick={desconectarIA}
              className="
                px-6 py-3 rounded-xl
                text-white font-bold
                shadow-lg transition
                bg-red-600 hover:bg-red-700
              "
            >
              Desconectar IA
            </button>

          )}

        </div>

        {!iaAtiva && metricasSalvas && (

          <div className="bg-white rounded-xl shadow p-6 mb-8">

            <h2 className="text-2xl font-bold mb-6">
              Métricas da Sessão
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="border rounded-xl p-4">

                <h3 className="text-xl font-semibold mb-3">
                  Processamento
                </h3>

                <p className="mb-2">
                  <strong>
                    Imagens Processadas:
                  </strong>{' '}
                  {metricasSalvas.imgs}
                </p>

                <p>
                  <strong>
                    Objetos Detectados:
                  </strong>{' '}
                  {metricasSalvas.total}
                </p>

              </div>

              <div className="border rounded-xl p-4">

                <h3 className="text-xl font-semibold mb-3">
                  Classes Detectadas
                </h3>

                <div className="space-y-2">

                  {Object.entries({

                    pessoa:
                      metricasSalvas.pessoa,

                    veiculos:
                      metricasSalvas.veiculos,

                    arvore:
                      metricasSalvas.arvore,

                    poste:
                      metricasSalvas.poste,

                    placa:
                      metricasSalvas.placa,

                    semaforo:
                      metricasSalvas.semaforo,

                    cachorro:
                      metricasSalvas.cachorro,

                    cone:
                      metricasSalvas.cone

                  }).map(
                    ([classe, quantidade]) => (

                      <div
                        key={classe}
                        className="
                          flex justify-between
                          border-b pb-1
                        "
                      >

                        <span className="capitalize">
                          {classe}
                        </span>

                        <span className="font-bold">
                          {quantidade}
                        </span>

                      </div>

                    )
                  )}

                </div>

              </div>

            </div>

          </div>

        )}

        {!iaAtiva ? (

          <div className="bg-white rounded-xl p-6 shadow text-center">
            IA desconectada
          </div>

        ) : !result ? (

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
                  className="w-full rounded-xl"
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

                  {result.detections.map(
                    (item, index) => (

                      <div
                        key={index}
                        className={`
                          border rounded-xl p-5
                          ${item.danger
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 bg-white'}
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

                        <p className="text-lg">
                          {item.message}
                        </p>

                      </div>

                    )
                  )}

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