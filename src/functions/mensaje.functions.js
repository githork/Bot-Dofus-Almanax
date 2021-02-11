const {MessageEmbed} = require('discord.js')

const {hora_actual} = require('../functions/tiempo.functions.js')
const {ofrenda} = require('../functions/ofrenda.functions.js')



function mensaje_dofus(hora_francia, info_ofrenda, client) {
    const embed = new MessageEmbed()
        .setColor('#228b22')
        .setTitle(info_ofrenda[0])
        .addFields(
        {name: info_ofrenda[1], value: info_ofrenda[2], inline: true},
        {name: info_ofrenda[3], value: info_ofrenda[4].substring(info_ofrenda[4].search(/[0-9]+/g), info_ofrenda[4].search("y llevárselo a Ontoral Z")), inline: true}
    )
        .setAuthor(client.user.username, 'http://images1.wikia.nocookie.net/__cb20101219092830/dofus/es/images/archive/a/ab/20101219092939%21Dofus_Esmeralda.png')
        .setThumbnail(info_ofrenda[5])
        .setFooter('Hora en francia: ' + hora_francia.fecha + " " + hora_francia.hora, 'https://gremioloscalaverashuesudas.webnode.es/_files/200000051-e4020e4fcd/Crimson_Dofus.png')
    return embed
}



function mensaje_dofus_multiple(cantidad, client) {
    var lista_dofus = [], lista_touch = []
    var dia_francia = hora_actual()[1].fecha.split()
    var time = new Date(parseInt(dia_francia[0]), parseInt(dia_francia[1]), parseInt(dia_francia[2]))
    setTimeout(() => {
        for (let i = 0; i < cantidad; i++) {
        var datos
        time.setDate(i+time.getDate())
        ofrenda("/"+time.toLocaleDateString("es-CL", {year: 'numeric', month: '2-digit', day: '2-digit'}).toString()).then(resp => {datos = resp})
        setTimeout(() => {
            lista_dofus.push(datos[0])
            lista_touch.push(datos[1])
        }, 3000)
    }
    }, cantidad * 3000 + 2000)
    const embed_dofus = new MessageEmbed(), embed_touch = new MessageEmbed()
    embed_dofus
        .setColor('#228b22')
        .setTitle('Ofrendas de Dofus desde hoy a ' + cantidad + ' días más')
        .setAuthor(client.user.username, 'http://images1.wikia.nocookie.net/__cb20101219092830/dofus/es/images/archive/a/ab/20101219092939%21Dofus_Esmeralda.png')
    embed_touch
        .setColor('#228b22')
        .setTitle('Ofrendas de Dofus Touch desde hoy a ' + cantidad + ' días más')
        .setAuthor(client.user.username, 'http://images1.wikia.nocookie.net/__cb20101219092830/dofus/es/images/archive/a/ab/20101219092939%21Dofus_Esmeralda.png')
    for (let i = 0; i < cantidad; i++) {
        embed_dofus.addFields(
            {name: lista_dofus[i][1], value: lista_dofus[i][2], inline: true},
            {name: lista_dofus[i][3], value: lista_dofus[i][4].substring(lista_dofus[i][4].search(/[0-9]+/g), lista_dofus[i][4].search("y llevárselo a Ontoral Z")), inline: true}
        )
        embed_touch.addFields(
            {name: lista_touch[i][1], value: lista_touch[i][2], inline: true},
            {name: lista_touch[i][3], value: lista_touch[i][4].substring(lista_touch[i][4].search(/[0-9]+/g), lista_touch[i][4].search("y llevárselo a Ontoral Z")), inline: true}
        )
    }
    return [embed_dofus, embed_touch]
}



function ver_ofrenda_fecha (msg, fecha, client, id_canal) {
    var datos
    ofrenda(fecha).then(resp => {datos = resp})
    setTimeout(() => {
        if (id_canal.length > 0) {
            client.channels.cache.get(id_canal).send(mensaje_dofus(hora_actual()[1], datos[0], client))
            client.channels.cache.get(id_canal).send(mensaje_dofus(hora_actual()[1], datos[1], client))
        } else {
            msg.channel.send(mensaje_dofus(hora_actual()[1], datos[0], client))
            msg.channel.send(mensaje_dofus(hora_actual()[1], datos[1], client))
        }
    }, 3000)
}



function mensaje_tiempo (client) {
    const embed = new MessageEmbed()
        .setColor('#228b22')
        .setTitle('Horas actuales')
        .addFields(
            {name: 'Hora en tu país', value: hora_actual()[0].fecha + " " + hora_actual()[0].hora, inline: true},
            {name: 'Hora en francia', value: hora_actual()[1].fecha + " " + hora_actual()[1].hora, inline: true}
        )
        .setAuthor(client.user.username, 'http://images1.wikia.nocookie.net/__cb20101219092830/dofus/es/images/archive/a/ab/20101219092939%21Dofus_Esmeralda.png')
        .setThumbnail('http://images1.wikia.nocookie.net/__cb20101219092830/dofus/es/images/archive/a/ab/20101219092939%21Dofus_Esmeralda.png')
        .setThumbnail('https://static.wikia.nocookie.net/dofus/images/b/b3/Dofawa.png/revision/latest?cb=20101212135755&path-prefix=es')
    return embed
}



module.exports = {ver_ofrenda_fecha, mensaje_tiempo}