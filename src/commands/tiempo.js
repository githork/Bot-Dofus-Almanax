const {mensaje_tiempo} = require('../functions/mensaje.functions.js')



module.exports = {
    nombre: 'tiempo',
    descripcion: 'Muestra el tiempo del país actual y de la ciudad de Paris.',
    execute(msg, client) {
        msg.channel.send(mensaje_tiempo(client))
    }
}