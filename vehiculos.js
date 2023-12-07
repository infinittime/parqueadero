function toggleNavbar() {
    var x = document.getElementById("navbar");
    if (x.className === "navbar") {
        x.className += " responsive";
    } else {
        x.className = "navbar";
    }
}
//visualizar el registro con boton"ingresar Nuevo"
function IngresarNuevo() {
    var div = document.getElementById("registro-vehiculo");
    if (div.style.display === "none") {
      div.style.display = "block"; // Mostrar el div
    } else {
      div.style.display = "none"; // Ocultar el div
    }
  }


//cerrar registro sin guardar
function cancelarRegistro() {
    var ventanaRegistro = document.getElementById("registro-vehiculo");
    ventanaRegistro.style.display = "none";
}

//agregar opciones de tipo al nuevo registro --> tipo
document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencias a las listas desplegables
    var listaOrigen = document.getElementById('listaOrigen');
    var listaDestino = document.getElementById('listaDestino');

    // Copiar opciones desde listaOrigen a listaDestino
    for (var i = 0; i < listaOrigen.options.length; i++) {
        var opcion = document.createElement('option');
        opcion.value = listaOrigen.options[i].value;
        opcion.text = listaOrigen.options[i].text;
        listaDestino.add(opcion);
    }
});

function mostrarRegistroVehiculo() {
    var ventanaRegistro = document.getElementById("registro-vehiculo");
    ventanaRegistro.style.display = "block";
}

function aplicarFiltros() {
    // Lógica para aplicar filtros y actualizar la lista
    function aplicarFiltros() {
        // Obtener los valores de los campos de filtro
        const fechaInicio = document.getElementById("fechaInicio").value;
        const fechaFin = document.getElementById("fechaFin").value;
    
        // Lógica de filtrado
        const registrosFiltrados = registros.filter(registro => {
            // Aplicar filtros según las fechas
            const entradaDentroRango = (!fechaInicio || registro.entrada >= fechaInicio) &&
                                       (!fechaFin || registro.entrada <= fechaFin);
    
            // Puedes agregar más lógica para otros filtros (tipo, descripción, placa, etc.)
    
            return entradaDentroRango;  // Devuelve true si el registro pasa los filtros
        });
    
        // Actualizar la lista con los registros filtrados
        llenarListaVehiculos(registrosFiltrados);
    }
    
}

// Función para llenar la lista de vehículos (puedes adaptarla según tus necesidades)
function llenarListaVehiculos(registros) {
    function llenarListaVehiculos(registros) {
        // Obtener el contenedor de la lista (un elemento div, ul, etc.)
        const listaContainer = document.getElementById("listaVehiculos");
    
        // Limpiar la lista actual para evitar duplicados
        listaContainer.innerHTML = "";
    
        // Verificar si hay registros para mostrar
        if (registros.length === 0) {
            const mensajeNoRegistros = document.createElement("p");
            mensajeNoRegistros.textContent = "No hay registros.";
            listaContainer.appendChild(mensajeNoRegistros);
            return;
        }
    
        // Iterar sobre cada registro y agregarlo a la lista
        registros.forEach(registro => {
            // Crear un elemento div para representar cada registro
            const registroDiv = document.createElement("div");
            registroDiv.classList.add("registro-vehiculo"); // Puedes agregar una clase para aplicar estilos
    
            // Crear elementos para cada propiedad del registro (tipo, descripción, placa, entrada)
            const tipoElement = document.createElement("p");
            tipoElement.textContent = `Tipo: ${registro.tipo}`;
    
            const descripcionElement = document.createElement("p");
            descripcionElement.textContent = `Descripción: ${registro.descripcion}`;
    
            const placaElement = document.createElement("p");
            placaElement.textContent = `Placa: ${registro.placa}`;
    
            const entradaElement = document.createElement("p");
            entradaElement.textContent = `Entrada: ${registro.entrada}`;
    
            // Agregar los elementos al registroDiv
            registroDiv.appendChild(tipoElement);
            registroDiv.appendChild(descripcionElement);
            registroDiv.appendChild(placaElement);
            registroDiv.appendChild(entradaElement);
    
            // Agregar el registroDiv al contenedor de la lista
            listaContainer.appendChild(registroDiv);
        });
    }
    listaVehiculos.innerHTML = tablaHTML;
}


function guardarRegistro() {
    // Obtener los valores de los campos
    const tipo = document.getElementById("tipoVehiculo").value;
    const descripcion = document.getElementById("descripcion").value;
    const placa = document.getElementById("placa").value;

    // Obtener la fecha y hora actual
    const fechaHoraActual = new Date();
    const entrada = fechaHoraActual.toLocaleString(); // Puedes ajustar el formato según tus necesidades

    // Validar que los campos no estén vacíos
    if (tipo && descripcion && placa) {
        // Crear un objeto con la información del nuevo registro
        const nuevoRegistro = {
            tipo: tipo,
            descripcion: descripcion,
            placa: placa,
            entrada: entrada
        };

        // Agregar el nuevo registro a la lista
        registros.push(nuevoRegistro);

        // Volver a llenar la lista con los registros actualizados
        llenarListaVehiculos(registros);

        // Limpiar los campos del formulario después de guardar
        document.getElementById("formularioRegistro").reset();

        // Opcional: Puedes agregar una alerta u otra retroalimentación al usuario
        alert("Registro guardado exitosamente.");
    } else {
        // Mostrar un mensaje si algún campo está vacío
        alert("Por favor, complete todos los campos antes de guardar.");
    }
}
