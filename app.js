const express = require('express');
const connectDB = require('./db');
const userRoutes = require('./routes/users');
const contactRoutes = require('./routes/contacts');
const groupRoutes = require('./routes/groups');

const app = express();
app.use(express.json());
connectDB();

app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/groups', groupRoutes);

const port = 3000;
app.listen(port, () => console.log(`Aplicación escuchando en http://localhost:${port}`));