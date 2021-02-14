const {ver_ofrenda_fecha} = require('../functions/mensaje.functions.js')
const {hora_actual} = require('../functions/tiempo.functions.js')



function crear_canal (msg) {
    var server = msg.guild;
    var name = msg.author.username;
    server.createChannel(name, "text");
}



function aviso_con_intervalo (intervalo_ms, client, id_canal) { // ms = 1000
    let aviso = setInterval(function () {
        let hora_francia = hora_actual()[1].hora.toString(), fecha_francia = hora_actual()[1].fecha.toString()
        let lista = hora_francia.split(':')
        let h = lista[0], m = lista[1], s, medio
        try {
            if (lista[2].split(' ').length >= 2) {
                s = lista[2].split(' ')[0]
                medio = lista[2].split(' ')[1]
            } else {
                s = lista[2]
                medio = null
            }
        } catch (e) {
            s = lista[2]
            medio = null
        }
        h == '12' || h == '06' || h == '00' ? ( m == '00' && s == '00' ? ver_ofrenda_fecha(null, "", client, id_canal,
            (medio == 'AM' && h == '12') || h == '00' ? `Nueva de ofrenda de la fecha ${fecha_francia}!` : `No olvidar la ofrenda de la fecha ${fecha_francia}!`
        ) : false) : false
        let diferencia_tiempo_restante
        try {
            diferencia_tiempo_restante = 60 - parseInt(m)
        } catch (e) {
            diferencia_tiempo_restante = m
        }
        if (medio == 'PM')
            h == '11' ? ((m == '30' || m == '45' || m == '50') && s == '00' ? ver_ofrenda_fecha(null, "", client, id_canal, `Apresurate, en ${diferencia_tiempo_restante.toString()} minutos se cambia la ofrenda!`) : false) : false
        else
            h == '23' ? ((m == '30' || m == '45' || m == '50') && s == '00' ? ver_ofrenda_fecha(null, "", client, id_canal, `Apresurate, en ${diferencia_tiempo_restante.toString()} minutos se cambia la ofrenda!`) : false) : false
    }, intervalo_ms)
    return aviso
}

function manejo_canales(client, nombre_canal = '', id_canal = '') {
    let canal_dofus =   client.channels.cache.find(channel => channel.name === 'dofus' && channel.type == 'text'),
        buscar_canal =  client.channels.cache.find(channel => channel.name === nombre_canal && channel.type == 'text'),
        canal_general = client.channels.cache.find(channel => channel.name === 'general' && channel.type == 'text'),
        canal_id =      client.channels.cache.find(channel => channel.id.toString() === id_canal && channel.type == 'text')
    if (canal_id != undefined)
        return aviso_con_intervalo(1000, client, id_canal)
    if (buscar_canal !== undefined)
        return aviso_con_intervalo(1000, client, buscar_canal.id.toString())// id channel : <especificar> ej. 809169718379282513
    if (canal_dofus !== undefined)
        return aviso_con_intervalo(1000, client, canal_dofus.id.toString())
    if (canal_general !== undefined)
        return aviso_con_intervalo(1000, client, canal_general.id.toString())
    for (let canal of client.channels.cache.array()) {
        if (canal.type == 'text') {
            client.channels.cache.get(canal.id).send(`El canal ${canal.name} será el encargado de recibir los mensajes en tiempo real!`)
            return aviso_con_intervalo(1000, client, canal.id)
        }
    }
}



module.exports = {crear_canal, manejo_canales}