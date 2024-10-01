let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

const personajes = ['Zuko', 'Katara', 'Aang', 'Toph'];

function iniciarJuego() {
    document.getElementById('seleccionar-ataque').style.display = 'none';
    document.getElementById('reiniciar').style.display = "none";
    document.getElementById("reglas-del-juego").style.display = "none";
    document.getElementById('boton-jugar').style.display = 'none';
    document.getElementById('seleccionar-personaje').style.display = 'block';

    document.getElementById('boton-personaje').addEventListener('click', seleccionarPersonajeJugador);
    document.getElementById('boton-reglas').addEventListener('click', mostrarReglas);
    document.getElementById('boton-reiniciar').addEventListener('click', reiniciarJuego);

    //Se crea un bucle forEach para evitar la repeticion asignando el evento de clicl de forma dinamica
    ['punio', 'patada', 'barrida'].forEach(tipo => {
        document.getElementById(`boton-${tipo}`).addEventListener('click', () => ejecutarAtaque(tipo));
    });
}

function mostrarReglas() {
    document.getElementById("reglas-del-juego").style.display = "block";
    document.getElementById('boton-jugar').style.display = 'block';
    document.getElementById('boton-reglas').style.display = 'none';
    document.getElementById('seleccionar-personaje').style.display = 'none';
    document.getElementById('boton-jugar').addEventListener('click', seleccionarPersonajeJugador);
}

function seleccionarPersonajeJugador() {
    document.getElementById('seleccionar-ataque').style.display = 'block';
    document.getElementById('seleccionar-personaje').style.display = 'none';

    const personajeSeleccionado = personajes.find(personaje => document.getElementById(personaje.toLowerCase()).checked);
    let spanPersonajeJugador = document.getElementById('personaje-jugador');

    if (personajeSeleccionado) {
        spanPersonajeJugador.innerHTML = personajeSeleccionado;
        seleccionarPersonajeEnemigo();
    } else {
        mostrarMensajeTemporal('Selecciona un personaje', 'seleccionar-personaje');
    }
}

//Se creo un array personaje con todos los noombres y se selecciona aleatoriamente
function seleccionarPersonajeEnemigo() {
    let spanPersonajeEnemigo = document.getElementById('personaje-enemigo');
    let personajeAleatorio = personajes[aleatorio(0, personajes.length - 1)];
    spanPersonajeEnemigo.innerHTML = personajeAleatorio;
}

//Creamos una funcion llamada ejecutarAtaque(tipoAtaque) que va a recibir el tipo de ataque(puño, patada o barrida) y se lo asigna al jugador
function ejecutarAtaque(tipoAtaque) {
    ataqueJugador = tipoAtaque.charAt(0).toUpperCase() + tipoAtaque.slice(1);
    ataqueAleatorioEnemigo();
}
//Ataque enemigo con array aleatorio

function ataqueAleatorioEnemigo() {
    const ataques = ['Punio', 'Patada', 'Barrida'];
    ataqueEnemigo = ataques[aleatorio(0, ataques.length - 1)];
    combate();
}

//El bloque else if combina las tres condiciones de ganar en una solo condicional
function combate() {
    let spanVidasJugador = document.getElementById('vidas-jugador');
    let spanVidasEnemigo = document.getElementById('vidas-enemigo');

    if (ataqueEnemigo === ataqueJugador) {
        crearMensaje("EMPATE");
    } else if (
        (ataqueJugador === 'Punio' && ataqueEnemigo === 'Barrida') ||
        (ataqueJugador === 'Patada' && ataqueEnemigo === 'Punio') ||
        (ataqueJugador === 'Barrida' && ataqueEnemigo === 'Patada')
    ) {
        crearMensaje("GANASTE");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else {
        crearMensaje("PERDISTE");
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
    }
    revisarVidas();
}

function revisarVidas() {
    if (vidasEnemigo === 0) {
        crearMensajeFinal("FELICITACIONES!!! HAS GANADO ");
    } else if (vidasJugador === 0) {
        crearMensajeFinal("QUE PENA, HAS PERDIDO ");
    }
}


function crearMensajeFinal(resultado) {
    document.getElementById('reiniciar').style.display = "flex";
    crearMensaje(resultado);

    ['punio', 'patada', 'barrida'].forEach(tipo => {
        document.getElementById(`boton-${tipo}`).disabled = true;
    });
}

function crearMensaje(resultado) {
    let sectionMensaje = document.getElementById('mensajes');
    let parrafo = document.createElement('p');
    parrafo.innerHTML = `Tu personaje atacó con ${ataqueJugador}, el enemigo defendió con ${ataqueEnemigo} → ${resultado}`;
    sectionMensaje.insertBefore(parrafo, sectionMensaje.firstChild);
}

function reiniciarJuego() {
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function mostrarMensajeTemporal(mensaje, seccionId) {
    let seccion = document.getElementById(seccionId);
    let mensajeError = document.createElement("p");
    mensajeError.innerHTML = mensaje;
    mensajeError.style.color = "red";
    seccion.appendChild(mensajeError);

    setTimeout(() => seccion.removeChild(mensajeError), 2000);
}

window.addEventListener('load', iniciarJuego);
