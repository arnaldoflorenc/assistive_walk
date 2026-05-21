import axios from 'axios';

export const getAIResults = async(req, res)=> {
    try { 
        // Busca apenas o resultado no endpoint results
        const resultResponse = await axios.get('https://aflorenc-assistiveai.hf.space/results');
        res.json(resultResponse.data);
    } catch (error) {
        console.error('Error processing AI request:', error);
        res.status(500).json({ message: 'Error processing AI request' });
    }
};