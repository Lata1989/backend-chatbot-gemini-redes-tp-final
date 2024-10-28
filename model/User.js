import { MongoClient } from 'mongodb';

export const User = {
    // Aquí puedes definir métodos para interactuar con la base de datos
    createUser: async (db, userData) => {
        const result = await db.collection('users').insertOne(userData);
        return result;
    },
    findUserByEmail: async (db, email) => {
        const user = await db.collection('users').findOne({ email });
        return user;
    },
};
