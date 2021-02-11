module.exports = {
    nombre: 'cambiar_canal',
    descripcion: 'Deja un canal por defecto para las solicitudes con respecto el ID del canal.',
    execute(msg, args, client) {
        if (args.length < 1) {
            msg.reply('Error al ingresar el canal, se dejará por defecto cualquiera!')
            return ''
        }
        try {
            client.channels.cache.get(args[0]).send('Probando canal establecido como principal.')
            return args[0]
        } catch (error) {
            msg.reply('Canal no encontrado, se dejará por defecto cualquiera!')
            return ''
        }
    }
}