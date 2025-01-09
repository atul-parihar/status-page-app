import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './utils/db.js';
import authRoutes from './routes/authRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import incidentRoutes from './routes/incidentRoutes.js';

const PORT = process.env.PORT || 10000;

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/incidents', incidentRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

