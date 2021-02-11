const Discord = require('discord.js')
const client = new Discord.Client()
const message = new Discord.Message()
const fs = require('fs')

require('dotenv').config()

const {aviso_con_intervalo} = require('./src/functions/otros.functions.js')

const prefijo = '-'
var id_canal_principal = ''


client.commands = new Discord.Collection()

const comandos = fs.readdirSync('./src/commands/').filter(archivo => archivo.endsWith('.js'))
for (const archivo of comandos) {
    const comando = require('./src/commands/' + archivo)
    client.commands.set(comando.nombre, comando)
}



client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    // Avisos
    aviso_con_intervalo(1000, client, client.channels.cache.find(channel => channel.name === 'general').id.toString()) // id channel : <especificar> ej. 809169718379282513

})



client.on('message', msg => {
    if (!msg.content.startsWith(prefijo) || msg.author.bot)
        return
    const args = msg.content.slice(prefijo.length).split(/ +/)
    const comando = args.shift().toLowerCase()

    if (comando === 'uginak')
        client.commands.get('uginak').execute(msg)
    if (comando === 'hoy')
        client.commands.get('hoy').execute(msg, client, id_canal_principal)
    if (comando === 'mañana')
        client.commands.get('mañana').execute(msg, client, id_canal_principal)
    if (comando === 'fecha')
        client.commands.get('fecha').execute(msg, args, client, id_canal_principal)
    if (comando === 'tiempo')
        client.commands.get('tiempo').execute(msg, client)
    if (comando === 'cls')
        client.commands.get('cls').execute(msg, args)
    if (comando === 'id')
        client.commands.get('id').execute(msg)
    if (comando === 'cambiar_canal')
        id_canal_principal = client.commands.get('cambiar_canal').execute(msg, args, client)

})

client.login(process.env.TOKEN_DISCORD)