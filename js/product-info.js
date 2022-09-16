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

    // siempre que levanto la pagina se buscan los comentarios de los productos

    let productCommentInfoURL = PRODUCT_INFO_COMMENTS_URL + productId + EXT_TYPE;
    
    getJSONData(productCommentInfoURL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            
            comentarios = resultObj.data;
            mostrarComentarios();
        }
    })
 
    let lista = localStorage.getItem("listaComentarios"); 

       if(lista == undefined) {
        lista = JSON.stringify(comentarios);
        localStorage.setItem("listaComentarios", lista);
        }

   /* comentarios = JSON.parse(lista); */
     //  console.log(comentarios);
     //   mostrarComentarios();
   /*
        document.getElementById("agregar").addEventListener("click", ()=>{
        agregar();
    }) */


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


    function puntuacion(puntos, ubicacion){
      puntuacionActual = puntos;

       let estrellas = escribirEstrellas(puntos);
      document.getElementById(ubicacion).innerHTML=estrellas;
    };

    function escribirEstrellas(puntos)
    {
      let estrellas= '';
      for(let i = 1; i <= 5; i++) {
        if(i<=puntos){
          
            estrellas += `<i class="fa fa-star checked"></i>`; 
        } else {estrellas += `<i class="far fa-star"></i>`; 

        }
      }
      return estrellas;
    }

    document.getElementById("puntaje").addEventListener('change', function(){
        puntuacion(document.getElementById('puntaje').value, "calif");

    })


let comentarios = [];

function agregar(){

    let nuevoComentario = obtenerComentario();
    
    comentarios.push(nuevoComentario);
    localStorage.setItem("datos", JSON.stringify(comentarios));
    mostrarComentarios();
}

function obtenerComentario() {

  let comentario = {
    user:"", 
    dateTime: "",
    score: 0,
    description:"",
    product: 0
  };

  let usuario = localStorage.getItem("email");
  comentario.user = usuario;

  let fechaHora = new Date();
  let fechaString = fechaHora.getFullYear() + "-" + fechaHora.getMonth() + "-" + fechaHora.getDay() + " " + 
  fechaHora.getHours() + ":" + fechaHora.getMinutes() + ":" + fechaHora.getSeconds();
  //comentario.dateTime = fechaString;
  comentario.dateTime = fechaHora;
 
  comentario.score = puntuacionActual;

  comentario.description = document.getElementById("comentariostxt").value;
  document.getElementById("comentariostxt").value = "";
  return comentario;
}


function mostrarComentarios(){
  console.log(comentarios);
    let comentariosHtml ="";    

    for(let coment of comentarios){
      
      let idCalificacion = "calif" + coment.user + coment.dateTime;

      comentariosHtml +=  `<li class="list-group-item">
        <div class="row justify-content-start">
        <p class="col-2">${coment.user} - ${coment.dateTime} - </p> <span class="col-2" id="${idCalificacion}">`;
        
      comentariosHtml += escribirEstrellas(coment.score);
      comentariosHtml +=`</span>
        <div class="row">${coment.description}</div>
      </div>
     </li>`;
    }
  
    document.getElementById("contenedor").innerHTML = comentariosHtml;
  }




