// ============================================
// CRUD PRINCIPAL
// ============================================

// Validación mejorada del formulario
const validateForm = () => {
    let email = document.getElementById("email").value.trim();
    let name = document.getElementById("nombres").value.trim();
    let doc = document.getElementById("documento").value.trim();
    
    if (email === "" || name === "" || doc === "") {
        Swal.fire({
            icon: 'error',
            title: 'Campos incompletos',
            text: 'Por favor, complete todos los campos obligatorios.',
            confirmButtonColor: '#3498db'
        });
        return false;
    }

    // Validar que el nombre tenga al menos 3 caracteres
    if (name.length < 3) {
        Swal.fire({
            icon: 'error',
            title: 'Nombre muy corto',
            text: 'El nombre debe tener al menos 3 caracteres.',
            confirmButtonColor: '#3498db'
        });
        return false;
    }

    // Validar que el nombre solo contenga letras y espacios (sin números)
    const nameRegex = /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/;
    if (!nameRegex.test(name)) {
        Swal.fire({
            icon: 'error',
            title: 'Nombre inválido',
            text: 'El nombre solo puede contener letras y espacios, sin números.',
            confirmButtonColor: '#3498db'
        });
        return false;
    }

    // Validar formato de email (sin mayúsculas)
    const emailLower = email.toLowerCase();
    if (email !== emailLower) {
        Swal.fire({
            icon: 'error',
            title: 'Mayúsculas no permitidas',
            text: 'El correo electrónico no puede contener letras mayúsculas.',
            confirmButtonColor: '#3498db'
        });
        return false;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Email inválido',
            text: 'Por favor, ingrese un correo electrónico válido.',
            confirmButtonColor: '#3498db'
        });
        return false;
    }

    // Validar que el documento sea numérico
    const docRegex = /^[0-9]+$/;
    if (!docRegex.test(doc)) {
        Swal.fire({
            icon: 'error',
            title: 'Documento inválido',
            text: 'El documento solo puede contener números.',
            confirmButtonColor: '#3498db'
        });
        return false;
    }

    // Validar longitud del documento (6-12 dígitos)
    if (doc.length < 6 || doc.length > 12) {
        Swal.fire({
            icon: 'error',
            title: 'Documento inválido',
            text: 'El documento debe tener entre 6 y 12 dígitos.',
            confirmButtonColor: '#3498db'
        });
        return false;
    }

    return true;
}

// Mostrar datos en la tabla
const showData = () => {
    let listData;
    if (localStorage.getItem("listData") === null) {
        listData = [];
    } else {
        listData = JSON.parse(localStorage.getItem("listData"));
    }
    let html = "";

    listData.forEach((element, index) => {
        html += `<tr>
                    <td>${element.email}</td>
                    <td>${element.name}</td>
                    <td>${element.doc}</td>
                    <td>
                        <button class="btn-action btn-edit" onclick="editData(${index})" title="Editar">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn-action btn-delete" onclick="confirmDelete(${index})" title="Eliminar">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>`;
    });

    if (html === "") {
        html = `<tr>
                    <td colspan="4" class="empty-state">
                        No hay datos registrados
                    </td>
                </tr>`;
    }

    document.getElementById("tablaCuerpo").innerHTML = html;
}

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', () => {
    showData();
});

