function LlenarNavbar(){
    const navbarHtml = `
    <nav class="navbar navbar-expand-lg navbar-personalizado">
        <a class="navbar-brand" href="index.html">
            <img src="imagenes/logoJardineria.png" alt="Logo de Paraiso Verde" class="logo-img">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="index.html">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="utensilios.html">Productos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="nosotros.html">Nosotros</a>
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="registro.html">Registrarse</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="iniciarSesion.html">Iniciar sesión</a>
                </li>
            </ul>
        </div>
    </nav>`;
$('#idNavbar').html(navbarHtml);

    
}

function irAlCarro() {
    $('#modal-carro').modal('show');
    var rowCount = $('#tablaProductos tbody tr').length;
    if (rowCount == 0) {
        $('#tablaProductos').hide();
        $('#valorTotal').hide();
        $('#btnComprar').hide();

        $('#existeProducto').show();
    }
    else {
        $('#valorTotal').show();
        $('#btnComprar').show();

        $('#existeProducto').hide();
        $('#tablaProductos').show();
    }
}


function FiltrarUtensilios() {
    $('#Existencias').hide();
    $('#listaProductos').show();
    var tipo = ($('#cmbTipoutensilio').val() || '').toUpperCase();
    if (parseInt(tipo) == 0) {
        tipo = '';
    }
    var precio = $('#precioProducto').val() || '';
    var nombre = ($('#nombreUtensilio').val() || '').toUpperCase();
    console.log(tipo, precio, nombre);
    var contador = 0;
    $('#productList > div').each(function () {
        var utensilio = $(this);
        utensilio.hide();
        contador = contador + 1;
    });
    var contadorMostrar = contador;
    $('#productList > div').each(function () {
        var utensilio = $(this);
        var utensilioNombre = utensilio.data('nombre').toUpperCase();
        var utensilioPrecio = utensilio.data('precio');
        var utensilioTipo = utensilio.data('tipo').toUpperCase();

        console.log(utensilioNombre, utensilioPrecio, utensilioTipo);
        var matchNombre = nombre ? utensilioNombre.includes(nombre) : true;
        var matchPrecio = precio ? utensilioPrecio <= precio : true;
        var matchTipo = tipo ? utensilioTipo == tipo : true;

        if (matchNombre && matchPrecio && matchTipo) {
            utensilio.show();
            contadorMostrar = contadorMostrar - 1;
        }
    });
    if (contador == contadorMostrar) {
        $('#Existencias').show();
        $('#listaProductos').hide();
    }
}


function anadirAlCarro(element) {
    var $element = $(element);
    var msg = '';
    var nombre = $element.parent().data('nombre');
    var tipo = $element.parent().data('tipo');
    var precio = $element.parent().data('precio');
    var cantidad = $element.siblings('.cantidad').val();
    if (cantidad == "" || isNaN(parseInt(cantidad)) || parseInt(cantidad) <= 0) {
        msg += 'Debe ingresar una cantidad valida';
    }
    console.log(nombre, tipo, precio, cantidad);
    console.log(cantidad, '1');

    if (msg != '') {
        alert(msg);
        return;
    }

    $('#tablaProductos tbody').append(`
        <tr>
            <td>${nombre}</td>
            <td>${tipo}</td>
            <td>${precio}</td>
            <td><input type="number" onblur="actualizarPrecio();" value="${cantidad}" min="1"></td>
            <td><button class="btn" onclick="EliminarFila(this);"><i class="mdi mdi-trash-can-outline"></i></button></td>            
        </tr>
    `);
    actualizarPrecio();
    alert('Producto añadido al carro');
}

function EliminarFila(element) {
    var $element = $(element);
    $($element).closest('tr').remove();
    if ($('#tablaProductos tbody tr').length == 0) {
        $('#tablaProductos').hide();
        $('#valorTotal').hide();
        $('#existeProducto').show();
        $('#btnComprar').hide();
        
    } else {

        actualizarPrecio()
    }
}

function actualizarPrecio() {
    var total = 0;
    $('#tablaProductos tbody tr').each(function () {
        var precio = $(this).find('td').eq(2).text();
        var cantidad = $(this).find('td input').val();
        total += parseInt(precio) * parseInt(cantidad);
        $('#textoValor').text("Total a pagar: " + total.toString());
    });

}

function ComprarProductos() {
    alert("Compra realizada con exito");
    $('#modal-carro').modal('hide');
    $('#tablaProductos tbody tr').each(function () {
        $(this).closest('tr').remove();
    });
}



function IniciarSesion() {
    var msg = '';
    var contrasena = $('#password').val();
    var email = $('#email').val();
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (email === '' || contrasena === '') {
        msg = msg + '\nPor favor, rellene todos los campos.';
    }
    if (!regex.test(email)) {
        msg = msg + '\nPor favor, introduzca un correo electronici valido.';
    }
    
    if (msg != '') {
        alert(msg);
        return;
    }

    alert('Inicio de sesion exitoso');
    window.location.href = 'index.html';

}



function Registrarse() {
    var msg = '';
    var contrasena = $('#password').val();
    var contrasena2= $('#passwordConfirm').val();
    var email = $('#email').val();
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (email === '' || contrasena === '' || contrasena2 === '') {
        msg = msg + '\nPor favor, rellene todos los campos.';
    }
    if (!regex.test(email)) {
        msg = msg + '\nPor favor, introduzca un correo electronico valido.';
    }
    if (contrasena != contrasena2) {
        msg = msg + '\nLas contraseñas deben coincidir';
    }
    if ( $('#terms').is(':checked') == false) {
        msg = msg + '\nDebe aceptar los terminos y condiciones';
    }
    
    if (msg != '') {
        alert(msg);
        return;
    }

    alert('Registro exitoso');
    window.location.href = 'index.html';

}
