// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import geminiRoutes from './routes/geminiRoutes.js';
import carRoutes from './routes/carRoutes.js'; // Importar rutas de autos

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Asegúrate de que esto esté antes de las rutas

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/gemini', geminiRoutes);
app.use('/api/cars', carRoutes); // Usar rutas de autos

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch(err => {
    console.error("Failed to connect to MongoDB:", err);
});

app.get('/', (req, res) => {
    res.send("Bienvenido a la API");
});


/*
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import apiRoutes from './routes/geminiRoutes.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware para permitir CORS y analizar JSON
app.use(cors());
app.use(express.json()); // Asegúrate de que esto esté antes de las rutas

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY);

app.post("/gemini", async (req, res) => {
    console.log(req.body.history);
    console.log(req.body.message);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const chat = model.startChat({
        history: req.body.history
    })
    const msg = req.body.message;

    const result = await chat.sendMessage(msg);
    const response = await result.response
    const text = response.text();
    // Aquí podrías manejar la lógica para comunicarte con Google Generative AI
    res.json({ success: true, message: "Mensaje recibido.", text }); // Responde para evitar errores
});

// Conectar a MongoDB
let db;
connectDB().then(database => {
    db = database;

    // Inicializar el servidor solo después de conectar a MongoDB
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch(err => {
    console.error("Failed to connect to MongoDB:", err);
});

// Rutas
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.send("Bienvenido a la API");
});
*/