// Se crea variable para guardar la URL para llamar al servicio entrega 5
let cartURL = CART_INFO_URL + USER_ID + EXT_TYPE;
// Se guarda en variable la informacion del carrito entrega 5
let cartInfo;   
    
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
});
   

// entrega 5 ejercicio 1

function mostrarCarrito() {

    let carritoHtml ="";   
    

    for(let producto of cartInfo.articles){
  
        carritoHtml += `

     
                                 <tr>
                                    <td><img src="${producto.image}" class="img-cart"></td>
                                    <td><b>${producto.name}</b></td>
                                    <td>
                                    <div class="row">
                                        <input class="col-3" type="text" onkeyup="cantidadModificada(${producto.id})" id="cantidad_${producto.id}" value="${producto.count}">
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

// entrega 5
function calcularTotales() {
    
    // Se transforma el arreglo de articulos a uno de subtotales
    let subTotales = cartInfo.articles.map(x => x.unitCost * x.count);
    // Se suman todos los subtotales
    let total = subTotales.reduce((a, b) => a + b, 0);
    // Se agarra como referencia el primer art para sacar la moneda
    let primerArticulo = cartInfo.articles[0];

    document.getElementById("totalCompras").innerHTML = primerArticulo.currency + " " + total;
    document.getElementById("total").innerHTML = primerArticulo.currency + " " + total;
}






