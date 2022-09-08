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
        fgfht = resultObj.data;
            console.log(productInfo)
        }
    })});


    // Funcion que nos permite mostrar los productos que estan en product-info.html

    function showProductInfo(){

        // se crea una variable para ir escribiendo el html de la lista 
        let htmlContentToAppend = "";

        for(let i = 0; i < product.images.length; i++){    // product.images.length
            let product = product.images[i];  // sustituyo por product.images
       
                // por cada producto se agrega un item de grupo a la lista html
                
                htmlContentToAppend += `
                <div onclick="setProdID(${productInfo.id})" class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img src="${productInfo.image}" alt="${productInfo.description}" class="img-thumbnail">
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

            document.getElementById("prod-info-container").innerHTML = htmlContentToAppend;
            
    }