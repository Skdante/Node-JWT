const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).json({error: 'Acceso denegado'})

    try {
        const verificado = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verificado
        next() // continuamos
    } catch (error) {
        res.status(401).json({error: 'Token no valido'})
    }
}

module.exports = verifyToken;