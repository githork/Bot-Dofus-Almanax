/**
 *  * Permite obtener la hora y fecha actual del país del usuario que lo solicita y la ciudad de Paris.
 *  @return  {Array} Arreglo de tamaño 2, que contiene JSON con valores tipo String, llamados hora y fecha.
 *  @version 1.0
 *  @author Javalel
*/
function hora_actual () {
    let d = new Date()
    let fecha = d.toLocaleDateString("es-CL", {
        year: 'numeric', month: '2-digit', day: '2-digit'}), 
        hora = d.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'})
    // Hora actual de tu país
    let hora_actual_pais = {fecha: fecha.toString(), hora: hora.toString()}
    // console.log(hora_actual)

    // Hora actual en Francia, Paris
    fecha = d.toLocaleDateString("es-CL", {
        year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Europe/Paris'
    })
    hora = d.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Europe/Paris'})
    let hora_francia = {fecha: fecha.toString(), hora: hora.toString()}
    let lista = [hora_actual_pais, hora_francia]
    return lista
}



module.exports = {hora_actual}