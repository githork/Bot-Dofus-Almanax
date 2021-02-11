const {ver_ofrenda_fecha} = require('../functions/mensaje.functions.js')
const {hora_actual} = require('../functions/tiempo.functions.js')



function crear_canal (msg) {
    var server = msg.guild;
    var name = msg.author.username;
    server.createChannel(name, "text");
}



function buscar_canal () {

}



function aviso_con_intervalo (intervalo_ms, client, id_canal) { // ms = 1000
    let aviso = setInterval(function () {
        let hora_francia = hora_actual()[1].hora.toString()
        let lista = hora_francia.split(':')
        let h = lista[0], m = lista[1], s = lista[2]
        hora_francia == '12:00:00' || hora_francia == '00:00:00' ? ver_ofrenda_fecha(null, "", client, id_canal) : false
        h == '23' ? ((m == '30' || m == '45' || m == '50') && s == '00' ? ver_ofrenda_fecha(null, "", client, id_canal) : false) : false
    }, intervalo_ms)
    return aviso
}

module.exports = {crear_canal, aviso_con_intervalo}