import axios from 'axios';
import prisma from '../database/prisma.js';

export const getAIResults = async(req, res)=> {
    try { 
        //cat the results from the AI model and return it to the client
        const resultResponse = await axios.get('https://aflorenc-assistiveai.hf.space/results');
        res.json(resultResponse.data);
    } catch (error) {
        console.error('Error processing AI request:', error);
        res.status(500).json({ message: 'Error processing AI request' });
    }
};


// Salvar ou atualizar métricas do usuário
export const postAIMetrics = async (req, res) => {
    try {
        const userId = req.user.userId;
        const {
            total = 0,
            cachorro = 0,
            arvore = 0,
            veiculos = 0,
            poste = 0,
            cone = 0,
            pessoa = 0,
            placa = 0,
            semaforo = 0,
            imgs = 0
        } = req.body;

        // Verifica se já existe métricas para o usuário
        const existing = await prisma.metricas.findUnique({ where: { userID: userId } });

        let metricas;
        if (existing) {
            // Atualiza as métricas existentes
            metricas = await prisma.metricas.update({
                where: { userID: userId },
                data: {
                    total,
                    cachorro,
                    arvore,
                    veiculos,
                    poste,
                    cone,
                    pessoa,
                    placa,
                    semaforo,
                    imgs
                }
            });
        } else {
            // Cria novas métricas
            metricas = await prisma.metricas.create({
                data: {
                    userID: userId,
                    total,
                    cachorro,
                    arvore,
                    veiculos,
                    poste,
                    cone,
                    pessoa,
                    placa,
                    semaforo,
                    imgs
                }
            });
        }
        res.status(200).json({ message: 'Métricas salvas com sucesso', metricas });
    } catch (error) {
        console.error('Erro ao salvar métricas:', error);
        res.status(500).json({ message: 'Erro ao salvar métricas' });
    }
};

// Buscar métricas do usuário autenticado
export const getAImetrics = async (req, res) => {
    try {
        const userId = req.user.userId;
        const metricas = await prisma.metricas.findUnique({ where: { userID: userId } });
        if (!metricas) {
            return res.status(404).json({ message: 'Nenhuma métrica encontrada para o usuário.' });
        }
        res.json(metricas);
    } catch (error) {
        console.error('Erro ao buscar métricas:', error);
        res.status(500).json({ message: 'Erro ao buscar métricas' });
    }
};
