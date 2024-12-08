$(document).ready(function() {
    const informacion = [
        "Es frío y profundo, y también sereno, en la naturaleza es un tono pleno.",
        "En los campos lo puedes ver, en las hojas lo puedes entender.",
        "En los campos lo encuentras en la flor, y también en el maíz, lleno de sabor.",
    ];

    let indice = 0;
    let tiempoRestante = 10;
    let timer;
    let gameStarted = false;

    function iniciarJuego() {
        if (gameStarted) return;

        gameStarted = true;
        tiempoRestante = 10;
        
        
        $('<button>', {
            id: 'Segundo',
            text: 'Azul',
            click: function() {
                if (indice === 1) {
                    $(this).hide();
                    agregarValor(informacion[indice]);
                    indice++;
                } else {
                    alert("¡Corte incorrecto! Intenta de nuevo.");
                    reiniciarJuego();
                }
            }
        }).appendTo('body');

        $('<button>', {
            id: 'Tercero',
            text: 'Verde',
            click: function() {
                if (indice === 2) {
                    $(this).hide();
                    agregarValor(informacion[indice]);
                    indice++;
                } else {
                    alert("¡Corte incorrecto! Intenta de nuevo.");
                    reiniciarJuego();
                }
            }
        }).appendTo('body');

        $('<button>', {
            id: 'Cuarto',
            text: 'Amarillo',
            click: function() {
                if (indice === 3) {
                    $(this).hide();
                    agregarValor(informacion[indice]);
                    alert("¡La bomba ha sido desactivada! ¡Ganaste!");
                    clearInterval(timer);
                    reiniciarJuego();
                } else {
                    alert("¡Corte incorrecto! Intenta de nuevo.");
                    reiniciarJuego();
                }
            }
        }).appendTo('body');

        timer = setInterval(function() {
            if (tiempoRestante > 0) {
                tiempoRestante--;
            } else {
                clearInterval(timer);
                alert("¡La bomba explotó! ¡Juego terminado!");
                reiniciarJuego();
            }
        }, 1000);
    }

    function reiniciarJuego() {
        gameStarted = false;
        indice = 0;
        tiempoRestante = 10;
        $('#Quinto').val('');

        $('#Primero').text('Abrir bomba');
        
        
        $('#Segundo, #Tercero, #Cuarto').remove();
        alert("¡Reiniciando el juego!");
    }

    function agregarValor(valor) {
        $('#Quinto').val(function(i, text) {
            return text + valor + "\n";
        });
    }

    $('#Primero').click(function() {
        iniciarJuego();
        if (indice === 0) {
            alert("Tienes 10 segundos para parar la bomba.");
            agregarValor(informacion[indice]);
            indice++;
            $('#Primero').text('Cerrar Bomba');
        } else {
            reiniciarJuego();
        }
    });
});
