const ESTADO={
    'JUGANDO': 0,
    'PERDIDO': 1,
    'GANADO': 2   
}


function enmascarar(palabra, letrasSinEnmascarar=[] ){
    return [...palabra]     // Para cada letra
        .map(letra=>{       // Transformarla en
            if(letrasSinEnmascarar.includes(letra) ) // Si me pasan la letra
                return letra;   // Dejo La misma letra
            return '_';         // Un guion en caso contrario
        })    
        .join(' ');         // Junto las letras
    
//    return [...palabra].map(letra => letrasSinEnmascarar.includes(letra) ? letra : '_').join(' ');
}


function iniciarPartida(){
    palabra=palabraAleatoria(listaPalabras());
    return {
        'palabra': palabra,
        'mascara': enmascarar(palabra),
        'letras': [],
        'fallos': 0,
        'estado': ESTADO.JUGANDO
    }
}

function nuevaLetra(partida, letra){
    // Meter letra en la saca
    // partida.letras=[...partida.letras,letra];
    partida.letras.push(letra);
    // Mascara refrescarla
    partida.mascara=enmascarar(partida.palabra, partida.letras);
    // Incrementar fallos si los hay (Comprobar si la letra existe)
    if( ! partida.palabra.includes(letra))
        partida.fallos++;
    // Estado de la partida
    if(partida.fallos==6)
        partida.estado=ESTADO.PERDIDO;
    if( ! partida.mascara.includes('_'))
        partida.estado=ESTADO.GANADO;
}

function listaPalabras(){
    return['rojo','verde','azul','morado'];
}

function palabraAleatoria(lista){
    return lista[ parseInt(Math.random()*lista.length) ];
}

module.exports = {enmascarar, iniciarPartida, nuevaLetra,palabraAleatoria, listaPalabras, ESTADO};