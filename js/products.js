// variable donde se guarda la respuesta del servicio
let currentProductsArray = [];
// variables para usar los filtros
const ORDER_ASC_BY_COST = "ASC";
const ORDER_DESC_BY_COST = "DESC";
const ORDER_BY_SOLD_COUNT = "Vendidos";
let currentSortCriteria = undefined;
let minCost = undefined;
let maxCost = undefined;


// se usa como referencia categories.js y se adapta para products.js

// cuando terminan de cargar los recursos de la pagina se dispara esta funcion - Primer evento

document.addEventListener("DOMContentLoaded", function(e){
     
    let logueado = window.sessionStorage.getItem("logueado");
    // si la variable es null significa que nadie hizo login
    if(logueado == null) {
    // si nadie hizo login se direcciona a dicha pagina
        window.location = "login.html";
    }

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

    //Se agrega evento click al boton cerrar sesion
   document.getElementById("cerrarSesion").addEventListener("click", function(){
    cerrarSesion();
});

    // Se obtiene el "a" agregado en index.html, quedando guardado en la variable emailNavBar - entrega 2
    let emailNavBar = document.getElementById("email");
    // Se busca el valor (email) guardado anteriormente en localStorage en login.js - entrega 2 
    let emailValor = window.localStorage.getItem("email");
    // Se asigna al valor que se muestra en pantalla del "a" el email previamente guardado - entrega 2
    emailNavBar.innerHTML = emailValor;
   

    // se agrega en el evento click de cada boton la llamada a la funcion que ordena y muestra los productos segun corresponda - entrega 2

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortBySoldCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("searchButton").addEventListener("click", function(){
        showProductsList();
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });

    // Se agrega el evento click al boton de filtrar por min y max, asigno los valores ingresados a las variables minCost y maxCost y llamo a la funcion mostrar productos (showProductsList) - entrega 2

    document.getElementById("rangeFilterCost").addEventListener("click", function(){
        
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showProductsList();
    });


});



function showProductsList(){

    // se crea una variable para ir escribiendo el html de la lista 
    let htmlContentToAppend = "";
    // se recorre la misma variable
    for(let i = 0; i < currentProductsArray.length; i++){    // product.images.length
        let product = currentProductsArray[i];  // sustituyo por product.images

        // Se agrega if para validar si se asigno valor a minCost y maxCost, en el caso de que si, se pregunta uno a uno, si la cantidad vendida entra en el rango filtrado - entrega 2

        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))){
                
                // Se guarda en la variable lo que el usuario ingresa en el buscador DESAFIATE
                let textoUsuario = document.getElementById("texto").value;
                // Se agrega un if para validar si lo que el usuario ingreso en el buscador esta en el nombre del producto o en la descripcion
                if(product.name.toUpperCase().includes(textoUsuario.toUpperCase()) || product.description.toUpperCase().includes(textoUsuario.toUpperCase())){

            // por cada producto se agrega un item de grupo a la lista html
            htmlContentToAppend += `
            <div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action cursor-active">
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
            }}
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

// Se ordena el array de productos, segun el criterio elegido por el usario en base a los filtros establecidos previamente -  entrega 2

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)

    // Uso el sort para ordenar la lista, compara a y b - entrega 2 (pasar a block de notas)
    { 
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
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


// Con esta funcion se guarda en localStorage y se redirige a product-info.html  - entrega 3 paso 1 ej1
function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}