import express from 'express';
import cors from 'cors';
import userRoutes from './src/routes/userRoutes.js';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors()); //enable CORS for all routes
app.use(express.json()); //parse JSON request bodies


app.use('/users', userRoutes); //use user routes for any endpoint that starts with /users


app.get('/', (req, res) => {
  res.send('Server up!!!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});