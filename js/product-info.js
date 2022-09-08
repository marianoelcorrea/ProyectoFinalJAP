// Se obtiene el "a" agregado en index.html, quedando guardado en la variable emailNavBar - entrega 2
let emailNavBar = document.getElementById("email");
// Se busca el valor (email) guardado anteriormente en localStorage en login.js - entrega 2 
let emailValor = window.localStorage.getItem("email");
// Se asigna al valor que se muestra en pantalla del "a" el email previamente guardado - entrega 2
emailNavBar.innerHTML = emailValor;


// cuando terminan de cargar los recursos de la pagina se dispara esta funcion - Primer evento -  entrega 3  ej1
let productInfo = null;

document.addEventListener("DOMContentLoaded", function(e){
    // se obtiene la variable local de la categoria seleccionada
    let productId = localStorage.getItem("prodID");
    // Concateno las constantes de la URL con la variable correspondiente - entrega 3
    let productInfoURL = PRODUCT_INFO_URL + productId + EXT_TYPE;
   // obtiene los productos de la url brindada en la letra
    getJSONData(productInfoURL).then(function(resultObj){
        if (resultObj.status === "ok"){
            // si la llamada fue exitosa se asigna el resultado a la variable currentProduct
        productInfo = resultObj.data;
        showProductInfo();  
        }
    })});


    // Funcion que nos permite mostrar los productos que estan en product-info.html

    function showProductInfo(){

        // se crea una variable para ir escribiendo el html de la lista 
        let htmlContentToAppend = "";
        //Lo uso para recorrer las imagenes
        for(let i = 0; i < productInfo.images.length; i++){    
            // guardo en otra variable cada imagen que estoy recorriendo
            let image = productInfo.images[i];  
       
                // por cada producto se agrega un item de grupo a la lista html
                
                htmlContentToAppend += `
                <div onclick="setProdID(${productInfo.id})" class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img src="${image}" alt="${productInfo.description}" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${productInfo.name} - ${productInfo.currency} ${productInfo.cost}</h4>
                                <small class="text-muted"> ${productInfo.soldCount} vendidos </small>
                            </div>
                            <p class="mb-1">${productInfo.description}</p>
                        </div>
                    </div>
                </div>
                `
        }
            // Con esta funcion agarro un elemento del html por su ID, en este caso es un div, y modifico el texto que se muestra dentro del mismo en el html
            document.getElementById("prod-info-container").innerHTML = htmlContentToAppend;
            
    }