// Agregar nuevo registro
const addData = () => {
    if (validateForm() == true) {
        let email = document.getElementById("email").value.trim();
        let name = document.getElementById("nombres").value.trim();
        let doc = document.getElementById("documento").value.trim();

        // Verificar si el email y documento ya existen
        let listData = JSON.parse(localStorage.getItem("listData") || "[]");
        const emailExists = listData.some(item => item.email.toLowerCase() === email.toLowerCase());
        const docExists = listData.some(item => item.doc === doc);

        // Verificar duplicados y mostrar mensajes específicos
        if (emailExists && docExists) {
            Swal.fire({
                icon: 'error',
                title: 'Datos duplicados',
                text: 'El correo electrónico y el número de documento ya están registrados.',
                confirmButtonColor: '#3498db'
            });
            return;
        } else if (emailExists) {
            Swal.fire({
                icon: 'error',
                title: 'Email duplicado',
                text: 'Este correo electrónico ya está registrado.',
                confirmButtonColor: '#3498db'
            });
            return;
        } else if (docExists) {
            Swal.fire({
                icon: 'error',
                title: 'Documento duplicado',
                text: 'Este número de documento ya está registrado.',
                confirmButtonColor: '#3498db'
            });
            return;
        }

        if (localStorage.getItem("listData") === null) {
            listData = [];
        } else {
            listData = JSON.parse(localStorage.getItem("listData"));
        }
        listData.push({ email: email, name: name, doc: doc });
        localStorage.setItem("listData", JSON.stringify(listData));
        showData();

        // Limpiar formulario
        document.getElementById("email").value = "";
        document.getElementById("nombres").value = "";
        document.getElementById("documento").value = "";

        Swal.fire({
            icon: 'success',
            title: '¡Registrado!',
            text: 'Los datos han sido guardados correctamente.',
            timer: 2000,
            showConfirmButton: false
        });
    }
}

