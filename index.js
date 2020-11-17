const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config();

const app = express();

// cors
const cors = require('cors');
var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 
}
app.use(cors(corsOptions));

// capturar body
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// conexión a base de datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.pwd1u.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true}
mongoose.connect(uri,options)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('errordb:', e))

// import routes
const authRoutes = require('./routes/auth');
const validaToken = require('./routes/validate-token');
const dashboard = require('./routes/dashboard');
const terrenos = require('./routes/terrenos');

// route middleware
app.use('/api/user', authRoutes);
app.use('/api/admin', validaToken, dashboard);
app.use('/api/terrenos', terrenos);
app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funcional'
    })
})

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})