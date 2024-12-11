$(document).ready(function () {
    inicializarEventos();

    function inicializarEventos() {
        $('#refrescar').click(refrescar);
        $('#nuevo').click(mostrarFormularioCrear);
        $('#cancelar').click(cancelarAccion);
        $(document).on('click', '.editable', editarElemento);
        $(document).on('click', '.borrar', borrarElemento);
        refrescar();
    }

   
    function refrescar() {
        $('#cargando').show();
        $('#listado tbody').html('');
        obtenerDatos();
    }

    function mostrarFormularioCrear() {
        $('#detalle').show();
        $('#nombre').val('');
        $('#apellido').val('');
        $('#crear').text('Crear').off('click').click(function () {
            let nuevoElemento = {
                nombre: $('#nombre').val(),
                apellido: $('#apellido').val()
            };
            crearElemento(nuevoElemento);
        });
    }

    function cancelarAccion() {
        $('#detalle').hide();
        refrescar();
    }

    function editarElemento() {
        let id = $(this).data('id');
        obtenerElementoPorId(id);
    }

    function borrarElemento() {
        let id = $(this).data('id');
        eliminarElemento(id);
    }

   
    function obtenerDatos() {
        $.get("https://my-json-server.typicode.com/desarrollo-seguro/dato/db", function (data) {
            let listadoHtml = '';
            data.solicitudes.forEach(item => {
                listadoHtml += `
                    <tr class="listado-item" data-id="${item.id}">
                        <td class="editable" data-id="${item.id}">${item.nombre}</td>
                        <td class="editable" data-id="${item.id}">${item.apellido}</td>
                        <td>
                            <button class="btn btn-danger borrar" data-id="${item.id}">Borrar</button>
                        </td>
                    </tr>`;
            });
            $('#listado tbody').html(listadoHtml);
            $('#cargando').hide();
            $('#listado').show();
        }).fail(function () {
            mostrarAlerta('Error al cargar los datos', 'danger');
        });
    }

    function crearElemento(nuevoElemento) {
        $.post("https://my-json-server.typicode.com/typicode/demo/posts", nuevoElemento, function () {
            mostrarAlerta('Elemento creado correctamente', 'success');
            cancelarAccion();
            refrescar();
        }).fail(function () {
            mostrarAlerta('Error al crear el elemento', 'danger');
            cancelarAccion();
            refrescar();
        });
    }

    function actualizarElemento(id, datosActualizados) {
        $.ajax({
            url: `https://my-json-server.typicode.com/typicode/demo/posts/${id}`,
            type: 'PUT',
            data: datosActualizados,
            success: function () {
                mostrarAlerta('Elemento actualizado correctamente', 'success');
                cancelarAccion();
                refrescar();
            },
            error: function () {
                mostrarAlerta('Error al actualizar el elemento', 'danger');
                cancelarAccion();
                refrescar();
            }
        });
    }

    function eliminarElemento(id) {
        $.ajax({
            url: `https://my-json-server.typicode.com/typicode/demo/posts/${id}`,
            type: 'DELETE',
            success: function () {
                mostrarAlerta('Elemento eliminado correctamente', 'success');
                refrescar();
            },
            error: function () {
                mostrarAlerta('Error al eliminar el elemento', 'danger');
                refrescar();
            }
        });
    }

    function obtenerElementoPorId(id) {
        $.get("https://my-json-server.typicode.com/desarrollo-seguro/dato/db", function (data) {
            let elemento = data.solicitudes.find(item => item.id === id);
            if (!elemento) {
                mostrarAlerta('Error: No se encontró el elemento.', 'danger');
                return;
            }

            $('#detalle').show();
            $('#nombre').val(elemento.nombre);
            $('#apellido').val(elemento.apellido);
            $('#crear').text('Guardar').off('click').click(function () {
                let datosActualizados = {
                    nombre: $('#nombre').val(),
                    apellido: $('#apellido').val()
                };
                actualizarElemento(id, datosActualizados);
            });
        }).fail(function () {
            mostrarAlerta('Error al obtener el elemento', 'danger');
        });
    }

    
    function mostrarAlerta(mensaje, tipo) {
        let alerta = `
            <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
                ${mensaje}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
        $('#alerta').html(alerta);
        setTimeout(function () {
            $('#alerta').html('');
        }, 1000);
    }
      // cambio de servidor simulado ya que 'https://my-json-server.typicode.com/desarrollo-seguro/dato/db' no permite modificaciones. Por esta razón, se utiliza 'https://my-json-server.typicode.com/typicode/demo/posts' para probar correctamente las operaciones de creación, actualización y eliminación."
});
