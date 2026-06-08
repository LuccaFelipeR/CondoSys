const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();

const authRoutes = require('./src/routes/authRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');
const moradorRoutes = require('./src/routes/moradorRoutes');
const unidadeRoutes = require('./src/routes/unidadeRoutes');
const reservaRoutes = require('./src/routes/reservaRoutes');
const ocorrenciaRoutes = require('./src/routes/ocorrenciaRoutes');
const funcionarioRoutes = require('./src/routes/funcionarioRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'condosys_secret',
  resave: false,
  saveUninitialized: false
}));

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.use('/', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/moradores', moradorRoutes);
app.use('/funcionarios', funcionarioRoutes);
app.use('/reservas', reservaRoutes);
app.use('/unidades', unidadeRoutes);
app.use('/ocorrencias', ocorrenciaRoutes);
app.use('/usuarios', usuarioRoutes);

app.use((req, res) => {
  res.status(404).send('Página não encontrada.');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});