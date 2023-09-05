const inputSeg = document.querySelector("#seg");
const inputMin = document.querySelector("#min");
const inputHrs = document.querySelector("#hrs");
const spanTempo = document.querySelector("span");

const DEF_TIEMPO = 0;
const SIN_TIEMPO = 0;
const REINICIO_TIEMPO = 60;

const UN_SEGUNDO = 1000;
const VELOCIDAD_TIEMPO = UN_SEGUNDO;

let seg = DEF_TIEMPO;
let min = DEF_TIEMPO;
let hrs = DEF_TIEMPO;

/**
 * Inicia el temporizador
 */
function iniciar() {
    let idInterval = 0;
    seg = modificarTiempoDef( parseInt(inputSeg.value) );
    min = modificarTiempoDef( parseInt(inputMin.value) );
    hrs = modificarTiempoDef( parseInt(inputHrs.value) );
    
    mostrarTiempoConFormato(hrs, min, seg);
    spanTempo.style.color = "yellow";

    idInterval = setInterval(() => {
        restarTiempo();
        mostrarTiempoConFormato(hrs, min, seg);
        verificarFin(idInterval);
    }, VELOCIDAD_TIEMPO);
}

/**
 * Finaliza el temporizador si no hay mas tiempo
 * @param {Number} idInterval del temporizador  iniciado
 */
function verificarFin(idInterval) {
    if (seg === SIN_TIEMPO && min === SIN_TIEMPO && hrs === SIN_TIEMPO) {
        clearInterval(idInterval);
        spanTempo.style.color = "whitesmoke";
    }
}

/**
 * Resta el tiempo segun el estado actual
 */
function restarTiempo() {
    if (seg === SIN_TIEMPO && min === SIN_TIEMPO && hrs > SIN_TIEMPO) {
        hrs--;
        min = REINICIO_TIEMPO;
    }
    if (seg === SIN_TIEMPO && min > SIN_TIEMPO) {
        min--;
        seg = REINICIO_TIEMPO;
    }
    if (seg > SIN_TIEMPO) {
        seg--;
    }
}

/**
 * Muestra el tiempo actual en el formato correspondiente
 * @param {Number} hrs actuales
 * @param {Number} min actuales
 * @param {Number} seg actuales
 */
function mostrarTiempoConFormato(hrs, min, seg) {
    spanTempo.innerHTML = `${modificarValor(hrs)}:${modificarValor(min)}:${modificarValor(seg)}`;
}

/**
 * Devuelve 0 si el valor recibido es NaN
 * @param {Number} tiempoRevisar del usuario
 * @returns Devuelve 0 si el valor recibido es NaN, caso contrario devuelve el mismo valor
 */
function modificarTiempoDef(tiempoRevisar) {
    if (isNaN(tiempoRevisar)) {
        tiempoRevisar = SIN_TIEMPO;
    }
    return tiempoRevisar;
}

/**
 * Modifica el tiempo a su formato correspondiente
 * @param {Number} tiempo en unidad correspondiente
 * @returns el tiempo con formato correspondiente
 */
function modificarValor(tiempo) {
    return tiempo < 10 ? ("0" + tiempo) : tiempo;
}
