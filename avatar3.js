let ataqueJugador, ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

function iniciarJuego() {
    const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    const sectionReiniciar = document.getElementById('reiniciar');
    const botonPersonajeJugador = document.getElementById('boton-personaje');
    const botonPunio = document.getElementById('boton-punio');
    const botonPatada = document.getElementById('boton-patada');
    const botonBarrida = document.getElementById('boton-barrida');
    const botonReiniciar = document.getElementById('boton-reiniciar');
    const botonReglas = document.getElementById('boton-reglas');
    const botonJugar = document.getElementById('boton-jugar');
    
    sectionSeleccionarAtaque.style.display = 'none';
    sectionReiniciar.style.display = 'none';
    document.getElementById("reglas-del-juego").style.display = 'none';
    botonJugar.style.display = 'none';

    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador);
    botonPunio.addEventListener('click', () => seleccionarAtaque('Punio'));
    botonPatada.addEventListener('click', () => seleccionarAtaque('Patada'));
    botonBarrida.addEventListener('click', () => seleccionarAtaque('Barrida'));
    botonReiniciar.addEventListener('click', reiniciarJuego);
    botonReglas.addEventListener('click', mostrarReglas);
}

function mostrarReglas() {
    document.getElementById("reglas-del-juego").style.display = "block";
    const botonReglas = document.getElementById('boton-reglas');
    const botonJugar = document.getElementById('boton-jugar');

    botonReglas.style.display = 'none';
    botonJugar.style.display = 'block';
    botonJugar.addEventListener('click', seleccionarPersonajeJugador);
    document.getElementById('seleccionar-personaje').style.display = 'none';
}

function seleccionarPersonajeJugador() {
    const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    const sectionSeleccionarPersonaje = document.getElementById('seleccionar-personaje');
    const spanPersonajeJugador = document.getElementById('personaje-jugador');
    
    const personajeSeleccionado = ['zuko', 'katara', 'aang', 'toph'].find(id => document.getElementById(id).checked);

    if (personajeSeleccionado) {
        spanPersonajeJugador.innerHTML = personajeSeleccionado.charAt(0).toUpperCase() + personajeSeleccionado.slice(1);
        sectionSeleccionarAtaque.style.display = 'block';
        sectionSeleccionarPersonaje.style.display = 'none';
        seleccionarPersonajeEnemigo();
    } else {
        mostrarMensajeError(sectionSeleccionarPersonaje, 'Selecciona un personaje');
    }
}

function seleccionarPersonajeEnemigo() {
    const personajes = ['Zuko', 'Katara', 'Aang', 'Toph'];
    const personajeAleatorio = personajes[aleatorio(0, personajes.length - 1)];
    document.getElementById('personaje-enemigo').innerHTML = personajeAleatorio;
}

function seleccionarAtaque(ataque) {
    ataqueJugador = ataque;
    ataqueEnemigo = ['Punio', 'Patada', 'Barrida'][aleatorio(0, 2)];
    combate();
}

function combate() {
    const spanVidasJugador = document.getElementById('vidas-jugador');
    const spanVidasEnemigo = document.getElementById('vidas-enemigo');

    if (ataqueJugador === ataqueEnemigo) {
        crearMensaje("EMPATE");
    } else if (
        (ataqueJugador === 'Punio' && ataqueEnemigo === 'Barrida') ||
        (ataqueJugador === 'Patada' && ataqueEnemigo === 'Punio') ||
        (ataqueJugador === 'Barrida' && ataqueEnemigo === 'Patada')
    ) {
        crearMensaje("GANASTE");
        spanVidasEnemigo.innerHTML = --vidasEnemigo;
    } else {
        crearMensaje("PERDISTE");
        spanVidasJugador.innerHTML = --vidasJugador;
    }

    revisarVidas();
}

function revisarVidas() {
    if (vidasEnemigo === 0) {
        crearMensajeFinal("FELICITACIONES!!! HAS GANADO");
    } else if (vidasJugador === 0) {
        crearMensajeFinal("QUE PENA, HAS PERDIDO");
    }
}

function crearMensajeFinal(resultado) {
    document.getElementById('reiniciar').style.display = "flex";
    crearMensaje(resultado);
    ['boton-punio', 'boton-patada', 'boton-barrida'].forEach(id => document.getElementById(id).disabled = true);
}

function crearMensaje(resultado) {
    const sectionMensaje = document.getElementById('mensajes');
    const parrafo = document.createElement('p');

    parrafo.innerHTML = `Tu personaje atacó con ${ataqueJugador}, el enemigo defendió con ${ataqueEnemigo} → ${resultado}`;
    sectionMensaje.insertBefore(parrafo, sectionMensaje.firstChild);
}

function reiniciarJuego() {
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function mostrarMensajeError(container, mensaje) {
    const mensajeError = document.createElement("p");
    mensajeError.innerHTML = mensaje;
    mensajeError.style.color = "red";
    container.appendChild(mensajeError);
    setTimeout(() => container.removeChild(mensajeError), 2000);
    reiniciarJuego();
}

window.addEventListener('load', iniciarJuego);

