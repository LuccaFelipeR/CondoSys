require("dotenv").config();
const express = require("express");
const session= require("express-session");
const app = express();

// Configurando um middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("src/public"));
app.use(session({
    secret: 'condosys-secret',
    resave: false,
    saveUninitialized: false
})
);

//Congifurando o ejs
app.set("view engine", "ejs");
app.set("views", "./src/views");

// Renderizando o HTML/EJS
app.get("/", (req, res) => {
  res.redirect('/login')
});

// registrando as rotas
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const moradorRoutes = require('./routes/moradorRoutes');


app.use(authRoutes);

app.get('/dashboard', authMiddleware, (req, res) =>{
   
    res.render('dashboard/index', {
      usuario: req.session.usuario
    });
});
app.use('/moradores', authMiddleware, moradorRoutes);


//Inicializar o servidor

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Servidor executando..., ${PORT}`);
});
