// ===== VARIABLES GLOBALES =====
var xpTotal = 0;

var botonMostrar = document.getElementById("mostrarFormulario");
var formulario = document.getElementById("formularioSeccion");
var form = document.getElementById("formMision");
var contenedorPendientes = document.getElementById("pendientes");
var contenedorLogros = document.getElementById("logros");
var xpSpan = document.getElementById("xp");
var rangoSpan = document.getElementById("rango");


// ===== MOSTRAR / OCULTAR FORMULARIO =====
botonMostrar.addEventListener("click", function() {

    if (formulario.style.display === "block") {
        formulario.style.display = "none";
    } else {
        formulario.style.display = "block";
    }

});


// ===== CREAR MISIÓN =====
form.addEventListener("submit", function(event) {

    event.preventDefault();

    var nombre = document.getElementById("nombre").value;
    var descripcion = document.getElementById("descripcion").value;
    var dificultad = document.getElementById("dificultad").value;

    var mision = {
        nombre: nombre,
        descripcion: descripcion,
        dificultad: dificultad,
        estado: "PENDIENTE"
    };

    console.log(mision); // log al crear misión

    var boton = document.createElement("button");
    boton.textContent = nombre;

    // Color según dificultad
    if (dificultad == "10") {
        boton.classList.add("facil");
    }
    if (dificultad == "25") {
        boton.classList.add("normal");
    }
    if (dificultad == "50") {
        boton.classList.add("dificil");
    }

    // ===== EVENTO COMPLETAR MISIÓN =====
    boton.addEventListener("click", function() {

        var confirmar = confirm("¿Has finalizado esta tarea?");

        if (confirmar) {

            mision.estado = "SUCCESSFUL";
            console.log(mision); // log al completar

            // Sumar XP
            xpTotal = xpTotal + parseInt(dificultad);
            xpSpan.textContent = xpTotal;

            // Actualizar rango
            actualizarRango();

            // Mover a logros
            moverALogros(mision);

            // Eliminar botón de pendientes
            boton.remove();
        }

    });

    contenedorPendientes.appendChild(boton);

    form.reset();
});


// ===== ACTUALIZAR RANGO =====
function actualizarRango() {

    if (xpTotal < 60) {
        rangoSpan.textContent = "Guerrero";
    } 
    else if (xpTotal < 150) {
        rangoSpan.textContent = "Genio";
    } 
    else {
        rangoSpan.textContent = "Ídolo";
    }

}


// ===== MOVER A LOGROS =====
function moverALogros(mision) {

    var logro = document.createElement("div");
    logro.textContent = mision.nombre + " - " + mision.dificultad + " XP";

    // Botón eliminar pequeño
    var botonEliminar = document.createElement("button");
    botonEliminar.textContent = "X";
    botonEliminar.style.marginLeft = "10px";
    botonEliminar.style.backgroundColor = "red";
    botonEliminar.style.color = "white";
    botonEliminar.style.border = "none";
    botonEliminar.style.cursor = "pointer";

    botonEliminar.addEventListener("click", function() {
        logro.remove();
    });

    logro.appendChild(botonEliminar);

    contenedorLogros.appendChild(logro);
}