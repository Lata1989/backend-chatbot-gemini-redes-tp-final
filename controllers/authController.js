import jwt from 'jsonwebtoken';

const users = []; // Aquí puedes implementar una base de datos en lugar de un array en memoria

export const registerUser = (req, res) => {
    const { username, password } = req.body;

    // Asegúrate de que el usuario no exista ya
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'Usuario ya existe' });
    }

    // Guarda el nuevo usuario
    users.push({ username, password }); // Usa una base de datos en lugar de esto
    res.status(201).json({ message: 'Usuario registrado' });
};

export const loginUser = (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};
