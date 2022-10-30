// Se crea variable para guardar la URL para llamar al servicio entrega 5
let cartURL = CART_INFO_URL + USER_ID + EXT_TYPE;
// Se guarda en variable la informacion del carrito entrega 5
let cartInfo;   
//Al seleccionar el radioButtons se modifica esta variable y despues se utiliza en calcularTotales - entrega 6 ejercicio 1 
let porcentajeEnvioActual = 0;

    
document.addEventListener("DOMContentLoaded", function(e){
    //Entrega 4 ej 2
    let logueado = window.sessionStorage.getItem("logueado");
    // si la variable es null significa que nadie hizo login
    if(logueado == null) {
    // si nadie hizo login se direcciona a dicha pagina
        window.location = "login.html";
    }
    //entrega 5 ej 1 - Se llama al servicio con la informacion del carrito
    getJSONData(cartURL).then(function (resultObj) {

        if (resultObj.status === "ok") {
             cartInfo = resultObj.data;   

              let cartInfoString = JSON.stringify(cartInfo);
              //Se guarda el string en el localStorage
              localStorage.setItem("carrito_" + USER_ID, cartInfoString); 
              mostrarCarrito();  
              calcularTotales(); 
        }
    })

    let emailNavBar = document.getElementById("email");
 
    let emailValor = window.localStorage.getItem("email");
 
    emailNavBar.innerHTML = emailValor;

    //Se agrega evento click al boton cerrar sesion
   document.getElementById("cerrarSesion").addEventListener("click", function(){
    cerrarSesion();

 });


 // entrega 6 ejercicio 1 - Agrego evento click para seleccionar el envio
 let radioButtons = document.getElementsByClassName("radio");

 for(let button of radioButtons) {
    
    button.addEventListener("click", function(){
        porcentajeEnvioActual = button.value;
        calcularTotales();
    }
 )}
 
 // entrega 6 ej 2 - Al seleccionar tarjeta o transferencia se agrega el evento para desahbilitar el que no fue seleccionado
 document.getElementById("rbTarjeta").addEventListener("change", function() {seleccionarMetodoDePago("tarjeta")});
 document.getElementById("rbTransferencia").addEventListener("change", function() {seleccionarMetodoDePago("transferencia")});
 

});
   

// entrega 5 ejercicio 1

// Validacion de cantidades - entrega 6 ej 3

function mostrarCarrito() {

    let carritoHtml ="";   
    

    for(let producto of cartInfo.articles){
  
        carritoHtml += `

     
                                 <tr>
                                    <td><img src="${producto.image}" class="img-cart"></td>
                                    <td><b>${producto.name}</b></td>
                                    <td>
                                    <div class="row">
                                        <input class="col-3" type="number" min="1" onchange="cantidadModificada(${producto.id})" id="cantidad_${producto.id}" value="${producto.count}" required>
                                        <div class="invalid-feedback">
                                        La cantidad ingresada debe ser mayor a cero.
                                      </div>
                                      </div>
                                    </td>
                                    <td>${producto.currency} ${producto.unitCost}</td>
                                    <td id="subTotal_${producto.id}">${producto.currency} ${producto.unitCost*producto.count}</td>
                                </tr> `
    }

    
    // Se agrega toda la informacion a mostrar en el html 
    document.getElementById("contenedor").innerHTML = carritoHtml;
}

// entrega 5 ej 3
function cantidadModificada(productoID) {
    
    // Se busca en el arreglo de articulos el que tenga el ID del que se modifico la cantidad
    let articulo = cartInfo.articles.find(x => x.id == productoID);
    let cantidad = document.getElementById("cantidad_" + productoID).value;
    let subTotal = document.getElementById("subTotal_" + productoID);
    articulo.count = cantidad;

    subTotal.innerHTML = articulo.currency + " " + cantidad*articulo.unitCost;
    calcularTotales();

}

// entrega 5 -- la modifique para la entrega 6 ya que me quedaba mas facil hacer la parte de la moneda con un for
function calcularTotalCompras(){
    
    let total2 = 0;

    for (let a of cartInfo.articles) {
        
        if(a.currency == "UYU") {
            a.unitCost = a.unitCost/40;
        } 
        total2 += a.unitCost * a.count;
    }

    document.getElementById("totalCompras").innerHTML = "USD " + total2;
    return total2;
    
}

//entrega 6 ej 1

function calcularEnvios(){
  let totalCompras = calcularTotalCompras();
  let envio =  totalCompras*porcentajeEnvioActual/100;
  document.getElementById("totalEnvios").innerHTML = "USD " + envio;
  return envio;
}

function calcularTotales(){
  
 let totalCompras = calcularTotalCompras();
 let envio = calcularEnvios();
 let total = totalCompras + envio;


 document.getElementById("total").innerHTML = "USD " + total;
 return totalCompras + envio;

}

// entrega 6 ej 2

function seleccionarMetodoDePago(metodoDePago) {

    let span = document.getElementById("spMedioPago");
    
    if(metodoDePago == "tarjeta"){
        document.getElementById("txtCuenta").disabled = true;
        document.getElementById("txtTarjeta").disabled = false;
        document.getElementById("txtFecha").disabled = false;
        document.getElementById("txtCodigo").disabled = false;
        span.innerHTML = "Tarjeta de débito/crédito";

    } else {
        document.getElementById("txtTarjeta").disabled = true;
        document.getElementById("txtFecha").disabled = true;
        document.getElementById("txtCodigo").disabled = true;
        document.getElementById("txtCuenta").disabled = false;
        span.innerHTML = "Transferencia bancaria";
    }
}


// entrega 6  ej 3 - Funcion que se agrega para personalizar la validacion del formulario

(function () {
    'use strict'
  
    
    let forms = document.querySelectorAll('.needs-validation')
  
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            validarPagos();
          
          }
          // Se agrega este else para que se muestre el mensaje de compra exitosa y luego recien borra el form
          else{
            event.preventDefault();
            showAlertSuccess();
            
            
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

 // entrega 6  ej 3 - Funcion que busca campos y valida si estan vacios o no

  function validarPagos(){
    
    let rbTarjeta= document.getElementById("rbTarjeta"); 
    let rbTransferencia = document.getElementById("rbTransferencia"); 

     if(rbTarjeta.checked) {
        let txtTarjeta = document.getElementById("txtTarjeta"); 
        let txtFecha = document.getElementById("txtFecha"); 
        let txtCodigo = document.getElementById("txtCodigo");
        
        if(txtTarjeta.value == "" || txtFecha.value == "" || txtCodigo.value == ""){
            document.getElementById("medioDePagoValidacion").innerHTML="Debe seleccionar un metodo de pago";
        }

     } else if (rbTransferencia.checked) {
        let txtCuenta = document.getElementById("txtCuenta"); 
        
        if(txtCuenta.value == ""){
            document.getElementById("medioDePagoValidacion").innerHTML="Debe seleccionar un metodo de pago";
            
        }
     } else {
        document.getElementById("medioDePagoValidacion").innerHTML="Debe seleccionar un metodo de pago";
        
     }

  }


//entrega 6 eje 3 Funciones que muestran y esconden mensaje de alerta

function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}


function hideAlertSuccess() {
    document.getElementById("alert-success").classList.remove("show");
    document.getElementById("formulario").submit();
}










