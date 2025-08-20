import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import pokemonRouter from './pokemon/pokemon.routes.js';
import path from 'path';
import { notFoundHandler, errorHandler } from './common/error.middleware.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));
// Serve uploaded images statically
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/pokemons', pokemonRouter);

//Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  const PORT = process.env.PORT || 3000;
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI not set');
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