// Confirmar antes de editar
const editData = (index) => {
    Swal.fire({
        icon: 'question',
        title: 'Editar registro',
        text: '¿Desea editar este registro?',
        showCancelButton: true,
        confirmButtonColor: '#3498db',
        cancelButtonColor: '#e74c3c',
        confirmButtonText: 'Sí, editar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let listData = JSON.parse(localStorage.getItem("listData"));
            
            document.getElementById("email").value = listData[index].email;
            document.getElementById("nombres").value = listData[index].name;
            document.getElementById("documento").value = listData[index].doc;
            
            document.getElementById("editIndex").value = index;
            
            // Cambiar el texto del botón
            document.querySelector(".btn-guardar").innerHTML = '<i class="bi bi-pencil"></i> Actualizar';
            
            // Scroll al formulario
            document.querySelector('.registro-section').scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Confirmar eliminación con SweetAlert
const confirmDelete = (index) => {
    Swal.fire({
        icon: 'warning',
        title: '¿Eliminar registro?',
        text: 'Esta acción no se puede deshacer.',
        showCancelButton: true,
        confirmButtonColor: '#e74c3c',
        cancelButtonColor: '#3498db',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteData(index);
        }
    });
}

// Eliminar registro
const deleteData = (index) => {
    let listData = JSON.parse(localStorage.getItem("listData"));
    const deletedItem = listData[index];
    listData.splice(index, 1);
    localStorage.setItem("listData", JSON.stringify(listData));
    showData();
    
    Swal.fire({
        icon: 'success',
        title: '¡Eliminado!',
        text: `El registro de "${deletedItem.name}" ha sido eliminado.`,
        timer: 2000,
        showConfirmButton: false
    });
}

// Guardar datos (crear o actualizar)
const guardarDatos = (event) => {
    event.preventDefault();
    
    let editIndex = document.getElementById("editIndex").value;
    
    if (editIndex === "-1") {
        addData();
    } else {
        // Actualizar registro existente con validación
        if (validateForm() == true) {
            let email = document.getElementById("email").value.trim();
            let name = document.getElementById("nombres").value.trim();
            let doc = document.getElementById("documento").value.trim();
            
            let listData = JSON.parse(localStorage.getItem("listData"));
            
            // Verificar si el email y documento ya existen en otros registros
            const emailExists = listData.some((item, idx) =>
                idx !== parseInt(editIndex) && item.email.toLowerCase() === email.toLowerCase()
            );
            const docExists = listData.some((item, idx) =>
                idx !== parseInt(editIndex) && item.doc === doc
            );

            // Verificar duplicados y mostrar mensajes específicos
            if (emailExists && docExists) {
                Swal.fire({
                    icon: 'error',
                    title: 'Datos duplicados',
                    text: 'El correo electrónico y el número de documento ya están registrados en otros registros.',
                    confirmButtonColor: '#3498db'
                });
                return;
            } else if (emailExists) {
                Swal.fire({
                    icon: 'error',
                    title: 'Email duplicado',
                    text: 'Este correo electrónico ya está registrado en otro registro.',
                    confirmButtonColor: '#3498db'
                });
                return;
            } else if (docExists) {
                Swal.fire({
                    icon: 'error',
                    title: 'Documento duplicado',
                    text: 'Este número de documento ya está registrado en otro registro.',
                    confirmButtonColor: '#3498db'
                });
                return;
            }
            
            listData[editIndex] = { email: email, name: name, doc: doc };
            localStorage.setItem("listData", JSON.stringify(listData));
            showData();

            // Limpiar formulario
            document.getElementById("email").value = "";
            document.getElementById("nombres").value = "";
            document.getElementById("documento").value = "";
            document.getElementById("editIndex").value = "-1";
            
            // Restaurar texto del botón
            document.querySelector(".btn-guardar").innerHTML = '<i class="bi bi-save"></i> Guardar';
            
            Swal.fire({
                icon: 'success',
                title: '¡Actualizado!',
                text: 'Los datos han sido actualizados correctamente.',
                timer: 2000,
                showConfirmButton: false
            });
        }
    }
}

// Exportar datos a JSON
const exportarJSON = () => {
    let listData = JSON.parse(localStorage.getItem("listData"));
    
    if (listData === null || listData.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Sin datos',
            text: 'No hay datos para exportar.',
            confirmButtonColor: '#3498db'
        });
        return;
    }
    
    let dataStr = JSON.stringify(listData, null, 2);
    let blob = new Blob([dataStr], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    
    let a = document.createElement("a");
    a.href = url;
    a.download = "datos_crud.json";
    a.click();
    URL.revokeObjectURL(url);
    
    Swal.fire({
        icon: 'success',
        title: '¡Exportado!',
        text: 'Los datos han sido exportados correctamente.',
        timer: 2000,
        showConfirmButton: false
    });
}

// Limpiar formulario
const limpiarFormulario = () => {
    // Verificar si hay datos en el formulario
    const nombres = document.getElementById("nombres").value.trim();
    const documento = document.getElementById("documento").value.trim();
    const email = document.getElementById("email").value.trim();
    const editIndex = document.getElementById("editIndex").value;

    // Si hay datos o está en modo edición, confirmar
    if (nombres || documento || email || editIndex !== "-1") {
        Swal.fire({
            icon: 'question',
            title: '¿Limpiar formulario?',
            text: 'Se perderán los datos no guardados.',
            showCancelButton: true,
            confirmButtonColor: '#3498db',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, limpiar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                ejecutarLimpieza();
            }
        });
    } else {
        ejecutarLimpieza();
    }
}

const ejecutarLimpieza = () => {
    // Limpiar campos
    document.getElementById("nombres").value = "";
    document.getElementById("documento").value = "";
    document.getElementById("email").value = "";
    document.getElementById("editIndex").value = "-1";

    // Restaurar texto del botón
    document.querySelector(".btn-guardar").innerHTML = '<i class="bi bi-save"></i> Guardar';

    // Quitar foco de los campos
    document.getElementById("nombres").blur();
    document.getElementById("documento").blur();
    document.getElementById("email").blur();
}

// Borrar todos los registros
const borrarTodo = () => {
    Swal.fire({
        icon: 'warning',
        title: '¿Borrar todo?',
        text: 'Se eliminarán todos los registros. Esta acción no se puede deshacer.',
        showCancelButton: true,
        confirmButtonColor: '#e74c3c',
        cancelButtonColor: '#3498db',
        confirmButtonText: 'Sí, borrar todo',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("listData");
            showData();

            Swal.fire({
                icon: 'success',
                title: '¡Borrado!',
                text: 'Todos los registros han sido eliminados.',
                timer: 2000,
                showConfirmButton: false
            });
        }
    });
}

// ============================================
// FIN DEL CRUD
// ============================================
