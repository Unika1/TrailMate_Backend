import express from 'express';
import cors from 'cors';
import path from 'path';
import authRoutes from './presentation/routes/auth.routes';
import trekRoutes from './presentation/routes/trek.routes';

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// Serve uploaded comment images.
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/', (_req, res) => {
  res.json({ message: 'TrailMate API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api', trekRoutes);

export default app;
