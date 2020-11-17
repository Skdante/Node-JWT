const router = require('express').Router();
const Terreno = require('../moduls/Terrenos');
const joi = require('@hapi/joi');

const schemaSave = joi.object({
    vendedor: joi.string().min(6).max(255).required(),
    comprador: joi.string().min(6).max(255).required(),
    estatus: joi.number().required(),
    fechaCompra: joi.string().required(),
    descripcion: joi.string().allow(''),
    asientosmarcados: joi.string().required()
})

router.get('/', async(req, res) => {
    const terrenos = await Terreno.find();

    res.json({
        error: null,
        data: terrenos
    })
})

router.post('/save', async(req, res) => {
    // validaciones de terrenos
    const { error } = schemaSave.validate(req.body)
    if(error) return res.status(400).json({error: error.details[0].message})

    const terreno = new Terreno({
        vendedor: req.body.vendedor,
        comprador: req.body.comprador,
        estatus: req.body.estatus,
        fechaCompra: req.body.fechaCompra,
        descripcion: req.body.descripcion,
        asientosmarcados: req.body.asientosmarcados,
    })

    try {
        terrenoDB = await terreno.save();

        res.json({
            error: null,
            data: terrenoDB
        })
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router;