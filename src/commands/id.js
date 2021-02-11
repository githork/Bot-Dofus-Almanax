module.exports = {
    nombre: 'id',
    descripcion: 'Obtiene el id del canal escrito.',
    execute(msg) {
        msg.reply(`Querido amigo, la id de éste canal es: ${msg.channel.id}`)
    }
}