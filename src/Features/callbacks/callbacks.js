// Descripción de Callbacks:
// Los callbacks son funciones que se pasan como argumentos a otras funciones y se ejecutan después de que la función principal termine.
// En este caso, se utilizan para manejar el resultado de la búsqueda de manera asíncrona, permitiendo que una función llame a otra cuando se complete una tarea.
// Esto permite un flujo de control no bloqueante y modular.

// Función para normalizar texto: quita tildes y convierte a minúsculas para búsquedas insensibles
const normalizarTexto = (texto) => {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

// Cargar bases de datos desde localStorage o usar valores por defecto
let baseDatos1 = JSON.parse(localStorage.getItem('baseDatos1')) || ['Canadá', 'EUA', 'México', 'Ecuador', 'Brasil', 'Argentina', 'Uruguay'];
let baseDatos2 = JSON.parse(localStorage.getItem('baseDatos2')) || ['Japón', 'Irán', 'Corea del Sur', 'Alemania', 'Croacia', 'España', 'Inglaterra'];

// Función que guarda las bases de datos de países en localStorage
const guardarBasesDatos = () => {
    localStorage.setItem('baseDatos1', JSON.stringify(baseDatos1));
    localStorage.setItem('baseDatos2', JSON.stringify(baseDatos2));
}

// Función que muestra la lista de países de la Base 1 en un modal
const mostrarPaisesBase1 = () => {
    if (baseDatos1.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Base 1 vacía',
            text: 'No hay países en la Base de Datos 1.',
            confirmButtonColor: '#3498db'
        });
        return;
    }

    let html = '<div style="text-align: left;"><ul>';
    baseDatos1.forEach(pais => {
        html += `<li>${pais}</li>`;
    });
    html += '</ul></div>';

    Swal.fire({
        title: 'Países en Base 1 (América)',
        html: html,
        confirmButtonColor: '#3498db',
        width: '400px'
    });
}

// Función que muestra la lista de países de la Base 2 en un modal
const mostrarPaisesBase2 = () => {
    if (baseDatos2.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Base 2 vacía',
            text: 'No hay países en la Base de Datos 2.',
            confirmButtonColor: '#3498db'
        });
        return;
    }

    let html = '<div style="text-align: left;"><ul>';
    baseDatos2.forEach(pais => {
        html += `<li>${pais}</li>`;
    });
    html += '</ul></div>';

    Swal.fire({
        title: 'Países en Base 2 (Otros)',
        html: html,
        confirmButtonColor: '#3498db',
        width: '400px'
    });
}

// Función que muestra todas las listas de países organizadas por base en un modal
const mostrarTotalPaises = () => {
    const total = baseDatos1.length + baseDatos2.length;
    if (total === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Sin países',
            text: 'No hay países registrados en ninguna base de datos.',
            confirmButtonColor: '#3498db'
        });
        return;
    }

    let html = '<div style="text-align: left;">';
    html += '<h5>Base 1 (América):</h5><ul>';
    baseDatos1.forEach(pais => {
        html += `<li>${pais}</li>`;
    });
    html += '</ul><h5>Base 2 (Otros):</h5><ul>';
    baseDatos2.forEach(pais => {
        html += `<li>${pais}</li>`;
    });
    html += '</ul></div>';

    Swal.fire({
        title: 'Total de Países',
        html: html,
        confirmButtonColor: '#3498db',
        width: '500px'
    });
}

// Función que permite agregar un nuevo país a las bases de datos
const agregarPais = () => {
    const nombrePais = document.getElementById('nuevoPais').value.trim();
    const baseSeleccionada = document.getElementById('baseSeleccionada').value;

    if (nombrePais === '') {
        Swal.fire({
            icon: 'error',
            title: 'Campo vacío',
            text: 'Por favor, ingrese un nombre de país.',
            confirmButtonColor: '#3498db'
        });
        return;
    }

    // Verificar si ya existe (insensible a mayúsculas y tildes)
    const paisNormalizado = normalizarTexto(nombrePais);
    const existeEn1 = baseDatos1.some(p => normalizarTexto(p) === paisNormalizado);
    const existeEn2 = baseDatos2.some(p => normalizarTexto(p) === paisNormalizado);

    if (existeEn1 || existeEn2) {
        Swal.fire({
            icon: 'error',
            title: 'País ya existe',
            text: 'Este país ya está registrado en una de las bases de datos.',
            confirmButtonColor: '#3498db'
        });
        return;
    }

    // Agregar a la base seleccionada
    if (baseSeleccionada === '1') {
        baseDatos1.push(nombrePais);
    } else {
        baseDatos2.push(nombrePais);
    }

    // Guardar en localStorage
    guardarBasesDatos();

    // Limpiar campo
    document.getElementById('nuevoPais').value = '';

    Swal.fire({
        icon: 'success',
        title: '¡Agregado!',
        text: `El país "${nombrePais}" ha sido agregado a la base de datos ${baseSeleccionada}.`,
        timer: 2000,
        showConfirmButton: false
    });
}

// Función callback que muestra el resultado de la búsqueda en pantalla y consola
const encontrada = (mensaje) => {
    console.log(mensaje);
    // Mostrar en la página con animación
    const resultadoDiv = document.getElementById("resultadoBusqueda");
    resultadoDiv.innerText = mensaje;
    resultadoDiv.style.display = 'block';
    // Cambiar clase según el mensaje y agregar animación
    if (mensaje === 'Dato no encontrado') {
        resultadoDiv.className = 'mt-3 alert alert-danger fade-in';
    } else {
        resultadoDiv.className = 'mt-3 alert alert-success fade-in';
    }
}

// Función que maneja la búsqueda de países desde la interfaz
const buscarPais = () => {
    const pais = document.getElementById("paisBuscar").value.trim();
    if (pais === '') {
        Swal.fire({
            icon: 'error',
            title: 'Campo vacío',
            text: 'Por favor, ingrese un nombre de país.',
            confirmButtonColor: '#3498db'
        });
        return;
    }

    // Mostrar indicador de carga visual
    const btnBuscar = document.querySelector('.btn-search');
    const originalText = btnBuscar.innerHTML;
    btnBuscar.innerHTML = '<i class="bi bi-hourglass-split"></i> Buscando...';
    btnBuscar.disabled = true;

    // Simular búsqueda asíncrona con delay para mejor UX
    setTimeout(() => {
        busquedaBaseDatos1(pais);
        // Restaurar botón a estado original
        btnBuscar.innerHTML = originalText;
        btnBuscar.disabled = false;
    }, 500); // 500ms de "carga"
}

// Función que busca en la segunda base de datos y ejecuta callback con resultado
const busquedaBaseDatos2 = (pais, callback) => {
    const paisNormalizado = normalizarTexto(pais);
    const encontrado = baseDatos2.some(p => normalizarTexto(p) === paisNormalizado);
    if (encontrado) {
        callback('Pais encontrado');
    } else {
        callback('Dato no encontrado');
    }
}

// Función principal que inicia la búsqueda en la primera base, luego en la segunda si no encuentra
const busquedaBaseDatos1 = (pais) => {
    const paisNormalizado = normalizarTexto(pais);
    const encontrado = baseDatos1.some(p => normalizarTexto(p) === paisNormalizado);
    if (encontrado) {
        encontrada('pais encontrado');
    } else {
        busquedaBaseDatos2(pais, encontrada);
    }
}
