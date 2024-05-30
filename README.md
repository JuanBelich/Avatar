<h1 align="center">Avatar la leyenda de Aang</h1>
<img src="https://seriesdecine.com/wp-content/uploads/2023/03/seriesdecine__2023-03-07_19-34-17_983250-scaled.jpg" alt="">
<h2>Funciones y codigo Javascript</h2>
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

<p>
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
</p>
