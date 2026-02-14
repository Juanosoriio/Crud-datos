// Descripción de Destructuring Objects:
// Destructuring es una característica de ES6 que permite extraer valores de arrays
// o propiedades de objetos de forma elegante y concisa. En este ejemplo,
// utilizamos destructuring para extraer múltiples propiedades de un objeto
// en una sola línea de código, evitando la repetición del nombre del objeto.

// Ejercicio: Destructuring Objects
// ==================================

// Objeto con los datos de la persona
const person = {
    name: 'Juan Carlos Valencia',
    age: 30,
    city: 'Cali',
    profession: 'Desarrollador'
};

// Función que utiliza destructuring para extraer datos del objeto
const extraerDatos = () => {
    // Utilizando destructuring para extraer name, age y profession
    const { name, age, profession } = person;

    // Imprimir en consola
    console.log('=== Datos Extraídos con Destructuring ===');
    console.log('Nombre:', name);
    console.log('Edad:', age);
    console.log('Profesión:', profession);
    console.log('==========================================');

    // Mostrar en la página
    const resultadoDiv = document.getElementById('resultadoDestructuring');
    resultadoDiv.innerHTML = `
        <div class="extracted-data fade-in">
            <h5><i class="bi bi-person-badge"></i> Datos Extraídos</h5>
            <div class="data-item">
                <span class="label"><i class="bi bi-person"></i> Nombre:</span>
                <span class="value">${name}</span>
            </div>
            <div class="data-item">
                <span class="label"><i class="bi bi-calendar"></i> Edad:</span>
                <span class="value">${age} años</span>
            </div>
            <div class="data-item">
                <span class="label"><i class="bi bi-briefcase"></i> Profesión:</span>
                <span class="value">${profession}</span>
            </div>
        </div>
        <p class="text-success mt-3">
            <i class="bi bi-check-circle"></i> 
            Los datos fueron extraídos exitosamente usando <strong>Destructuring</strong>
        </p>
    `;

    // Mostrar SweetAlert de confirmación
    Swal.fire({
        icon: 'success',
        title: '¡Destructuring exitoso!',
        html: `
            <p>Se extrajeron los siguientes datos:</p>
            <ul style="text-align: left;">
                <li><strong>Nombre:</strong> ${name}</li>
                <li><strong>Edad:</strong> ${age} años</li>
                <li><strong>Profesión:</strong> ${profession}</li>
            </ul>
        `,
        confirmButtonColor: '#667eea'
    });
}

// Ejemplo adicional: Destructuring con valores por defecto
const ejemploValoresPorDefecto = () => {
    const datos = {
        nombre: 'Ana María',
        edad: 28
        // No tiene propiedad 'ciudad' ni 'profesion'
    };

    // Extrayendo con valores por defecto
    const { nombre, edad, ciudad = 'No especificada', profesion = 'No especificada' } = datos;

    console.log('=== Destructuring con Valores por Defecto ===');
    console.log('Nombre:', nombre);
    console.log('Edad:', edad);
    console.log('Ciudad:', ciudad);  // Usa el valor por defecto
    console.log('Profesión:', profesion);  // Usa el valor por defecto
}

// Ejemplo adicional: Destructuring renombrando variables
const ejemploRenombrar = () => {
    const producto = {
        nombre: 'Laptop',
        precio: 1500000,
        stock: 10
    };

    // Renombrando propiedades durante el destructuring
    const { nombre: nombreProducto, precio: precioProducto, stock: stockProducto } = producto;

    console.log('=== Destructuring con Renombrar ===');
    console.log('Nombre del Producto:', nombreProducto);
    console.log('Precio del Producto:', precioProducto);
    console.log('Stock del Producto:', stockProducto);
}

// Ejemplo adicional: Destructuring de objetos anidados
const ejemploObjetosAnidados = () => {
    const empleado = {
        id: 1,
        nombre: 'Pedro Gómez',
        departamento: {
            nombre: 'TI',
            ubicacion: 'Piso 3'
        },
        contacto: {
            email: 'pedro@empresa.com',
            telefono: '555-1234'
        }
    };

    // Destructuring de objetos anidados
    const {
        nombre,
        departamento: { nombre: nombreDepto, ubicacion },
        contacto: { email }
    } = empleado;

    console.log('=== Destructuring de Objetos Anidados ===');
    console.log('Nombre:', nombre);
    console.log('Departamento:', nombreDepto);
    console.log('Ubicación:', ubicacion);
    console.log('Email:', email);
}

// Ejecutar automáticamente al cargar la página
console.log('=== Destructuring Objects ===');
console.log('Objeto original:', person);
