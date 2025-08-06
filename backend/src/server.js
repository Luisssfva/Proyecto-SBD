import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;


app.use(express.static(path.join(__dirname, '../../frontend/views')));
app.use(express.static(path.join(__dirname, '../../frontend/assets')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/views/index.html'));
});

app.post('/api/register', express.json(), (req, res) => {
    console.log('Registrando usuario:', req.body);
    res.json({ success: true, redirect: '/home' });
});

app.post('/api/login', express.json(), (req, res) => {
    console.log('Iniciando sesión:', req.body);
    res.json({ success: true, redirect: '/home' });
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/views/register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/views/login.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/views/home.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando: http://localhost:${PORT}`);
});