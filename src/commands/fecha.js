const {ver_ofrenda_fecha} = require('../functions/mensaje.functions.js')



module.exports = {
    nombre: 'fecha',
    descripcion: 'Muestra la ofrenda de una fecha especifica solicitada por el usuario.',
    execute(msg, args, client, id_canal) {
        if (args.length < 3) return msg.reply('Formato yyy mm dd, introduzca de esta forma -> -fecha 2020 12 31')
        try {
            for (const num of args)
                if (!(typeof parseInt(num) === 'number' && isFinite(parseInt(num))))
                    return msg.reply('Fecha errónea, introduzca de esta forma -> -fecha 2020 12 31')
        } catch (error) {
            return msg.reply('Sólo números, introduzca de esta forma -> -fecha 2020 12 31')
        }
        if (args[0].length == 4 && args[1].length == 2 && args[2].length == 2) {
            let fecha_real = new Date(parseInt(args[0]), (parseInt(args[1]) - 1), parseInt(args[2]))
            ver_ofrenda_fecha(msg, '/'+fecha_real.toLocaleDateString("es-CL", {year: 'numeric', month: '2-digit', day: '2-digit'}), client, id_canal)        
        } else {
            return msg.reply('Formato yyy mm dd, introduzca de esta forma -> -fecha 2020 12 31')
        }
    }
}