const {ver_ofrenda_fecha} = require('../functions/mensaje.functions.js')



module.exports = {
    nombre: 'hoy',
    descripcion: 'Muestra la ofrenda del día actual',
    execute(msg, client, id_canal) {
        ver_ofrenda_fecha(msg, "", client, id_canal)
    }
}