// variable donde se guarda la respuesta del servicio
let currentProductsArray = [];

// se usa como referencia categories.js y se adapta para products.js

// cuando terminan de cargar los recursos de la pagina se dispara esta funcion - Primer evento

document.addEventListener("DOMContentLoaded", function(e){
    // se obtiene la variable local de la categoria seleccionada
    let categoryId = localStorage.getItem("catID");
    // Concateno las constantes de la URL con la categoria correspondiente
    let productURL = PRODUCTS_URL + categoryId + EXT_TYPE;
   // obtiene los productos de la url brindada en la letra
    getJSONData(productURL).then(function(resultObj){
        if (resultObj.status === "ok"){
            // si la llamada fue exitosa se asigna el resultado a la variable currentProductsArray
            currentProductsArray = resultObj.data.products;
            showProductsList();
        }
    });
   
});

// NO OLVIDARME DE DEJAR EL USUARIO FIJO EN TODAS LAS BARRAS DE NAVEGACION

function showProductsList(){

    // se crea una variable para ir escribiendo el html de la lista 
    let htmlContentToAppend = "";
    // se recorre la misma variable
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];
            // por cada producto se agrega un item de grupo a la lista html
            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name}</h4>
                            <small class="text-muted">${product.cost} ${product.currency}</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </div>
            `
        
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

