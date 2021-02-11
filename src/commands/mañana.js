const {ver_ofrenda_fecha} = require('../functions/mensaje.functions.js')
const {hora_actual} = require('../functions/tiempo.functions.js')


module.exports = {
    nombre: 'mañana',
    descripcion: 'Muestra la ofrenda de mañana.',
    execute(msg, client, id_canal) {
        let fecha_fr = hora_actual()[1].fecha.split('-')
        let date = new Date(parseInt(fecha_fr[0]), (parseInt(fecha_fr[1]) - 1), (parseInt(fecha_fr[2]) + 1))
        ver_ofrenda_fecha(msg, '/'+date.toLocaleDateString("es-CL", {year: 'numeric', month: '2-digit', day: '2-digit'}), client, id_canal)
    }
}