// ============================================
// SECCIÓN DE ASYNC/AWAIT
// ============================================

// Descripción de Async/Await:
// Async/Await es una sintaxis introduced en ES2017 que hace que trabajar con Promises
// sea mucho más fácil y legible.
//
// keyword: async - Declara una función asíncrona que siempre retorna una Promise
// keyword: await - Pausa la ejecución de la función async hasta que la Promise se resuelva
//
// Ventajas sobre Promises tradicionales:
// 1. Código más lineal y similar al síncrono
// 2. Manejo de errores más simple con try/catch
// 3. Evita el anidamiento excesivo (callback hell)
// 4. Facilita la depuración (los breakpoints funcionan mejor)
//
// Sintaxis básica:
//
// async function nombreFuncion() {
//     try {
//         const resultado = await promesa; // Espera a que la promesa se resuelva
//         return resultado;
//     } catch (error) {
//         Manejo del error
//     }
// }

// Función que simula un delay usando una Promise
const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Función asíncrona que retorna el doble de un número después de 2 segundos
const obtenerDoble = async (numero) => {
    // Validar que se recibió un número válido
    if (isNaN(numero) || numero === '') {
        throw new Error('Debe proporcionar un número válido');
    }

    // Esperar 2 segundos (2000 ms) usando await
    await delay(2000);

    // Retornar el doble del número
    return numero * 2;
}

// Función que maneja el cálculo desde la interfaz
const calcularDoble = async () => {
    const numeroInput = document.getElementById('numeroAsync');
    const numero = parseFloat(numeroInput.value);
    const resultadoDiv = document.getElementById('resultadoAsync');

    // Validar que el campo no esté vacío
    if (numeroInput.value.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Campo vacío',
            text: 'Por favor, ingrese un número.',
            confirmButtonColor: '#9b59b6'
        });
        return;
    }

    // Validar que sea un número válido
    if (isNaN(numero)) {
        Swal.fire({
            icon: 'error',
            title: 'Número inválido',
            text: 'Por favor, ingrese un número válido.',
            confirmButtonColor: '#9b59b6'
        });
        return;
    }

    // Mostrar indicador de carga
    const btnCalcular = document.querySelector('.btn-calc');
    const originalText = btnCalcular.innerHTML;
    btnCalcular.innerHTML = '<span class="spinner-loading"></span> Calculando...';
    btnCalcular.disabled = true;

    // Mostrar mensaje de espera
    resultadoDiv.innerHTML = `
        <div class="alert alert-info fade-in">
            <i class="bi bi-clock-history"></i> 
            <strong>Procesando...</strong> Esperando 2 segundos para calcular el doble de <strong>${numero}</strong>
        </div>
    `;
    resultadoDiv.style.display = 'block';

    try {
        // Usar await para esperar el resultado de la función asíncrona
        const resultado = await obtenerDoble(numero);

        // Mostrar el resultado exitoso
        resultadoDiv.innerHTML = `
            <div class="alert alert-success fade-in">
                <i class="bi bi-check-circle"></i> 
                <strong>¡Éxito!</strong> El doble de <strong>${numero}</strong> es <strong>${resultado}</strong>
            </div>
        `;

        console.log(`✓ Async/Await resuelto: El doble de ${numero} es ${resultado}`);
    } catch (error) {
        // Manejar errores
        resultadoDiv.innerHTML = `
            <div class="alert alert-danger fade-in">
                <i class="bi bi-x-circle"></i> 
                <strong>Error:</strong> ${error.message}
            </div>
        `;

        console.log(`✗ Async/Await rechazado: ${error.message}`);
    } finally {
        // Restaurar el botón (siempre se ejecuta)
        btnCalcular.innerHTML = originalText;
        btnCalcular.disabled = false;
        console.log('→ Cálculo completado');
    }
}

// Función para limpiar el campo
const limpiarAsync = () => {
    document.getElementById('numeroAsync').value = '';
    const resultadoDiv = document.getElementById('resultadoAsync');
    resultadoDiv.style.display = 'none';
    resultadoDiv.innerHTML = '';
}

// Ejemplos de uso en consola (para demostración)
console.log('=== Ejemplos de uso de obtenerDoble() ===');
console.log('Puedes probar en la consola:');
console.log('obtenerDoble(5).then(r => console.log("Resultado:", r))');
console.log('await obtenerDoble(10) // Si estás en contexto async');
