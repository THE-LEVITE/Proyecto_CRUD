// Variables Globales
const tablaProductosHTML = document.getElementById('tablaProductos');
const nombre = document.getElementById('nombre');
const precio = document.getElementById('precio');
const cantidad = document.getElementById('cantidad');
const btnGuardar = document.getElementById('btnGuardar');
let tituloModal = document.getElementById('tituloModal');
let idProductoModificar = 0;
let listaProductos = [];

// Acciones Guardar Producto (crear o modificar según el título del modal)
btnGuardar.addEventListener('click', () => {
    if (tituloModal.innerText === "Modificar Producto") {
        modificarProductoGuardar(idProductoModificar);
    } else if (tituloModal.innerText === "Crear Producto") {
        crearProducto();
    }
});

// Eliminar Producto
async function eliminarProducto(id) {
    // Te recomiendo dejar esta confirmación para evitar borrados accidentales
    const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (!confirmacion.isConfirmed) return;

    await fetch('http://localhost:8080/api/productos/delete/' + id, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then((res) => {
        console.log(res);
        Swal.fire({
            title: 'Producto Eliminado',
            text: "El producto se eliminó correctamente",
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
        obtenerProductos();
    })
    .catch((err) => {
        console.log(err);
        Swal.fire({
            title: 'Error al eliminar',
            text: "No se pudo eliminar el producto",
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    });
}

// Modificar Producto (abrir modal con datos cargados)
function modificarProducto(id) {
    tituloModal.innerText = "Modificar Producto";
    modal.style.display = "block";
    idProductoModificar = id;
    resetModal();
    let producto = listaProductos.filter(producto => producto.id === id);
    nombre.value = producto[0].nombre;
    precio.value = producto[0].precio;
    cantidad.value = producto[0].cantidad;
}

// Crear Producto (POST)
async function crearProducto() {
    let productoGuardar = {
        nombre: nombre.value,
        precio: parseInt(precio.value),
        cantidad: parseInt(cantidad.value)
    };

    await fetch('http://localhost:8080/api/productos/create', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productoGuardar)
    })
    .then((producto) => {
        console.log(producto);
        Swal.fire({
            title: '¡Producto Creado!',
            text: "El producto se creó correctamente",
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
        modal.style.display = "none";
        obtenerProductos();
        resetModal();
    })
    .catch((err) => {
        console.log(err);
        Swal.fire({
            title: '¡Error al crear el producto!',
            text: "No se pudo crear el producto correctamente",
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    });
}

// Modificar Producto (PUT)
async function modificarProductoGuardar(id) {
    let productoGuardar = {
        id: id,
        nombre: nombre.value,
        precio: parseInt(precio.value),
        cantidad: parseInt(cantidad.value)
    };

    try {
        const respuesta = await fetch('http://localhost:8080/api/productos/update/' + id, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoGuardar)
        });

        if (!respuesta.ok) {
            throw new Error('Error al modificar el producto');
        }

        Swal.fire({
            title: 'Producto Modificado',
            text: "Producto modificado exitosamente",
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
        modal.style.display = 'none';
        resetModal();
        obtenerProductos();

    } catch (error) {
        console.error(error);
        Swal.fire({
            title: 'Error al modificar',
            text: "No se pudo modificar el producto",
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
}

// Consumo API - Obtener productos
async function obtenerProductos() {
    tablaProductosHTML.innerHTML = '';
    await fetch('http://localhost:8080/api/productos')
        .then(response => response.json())
        .then(productos => {
            console.log(productos);
            listaProductos = productos;
            
            for (let producto of productos) {
                // Aquí está el HTML de la nueva tabla con los botones bonitos
                tablaProductosHTML.innerHTML +=
                    '<tr>' +
                    '    <td>' + producto.id + '</td>' +
                    '    <td style="font-weight: 500;">' + producto.nombre + '</td>' +
                    '    <td>$' + producto.precio + '</td>' +
                    '    <td><span style="background:#f1f5f9; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem; font-weight: 500;">' + producto.cantidad + '</span></td>' +
                    '    <td class="acciones">' +
                    '        <button class="btn-accion btn-editar" onclick="modificarProducto(' + producto.id + ')">' +
                    '            <i class="fa-solid fa-pen"></i> Modificar' +
                    '        </button>' +
                    '        <button class="btn-accion btn-eliminar" onclick="eliminarProducto(' + producto.id + ')">' +
                    '            <i class="fa-solid fa-trash-can"></i> Eliminar' +
                    '        </button>' +
                    '    </td>' +
                    '</tr>';
            }
            
            // Actualiza el contador de abajo
            document.getElementById('totalProductos').innerText = `Total: ${productos.length} productos registrados`;
        })
        .catch((err) => {
            console.log(err);
            Swal.fire({
                title: 'Error de conexión',
                text: "No pudimos obtener los productos",
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        });
}
obtenerProductos();

// Reset Modal
function resetModal() {
    nombre.value = "";
    cantidad.value = "";
    precio.value = "";
}

// Modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    tituloModal.innerText = "Crear Producto";
    modal.style.display = "block";
};

span.onclick = function () {
    modal.style.display = "none";
    resetModal();
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        resetModal();
    }
};