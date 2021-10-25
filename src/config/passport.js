const passport = require('passport')
const modeloUsuario = require('../models/modeloUsuario')
const estrategiaJWT = require("passport-jwt").Strategy
const extraerJWT = require("passport-jwt").ExtractJwt
const jWT = require("jsonwebtoken")
const moment = require("moment")
const duracion = moment.duration(7,"d").asSeconds()
const clave = 'MyClaveSegura'
exports.getToken = (data)=>{
    console.log(duracion)
    return jWT.sign(data,clave,{ expiresIn: duracion})
}
const opciones = {}
opciones.jwtFromRequest = extraerJWT.fromAuthHeaderAsBearerToken()
opciones.secretOrKey = clave

passport.use(new estrategiaJWT(opciones, async (payload,done)=>{
    return await modeloUsuario.findOne({
        where: {
            usuarioId: payload.usuarioId
        }
    })
    .then((data)=>{
        return done(null,data.usuarioId)
    })
    .catch((error)=>{
        return done(null,false)
    })
}))
exports.validarAutenticado = passport.authenticate('jwt',{session: false, failureRedirect:'/api/autenticacion/error'})