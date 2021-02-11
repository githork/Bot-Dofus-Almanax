const http = require('http')
const DOMParser = require('xmldom').DOMParser
const { JSDOM } = require( "jsdom" )
const { window } = new JSDOM( "" )
const $ = require( "jquery" )( window )



function obtener_ofrenda (fecha) {
    return new Promise( function (resolve, reject) {
        // fecha tipo 2021-02-10, ejemplo -> /2021-02-10
        var options = {
            host: 'www.krosmoz.com',
            method: 'GET',
            path: '/es/almanax'+fecha // parametros : dofustouch, wakfu, dofus y all
        }
        callback = function(response) {
            var str = ''
            response.on('data', function (chunk) {
                str += chunk
            })
            response.on('end', function () {
                var informacion_ofrenda = []
                const parseDocument = new DOMParser().parseFromString(str, 'text/html')
                const ofrendas = parseDocument.getElementsByClassName("achievement dofus") // 0 dofus; 1 touch
                for (let i = 0; i < 2; i++) {
                    let lista = []
                    for (let j = 0; j < ofrendas[i].childNodes.length; j++) {
                        if (ofrendas[i].childNodes[j].textContent.replace(/\s+/g, '').length > 0) {
                            let dato = ofrendas[i].childNodes[j].textContent.replace(/\s{2,}/g, '\n')
                            let info = dato.split('\n')
                            for (let d = 0; d < info.length; d++)
                                if (info[d].length > 0)
                                    lista.push(info[d])
                        }
                    }
                    lista.push($(ofrendas[i]).find('img').attr("src"))
                    informacion_ofrenda.push(lista)
                }
                // console.log(informacion_ofrenda)
                resolve(informacion_ofrenda)
            })
            
        }
        http.request(options, callback).end()
    })
}



async function ofrenda (fecha) {
    return await obtener_ofrenda(fecha)
}



module.exports = {ofrenda}