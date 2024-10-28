import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

export const connectDB = async () => {
    try {
        await client.connect();
        console.log("MongoDB conectado con éxito.");
        return client.db('ChatBot');
    } catch (error) {
        console.error("Error conectando a MongoDB:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
};
