// variable donde se guarda la respuesta del servicio
let currentProductsArray = [];
// variables para usar los filtros
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_SOLD_COUNT = "Cant.";
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;


// se usa como referencia categories.js y se adapta para products.js

// cuando terminan de cargar los recursos de la pagina se dispara esta funcion - Primer evento

document.addEventListener("DOMContentLoaded", function(e){
    // se obtiene la variable local de la categoria seleccionada
    let categoryId = localStorage.getItem("catID");
    // Concateno las constantes de la URL con la categoria correspondiente - entrega 2
    let productURL = PRODUCTS_URL + categoryId + EXT_TYPE;
   // obtiene los productos de la url brindada en la letra
    getJSONData(productURL).then(function(resultObj){
        if (resultObj.status === "ok"){
            // si la llamada fue exitosa se asigna el resultado a la variable currentProductsArray
            currentProductsArray = resultObj.data.products;
            showProductsList();
        }
    });
    // Se obtiene el "a" agregado en index.html, quedando guardado en la variable emailNavBar - entrega 2
    let emailNavBar = document.getElementById("email");
    // Se busca el valor (email) guardado anteriormente en localStorage en login.js - entrega 2 
    let emailValor = window.localStorage.getItem("email");
    // Se asigna al valor que se muestra en pantalla del "a" el email previamente guardado - entrega 2
    emailNavBar.innerHTML = emailValor;
   

    // se agrega en el evento click de cada boton la llamada a la funcion que ordena y muestra los productos segun corresponda - entrega 2

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    // Se agrega el evento click al boton de filtrar por min y max de cantidad, asigno los valores ingresados a las variables minCount y maxCount y llamo a la funcion mostrar productos (showProductsList) - entrega 2

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });


});



function showProductsList(){

    // se crea una variable para ir escribiendo el html de la lista 
    let htmlContentToAppend = "";
    // se recorre la misma variable
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        // Se agrega if para validar si se asigno valor a minCount y maxCount, en el caso de que si, se pregunta uno a uno, si la cantidad vendida entra en el rango filtrado - entrega 2

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.soldCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.soldCount) <= maxCount))){

            // por cada producto se agrega un item de grupo a la lista html
            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                            <small class="text-muted"> ${product.soldCount} vendidos </small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </div>
            `
            }
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

// Se ordena el array de productos, segun el criterio elegido por el usario en base a los filtros establecidos previamente -  entrega 2

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

