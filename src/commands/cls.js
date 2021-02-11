module.exports = {
    nombre: 'cls',
    descripcion: 'Limpia los comentarios del canal escrito.',
    async execute(msg, args) {
        if (args.length < 1) return msg.reply('Ingresa la cantidad de mensajes a borrar!')
        try {parseInt(args[0])} catch (e) {return msg.reply('Ingresa sólo números!')}
        if (!(isFinite(args[0]))) return msg.reply('Ingresa sólo números enteros!')
        if (args[0] > 50 || args[0] < 1) return msg.reply('Cantidad mínima de 1 y máxima de 50!')

        await msg.channel.messages.fetch({limit: parseInt(args[0])}).then((mensaje) => {
            msg.channel.bulkDelete(mensaje)
        })
    }
}