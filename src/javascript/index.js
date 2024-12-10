$(document).ready(function() {
 
    $('#Primero').click(function() {
        $.get("https://my-json-server.typicode.com/typicode/demo/posts", function(data) {
            $('#1').val('Bien'); 
        }).fail(function() {
            $('#1').val('Error al realizar GET');
        });
    });

    
    $('#Segundo').click(function() {
        $.post("https://my-json-server.typicode.com/typicode/demo/posts", 
        { title: "Nuevo Post" }, 
        function(data) {
            $('#2').val('Bien'); 
        }).fail(function() {
            $('#2').val('Error al realizar POST');
        });
    });

    
    $('#Tercero').click(function() {
        $.ajax({
            url: "https://my-json-server.typicode.com/typicode/demo/posts/1",
            type: "PUT",
            data: JSON.stringify({ title: "Actualización PUT" }),
            contentType: "application/json",
            success: function(data) {
                $('#3').val('Bien'); o
            },
            error: function() {
                $('#3').val('Error al realizar PUT');
            }
        });
    });

   
    $('#Cuarto').click(function() {
        $.ajax({
            url: "https://my-json-server.typicode.com/typicode/demo/posts/1",
            type: "PATCH",
            data: JSON.stringify({ title: "Actualización PATCH" }),
            contentType: "application/json",
            success: function(data) {
                $('#4').val('Bien'); 
            },
            error: function() {
                $('#4').val('Error al realizar PATCH');
            }
        });
    });

   
    $('#Cinco').click(function() {
        $.ajax({
            url: "https://my-json-server.typicode.com/typicode/demo/posts/1",
            type: "DELETE",
            success: function() {
                $('#5').val('Eliminado correctamente');
            },
            error: function() {
                $('#5').val('Error al realizar DELETE');
            }
        });
    });
});
