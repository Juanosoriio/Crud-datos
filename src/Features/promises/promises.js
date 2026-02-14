// ============================================
// SECCIÓN DE PROMISES
// ============================================

// Descripción de Promises:
// Las Promises (Promesas) son objetos que representan la eventual finalización (o falla) de una operación asíncrona.
// Una Promise puede estar en uno de tres estados:
// 1. Pending (Pendiente): Estado inicial, ni cumplida ni rechazada
// 2. Fulfilled (Cumplida): La operación se completó exitosamente - se ejecuta resolve()
// 3. Rejected (Rechazada): La operación falló - se ejecuta reject()
//
// Ventajas de las Promises sobre los Callbacks:
// - Evitan el "callback hell" (anidamiento excesivo de callbacks)
// - Permiten encadenar operaciones asíncronas de forma más legible con .then()
// - Facilitan el manejo de errores con .catch()
// - Permiten ejecutar código final con .finally()
//
// Sintaxis básica:
// new Promise((resolve, reject) => {
//     if (condición_exitosa) {
//         resolve(valor); // Operación exitosa
//     } else {
//         reject(error); // Operación fallida
//     }
// });

// Función que verifica si una cadena termina en vocal usando Promises
const verificarVocalFinal = (cadena) => {
    return new Promise((resolve, reject) => {
        // Validar que se recibió una cadena
        if (typeof cadena !== 'string' || cadena.length === 0) {
            reject('Debe proporcionar una cadena válida no vacía');
            return;
        }

        // Obtener el último carácter de la cadena
        const ultimoCaracter = cadena.charAt(cadena.length - 1);
        
        // Definir las vocales en minúsculas y mayúsculas
        const vocales = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
        
        // Verificar si el último carácter es una vocal
        if (vocales.includes(ultimoCaracter)) {
            // Si es vocal, resolver la promesa con la vocal
            resolve(ultimoCaracter);
        } else {
            // Si no es vocal, rechazar la promesa
            reject('el caracter no es una vocal');
        }
    });
}

// Función que maneja la verificación desde la interfaz
const verificarCadena = () => {
    const cadena = document.getElementById('cadenaPromise').value;
    
    if (cadena.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Campo vacío',
            text: 'Por favor, ingrese una cadena de texto.',
            confirmButtonColor: '#3498db'
        });
        return;
    }

    // Mostrar indicador de carga
    const btnVerificar = document.querySelector('.btn-verify');
    const originalText = btnVerificar.innerHTML;
    btnVerificar.innerHTML = '<i class="bi bi-hourglass-split"></i> Verificando...';
    btnVerificar.disabled = true;

    // Simular un pequeño delay para mostrar el comportamiento asíncrono
    setTimeout(() => {
        // Llamar a la función que retorna la Promise
        verificarVocalFinal(cadena)
            .then((vocal) => {
                // Si la promesa se resuelve (termina en vocal)
                const resultadoDiv = document.getElementById('resultadoPromise');
                resultadoDiv.innerHTML = `
                    <div class="alert alert-success fade-in">
                        <i class="bi bi-check-circle"></i> 
                        <strong>¡Éxito!</strong> La cadena "<strong>${cadena}</strong>" termina en la vocal: <strong>${vocal}</strong>
                    </div>
                `;
                resultadoDiv.style.display = 'block';
                
                console.log(`✓ Promise resuelta: La vocal final es "${vocal}"`);
            })
            .catch((error) => {
                // Si la promesa se rechaza (no termina en vocal)
                const resultadoDiv = document.getElementById('resultadoPromise');
                resultadoDiv.innerHTML = `
                    <div class="alert alert-danger fade-in">
                        <i class="bi bi-x-circle"></i> 
                        <strong>Error:</strong> ${error}. La cadena "<strong>${cadena}</strong>" termina en: <strong>${cadena.charAt(cadena.length - 1)}</strong>
                    </div>
                `;
                resultadoDiv.style.display = 'block';
                
                console.log(`✗ Promise rechazada: ${error}`);
            })
            .finally(() => {
                // Este bloque se ejecuta siempre, sin importar si la promesa se resolvió o rechazó
                btnVerificar.innerHTML = originalText;
                btnVerificar.disabled = false;
                console.log('→ Verificación completada');
            });
    }, 500);
}

// Función para limpiar el campo de la promesa
const limpiarPromise = () => {
    document.getElementById('cadenaPromise').value = '';
    const resultadoDiv = document.getElementById('resultadoPromise');
    resultadoDiv.style.display = 'none';
    resultadoDiv.innerHTML = '';
}

// Ejemplos de uso en consola (para demostración)
console.log('=== Ejemplos de uso de verificarVocalFinal() ===');
console.log('Puedes probar en la consola:');
console.log('verificarVocalFinal("Hola").then(v => console.log("Vocal:", v)).catch(e => console.log("Error:", e))');
console.log('verificarVocalFinal("Mundo").then(v => console.log("Vocal:", v)).catch(e => console.log("Error:", e))');
console.log('verificarVocalFinal("JavaScript").then(v => console.log("Vocal:", v)).catch(e => console.log("Error:", e))');
