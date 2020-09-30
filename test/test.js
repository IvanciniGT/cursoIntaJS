var assert = require('assert');
var ahorcado = require('../bin/ahorcado.js');

//it('Deberia devolver 4 si sumo 2 y 2', () => assert.equal( 2+2 ,4 ) );
describe('Función de enmascarar',()=>{
    it('Deberia enmascarar Hola como "_ _ _ _" ', 
        () => assert.equal( '_ _ _ _' , ahorcado.enmascarar('Hola') ) );
    it('Deberia enmascarar Hola como "_ o _ a", si tengo las letras: a,o,m ', 
        () => assert.equal( '_ o _ a' , ahorcado.enmascarar('Hola',['a','o','m']) ) );
});

describe('Función de inicialización',()=>{
    it('Una partida deberia iniciarse sin fallos', 
        ()=> assert.equal(ahorcado.iniciarPartida().fallos , 0));
    it('Una partida deberia iniciarse con una palabra', 
        ()=> assert.ok(ahorcado.iniciarPartida().palabra.length > 0));
    it('Una partida deberia iniciarse con una lista vacia de letras', 
        ()=> assert.equal(ahorcado.iniciarPartida().letras.length , 0));
    it('Una partida deberia iniciarse en estado JUGANDO', 
        ()=> assert.equal(ahorcado.iniciarPartida().estado,ahorcado.ESTADO.JUGANDO ));
    it('Una partida deberia iniciarse con la palabra totalmente enmascarada', 
        ()=> {
            partida=ahorcado.iniciarPartida();
            palabra=partida.palabra;
            mascara=partida.mascara;
            assert.equal(ahorcado.enmascarar(palabra),mascara);
        });
});

describe('Función de nuevaLetra',()=>{
    describe('Nueva letra ok',()=>{
        partida=ahorcado.iniciarPartida();
        letra=partida.palabra.charAt(0);
        ahorcado.nuevaLetra(partida,letra);

        it('No incrementa fallos', 
            (partida) =>  assert.equal(partida.fallos,0));
        it('Mascara contiene la letra', 
            (partida) =>  assert.ok(partida.mascara.includes(letra)));
        it('En la lista de letras aparece la nueva letra', 
            (partida) =>  assert.ok(partida.letras.includes(letra)));
    });
    describe('Nueva letra Nok',()=>{
       // AQUI FALTAN LAS PRUEBAS
    });
});

describe('Palabra aleatoria',()=>{
    it('Me da palabras aleatorias dentro de la lista',
        () =>{
            total=20;
            listaFiltrada=[...new Array(total).keys()]
                .map( test => ahorcado.palabraAleatoria(ahorcado.listaPalabras()))
                .filter( palabra => ahorcado.listaPalabras().includes(palabra));
                assert.equal(total,listaFiltrada.length);
                assert.ok([...new Set(listaFiltrada)].length>1);
        }
    );
 });
