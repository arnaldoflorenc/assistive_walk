import express from 'express';
import userRoutes from './src/routes/userRoutes.js';

const PORT = process.env.PORT || 5000;
const app = express();

app.use('/users', userRoutes); //use user routes for any endpoint that starts with /users


app.get('/', (req, res) => {
  res.send('Server up and rning🚀');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});