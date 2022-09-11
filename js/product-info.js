// Se obtiene el "a" agregado en index.html, quedando guardado en la variable emailNavBar - entrega 2
let emailNavBar = document.getElementById("email");
// Se busca el valor (email) guardado anteriormente en localStorage en login.js - entrega 2 
let emailValor = window.localStorage.getItem("email");
// Se asigna al valor que se muestra en pantalla del "a" el email previamente guardado - entrega 2
emailNavBar.innerHTML = emailValor;
// variable donde se guarda la puntuacion actual seleccionada entrega 3 
let puntuacionActual = 0;

// cuando terminan de cargar los recursos de la pagina se dispara esta funcion - Primer evento -  entrega 3  ej1
let productInfo = null;

document.addEventListener("DOMContentLoaded", function (e) {
    // se obtiene la variable local de la categoria seleccionada
    let productId = localStorage.getItem("prodID");
    // Concateno las constantes de la URL con la variable correspondiente - entrega 3
    let productInfoURL = PRODUCT_INFO_URL + productId + EXT_TYPE;
    // obtiene los productos de la url brindada en la letra
    getJSONData(productInfoURL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            // si la llamada fue exitosa se asigna el resultado a la variable currentProduct
            productInfo = resultObj.data;
            showProductInfo();
        }
    })
});


// Funcion que nos permite mostrar los productos que estan en product-info.html - entrega 3 ej2

function showProductInfo() {

     // se crea una variable para ir escribiendo el html de la lista 
     let htmlContentToAppend = "";

    htmlContentToAppend += ` 
                <div>
                <h2> ${productInfo.name} </h2>
                <p><b>Precio</b></p>
                <p small>${productInfo.currency}${productInfo.cost}</p>
                <p><b>Descripción</b></p>
                <p small>${productInfo.description}</p>
                <p><b>Categoria</b></p>
                <p small>${productInfo.category}</p>
                <p><b>Cantidad de vendidos</b></p>
                <p small> ${productInfo.soldCount} </p>
                <p><b>Imagenes ilustrativas</b></p>
                </div>
                <div class="row"> 
    `
    //Lo uso para recorrer las imagenes
    for (let i = 0; i < productInfo.images.length; i++) {
        // guardo en otra variable cada imagen que estoy recorriendo
        let image = productInfo.images[i];

        // por cada producto se agrega un item de grupo a la lista html

        htmlContentToAppend += `

                        <div class="col-3" >
                          <img src="${image}" alt="${productInfo.description}" class="img-thumbnail" >
                        </div>   
                    
                `
    }
    htmlContentToAppend += ` </div> `;

    // Con esta funcion agarro un elemento del html por su ID, en este caso es un div, y modifico el texto que se muestra dentro del mismo en el html   - entrega 3 ej 2
    document.getElementById("prod-info-container").innerHTML = htmlContentToAppend;

}

  // Funcion que permite realizar la puntuacion mendiante asignacion de estrelas  - entrega 3 ej3


    function puntuacion(puntos){
      puntuacionActual = puntos;

        let estrellas= '';
      for(let i = 1; i <= 5; i++) {
        if(i<=puntos){
          
            estrellas += `<i class="fa fa-star checked"></i>`; 
        } else {estrellas += `<i class="far fa-star"></i>`; 

        }
      }
      document.getElementById("calif").innerHTML=estrellas;
    };

    document.getElementById("puntaje").addEventListener('change', function(){
        puntuacion(document.getElementById('puntaje').value);

    })


let cometarios = [];

function agregar(){

    let item = document.getElementById("item");
    let nuevoComentario = obtenerComentario();

    comentarios.push(item.value);
    localStorage.setItem("datos", JSON.stringify(comentarios));
    item.value= ""; //para borrar lo del input
    mostrarItem(comentarios);
}

function obtenerComentario() {

  let comentario = {
    usuario:"", 
    fechaHora: "",
    puntuacion: 0,
    texto:""
  };

  let usuario = localStorage.getItem("email");
  comentario.usuario = usuario;

  let fechaHora = new Date();
  let fechaString = fechaHora.getFullYear() + "-" + fechaHora.getMonth() + "-" + fechaHora.getDay() + " " + 
  fechaHora.getHours() + ":" + fechaHora.getMinutes() + ":" + fechaHora.getSeconds();
  comentario.fechaHora = fechaString;
 
  comentario.puntuacion = puntuacionActual;

  comentario.texto = document.getElementById("comentariostxt").innerHTML;
  return comentario;
}


function mostrarItem(array){
    let items ="";
    for(let item of array){
        items += '<li class="list-group-item">'+ item + '</li>'
    }
    document.getElementById("contenedor").innerHTML = items;
}
function limpiar(){
    lista.splice(0, lista.length);
    mostrarItem(lista);
    localStorage.removeItem("datos");
}

document.addEventListener("DOMContentLoaded", ()=>{
    lista = JSON.parse(localStorage.getItem("datos"));
    if(lista != null){
        mostrarItem(lista);
    }else{
        lista = [];
    }
        document.getElementById("agregar").addEventListener("click", ()=>{
        agregar();
    })
    document.getElementById("limpiar").addEventListener("click", ()=>{
        limpiar();
    })
})
