// -> varibles
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = timer;
let tiempoRegresivoId = null;
let number = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

let mostrarTiempo = document.getElementById("tiempo-restante");
let mostrasMovimientos = document.getElementById("movimientos");
let mostarAciertos = document.getElementById("aciertos");
const btnReload = document.querySelector('.reload-icon')
const tableId = document.querySelector('#table')

// -> Listeners
btnReload.addEventListener("click", reloadGame)

// -> Functions
function reloadGame() {
  location.reload()
}

//. number generator
number = number.sort(() => {
  return Math.random() - 0.5;
});

function contarTiempo() {
  tiempoRegresivoId = setInterval(() => {
    timer--;
    mostrarTiempo.innerHTML = `Time: ${timer} seg`;
    if (timer == 0) {
      clearInterval(tiempoRegresivoId);
      tableId.classList.add('table-opacity')
      btnReload.classList.remove('inactive')
      bloquearTarjetas();
    }
  }, 1000);
}
function bloquearTarjetas() {
  for (let i = 0; i <= 15; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = number[i];
    tarjetaBloqueada.disabled = true;
  }
}

function destapar(id) {
  if (temporizador == false) {
    contarTiempo();
    temporizador = true;
  }

  tarjetasDestapadas = tarjetasDestapadas + 1;

  if (tarjetasDestapadas == 1) {
    //mostrar primer numero
    tarjeta1 = document.getElementById(id);
    primerResultado = number[id];
    tarjeta1.innerHTML = number[id];
    //Deshabilitar primer boton
    tarjeta1.disabled = true;
  } else if (tarjetasDestapadas == 2) {
    //mostrar segundo numero
    tarjeta2 = document.getElementById(id);
    segundoResultado = number[id];
    tarjeta2.innerHTML = segundoResultado;
    tarjeta2.disabled = true;
    // Incrementar movimientos
    movimientos++;
    mostrasMovimientos.innerHTML = `Movements: ${movimientos} `;

    if (primerResultado == segundoResultado) {
      // Encerrar contador tarjetas destapadas
      tarjetasDestapadas = 0;

      // Aumentar aciertos
      aciertos++;
      mostarAciertos.innerHTML = ` Hits: ${aciertos}  `;

      if (aciertos == 8) {
        clearInterval(tiempoRegresivoId);
        btnReload.classList.remove('inactive')
        tableId.classList.add('table-opacity')

        mostarAciertos.innerHTML = ` Hits: ${aciertos} `;
        mostrarTiempo.innerHTML = `You did it in ${timerInicial - timer} seg`;
        mostrasMovimientos.innerHTML = `Movements: ${movimientos} `;
      }
    } else {
      setTimeout(() => {
        tarjeta1.innerHTML = " ";
        tarjeta2.innerHTML = " ";
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
      }, 500);
    }
  }
}
