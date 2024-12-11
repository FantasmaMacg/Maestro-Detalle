$(document).ready(function () {
    refrescar();


    $('#Primero').click(function LeerListar() {
        $.get("https://my-json-server.typicode.com/desarrollo-seguro/dato/db",
            function (data) {
                let listadoHtml = "<ul>";
                data.solicitudes.forEach(item => {
                    listadoHtml += `<li>${item.nombre} ${item.apellido} <button class="editar" data-id="${item.id}">Editar</button> <button class="borrar" data-id="${item.id}">Borrar</button></li>`;
                });
                listadoHtml += "</ul>";
                $('#1').val('Listados: ' + listadoHtml);
            }).fail(function () {
                $('#1').val('Error al realizar GET');
            });
    });

    //GET: Leer/Listar

    $('#Segundo').click(function Crear() {
        $.post("https://my-json-server.typicode.com/desarrollo-seguro/dato/db",
            {
                nombre: "Nuevo",
                apellido: "Usuario"
            },
            function (data) {
                $('#2').val('Bien');
            }).fail(function () {
                $('#2').val('Error al realizar POST');
            });
    });

    //POST: Crear

    $('#Tercero').click(function ModificarReemplazar() {
        let id = 1; // Aquí puedes usar el ID que desees modificar
        $.ajax({
            url: `https://my-json-server.typicode.com/desarrollo-seguro/dato/db/solicitudes/${id}`,
            type: "PUT",
            data: {
                nombre: "Nombre Modificado",
                apellido: "Apellido Modificado"
            },
            success: function (data) {
                $('#3').val('Bien');
            },
            error: function () {
                $('#3').val('Error al realizar PUT');
            }
        });
    });
    //PUT: Modificar (reemplazar)

    $('#Cuarto').click(function ModificarParcial() {
        let id = 1; // Aquí puedes usar el ID que desees modificar
        $.ajax({
            url: `https://my-json-server.typicode.com/desarrollo-seguro/dato/db/solicitudes/${id}`,
            type: "PATCH",
            data: {
                nombre: "Nombre Parcial Modificado"
            },
            success: function (data) {
                $('#4').val('Bien');
            },
            error: function () {
                $('#4').val('Error al realizar PATCH');
            }
        });
    });
    //PATCH: Modificar (parcial)

    $('#Cinco').click(function Borrar() {
        let id = 1; // Aquí puedes usar el ID que desees borrar
        $.ajax({
            url: `https://my-json-server.typicode.com/desarrollo-seguro/dato/db/solicitudes/${id}`,
            type: "DELETE",
            success: function () {
                $('#5').val('Eliminado correctamente');
            },
            error: function () {
                $('#5').val('Error al realizar DELETE');
            }
        });
    });
    //DELETE: Borrar

    // Maestro Detalle
    function refrescar() {
        // Llamar a GET para listar los datos
        $.get("https://my-json-server.typicode.com/desarrollo-seguro/dato/db", function(data) {
            let listadoHtml = "<ul>";
            data.solicitudes.forEach(item => {
                listadoHtml += `<li>${item.nombre} ${item.apellido} <button class="editar" data-id="${item.id}">Editar</button> <button class="borrar" data-id="${item.id}">Borrar</button></li>`;
            });
            listadoHtml += "</ul>";
            $('#listado').html(listadoHtml);
        });
    };

    $('#nuevo').click(function() {
        // Mostrar el formulario de detalle para crear
        $('#maestro').show();
        $('#detalle').show();
    });

    $('#cancelar').click(function() {
        // Volver a la vista de listado
        $('#detalle').hide();
        $('#maestro').show();
    });
    $('#refrescar').click(function(){
        $('#detalle').hide();
       
        refrescar();
       


    });

    // Acciones de editar
    $(document).on('click', '.editar', function() {
        let id = $(this).data('id');
        $.get(`https://my-json-server.typicode.com/desarrollo-seguro/dato/db/solicitudes/${id}`, function(data) {
            $('#nombre').val(data.nombre);
            $('#apellido').val(data.apellido);
            $('#crear').text('Modificar');
            $('#crear').off('click').off('click', function() {
                $.ajax({
                    url: `https://my-json-server.typicode.com/desarrollo-seguro/dato/db/solicitudes/${id}`,
                    type: "PUT",
                    data: {
                        nombre: $('#nombre').val(),
                        apellido: $('#apellido').val()
                    },
                    success: function() {
                        $('#detalle').hide();
                        $('#maestro').show();
                        $('#refrescar').click();
                    }
                });
            });
        });
    });

    // Borrar un elemento
    $(document).on('click', '.borrar', function() {
        let id = $(this).data('id');
        $.ajax({
            url: `https://my-json-server.typicode.com/desarrollo-seguro/dato/db/solicitudes/${id}`,
            type: "DELETE",
            success: function() {
                $('#refrescar').click();
            }
        });
    });

});
