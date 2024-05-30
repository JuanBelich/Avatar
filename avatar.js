let botonPersonaje = document.getElementById('boton-personaje');
botonPersonaje.addEventListener('click', seleccionarPersonaje);

function seleccionarPersonaje() {
  let personajeSeleccionado = document.querySelector('input[name="personaje"]:checked');
  if (personajeSeleccionado) {
    let nombrePersonaje = personajeSeleccionado.id;
    alert('Seleccionaste al personaje: ' + nombrePersonaje);
    document.getElementById("personaje-jugador").innerHTML=nombrePersonaje
  } else {
    alert('Por favor, selecciona un personaje antes de continuar.');
  }
}

function personajePC(){
  let random = Math.floor(Math.random() * (0,4));
  switch (random) {
      case 0:
        document.getElementById("personaje-enemigo").innerHTML="Aang"
      break;

      case 1:
        document.getElementById("personaje-enemigo").innerHTML="Zuko"
      break;

      case 2:
        document.getElementById("personaje-enemigo").innerHTML="Katara"
      break;
      
      case 3:
        document.getElementById("personaje-enemigo").innerHTML="Toph"  
      break;
  }
}
