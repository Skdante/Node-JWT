const router = require('express').Router();
const User = require('../moduls/User');
const joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const schemaLogin = joi.object({
    email: joi.string().min(6).max(255).required().email(),
    password: joi.string().min(6).max(1024).required()
})

const schemaRegister = joi.object({
    name: joi.string().min(6).max(255).required(),
    email: joi.string().min(6).max(255).required().email(),
    password: joi.string().min(6).max(1024).required()
})

router.post('/login', async(req,res) => {

    // validaciones de usuario
    const { error } = schemaLogin.validate(req.body)
    if(error) return res.status(400).json({error: error.details[0].message})

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).json({error: true, email: 'Credenciales invalidas'})
    
    const passvalida = await bcrypt.compare(req.body.password, user.password)
    if(!passvalida) return res.status(400).json({error: true, password: 'Credenciales invalidas'})

    // creamos el token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.TOKEN_SECRET)

    res.header('auth-token',token).json({
        error: null,
        data: token
    })
})

router.post('/register', async(req,res) => {

    // validaciones de usuario
    const { error } = schemaRegister.validate(req.body)
    if(error) return res.status(400).json({error: error.details[0].message})

    const isEmailExist = await User.findOne({email: req.body.email});
    if(isEmailExist) return res.status(400).json({error: true, email: 'Email ya registrado'})

    // hash de contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    })

    try {
        userDB = await user.save();

        res.json({
            error: null,
            data: userDB
        })
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router;