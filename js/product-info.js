// Se obtiene el "a" agregado en index.html, quedando guardado en la variable emailNavBar - entrega 2
let emailNavBar = document.getElementById("email");
// Se busca el valor (email) guardado anteriormente en localStorage en login.js - entrega 2 
let emailValor = window.localStorage.getItem("email");
// Se asigna al valor que se muestra en pantalla del "a" el email previamente guardado - entrega 2
emailNavBar.innerHTML = emailValor;
// variable donde se guarda la puntuacion actual seleccionada entrega 3 ej 3
let puntuacionActual = 1;
// variable creada para identificar la lista guardada en el localStorage
let productId = 0;
// Se crea arreglo vacio de comentarios
let comentarios = [];
let productInfo = null;

// cuando terminan de cargar los recursos de la pagina se dispara esta funcion - Primer evento, para todas las entregas 

document.addEventListener("DOMContentLoaded", function (e) {
    // se obtiene la variable local de la categoria seleccionada
    productId = localStorage.getItem("prodID");
    // Concateno las constantes de la URL con el productID seleccionado - entrega 3 paso 2 ej 1
    let productInfoURL = PRODUCT_INFO_URL + productId + EXT_TYPE;
    // obtiene los productos de la url brindada en la letra
    getJSONData(productInfoURL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            // si la llamada fue exitosa se asigna el resultado a la variable currentProduct
            productInfo = resultObj.data;
            //Se muestran los detalles de cada producto - entrega 3 ej2 
            showProductInfo();
        }
    })
    
    // Se crea variable para llamar a la lista de comentarios del localStorage, se concateno el productID para separar listas segun producto - entrega 3 ej 3
    let lista = localStorage.getItem("listaComentarios_" + productId); 
   
    // Si la lista no esta definida, llama al servicio de comentarios y la crea - entrega 3  ej 3
    if(lista == undefined) {

      let productCommentInfoURL = PRODUCT_INFO_COMMENTS_URL + productId + EXT_TYPE;
    
      getJSONData(productCommentInfoURL).then(function (resultObj) {
          if (resultObj.status === "ok") {
              
             // Se guarda el resultado del servicio en la variable comentarios que es una lista de objetos
              comentarios = resultObj.data;
              // Se pasa a string para poder guardar en el localStorage
              lista = JSON.stringify(comentarios);
              //Se guarda el string en el localStorage
              localStorage.setItem("listaComentarios_" + productId, lista); 
              mostrarComentarios(); 
          }
      })
     } else {
      mostrarComentarios();
     }
     
     //Se agrega evento click a la funcion enviar - entrega 3 ej 4
     document.getElementById("enviar").addEventListener("click", ()=>{
      enviar();
  })
    
});

//Funcion que es llamada al hacer click en el boton enviar - entrega 3 - ej 4
function enviar(){
  // Se obtiene el comentario y se guarda en una variable 
  let nuevoComentario = obtenerComentario();
  
  // Se agrega un nuevo comentario al array de comentarios
  comentarios.push(nuevoComentario);
  // Se guarda comentarios en el localStorage
  localStorage.setItem("listaComentarios_" + productId, JSON.stringify(comentarios));

  mostrarComentarios();
}
//Funcion creada para obtener comentario - entrega 3  ej 4
function obtenerComentario() {
  // Se crea un objeto de comentario vacio
  let comentario = {
    user:"", 
    dateTime: "",
    score: 0,
    description:"",
    product: 0
  };
  
  // Se agarra el email guardado en el localStorage al hacer login
  let usuario = localStorage.getItem("email");
  // Se le asigna el valor del usuario al comentario
  comentario.user = usuario;
  // Crea una fecha con tiempo y hora actual
  let fechaHora = new Date();
  // Se crea variable para sumarle 1 al mes asi se visualiza el mes actual
  let mes = fechaHora.getMonth()+1;
  // Se le da el formato deseado a la fecha y hora
  let fechaString = fechaHora.getFullYear() + "-" + estiloFecha(mes) + "-" + estiloFecha(fechaHora.getDate()) + " " + 
  estiloFecha(fechaHora.getHours()) + ":" + estiloFecha(fechaHora.getMinutes()) + ":" + estiloFecha(fechaHora.getSeconds());
  // Se le asigna el valor de fecha y hora al comentario
  comentario.dateTime = fechaString;
  // Se agarra el prodID guardado en el localStorage y se le aasgina al producto del comentario
  comentario.product = localStorage.getItem("prodID");
  // Se le asigna la puntuacion al comentario
  comentario.score = puntuacionActual;
  // Se agarra el texto donde se escribió el comentario y se le asigna a la descripcion 
  comentario.description = document.getElementById("comentariostxt").value;
  document.getElementById("comentariostxt").value = "";
  return comentario;
}
// Funcion que agrega un 0 en la fecha y hora en caso de tener solo un digito
function estiloFecha(valor) {
  valor=valor+"";
  if(valor.length == 1){  
    return "0" + valor;
  }
  return valor;
}



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
    //Se agrega el for para recorrer las imagenes
    for (let i = 0; i < productInfo.images.length; i++) {
        // guardo en otra variable cada imagen que estoy recorriendo
        let image = productInfo.images[i];

        // por cada imagen se agrega un div a la lista html

        htmlContentToAppend += `

                        <div class="col-3" >
                          <img src="${image}" alt="${productInfo.description}" class="img-thumbnail" >
                        </div>   
                `
    }
    // Div de cierre del div class row que se usa para que queden alineadas las imagenes
    htmlContentToAppend += ` </div> `;

    // Con esta funcion agarro un elemento del html por su ID, en este caso es un div, y modifico el contenido que se muestra dentro del mismo en el html   - entrega 3 ej 2
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

// Funcion creada para mostrar comentarios - ENTREGA 3 EJ 4
function mostrarComentarios(){
    
  // Se trae lista de comentarios del localStorage 
    let lista = localStorage.getItem("listaComentarios_" + productId); 
    comentarios = JSON.parse(lista);
    
    // Se crea variable para poder esccribir en el html
    let comentariosHtml ="";    
    
    // Se recorre la lista de comentarios
    for(let coment of comentarios){
      
      // Se va escribiendo en html los datos del comentario con el formato deseado
      comentariosHtml +=  `<li class="list-group-item">
        <div class="row justify-content-start">
        <span class="col-6"> <b>${coment.user}</b> - ${coment.dateTime} - `;
      // Se llama a la funcion escribirEscribir para agregar la puntuacion a cada comentario
      comentariosHtml += escribirEstrellas(coment.score);
      comentariosHtml +=`</span>
        <div>${coment.description}</div>
      </div>
     </li>`;
    }
    
    // Se agrega toda la informacion a mostrar en el html 
    document.getElementById("contenedor").innerHTML = comentariosHtml;
  }

