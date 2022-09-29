document.addEventListener("DOMContentLoaded", function(){
    
    // se busca la variable de sesion que indica si alguien hizo login 
    let logueado = window.sessionStorage.getItem("logueado");
    // si la variable es null significa que nadie hizo login
    if(logueado == null) {
    // si nadie hizo login se direcciona a dicha pagina
        window.location = "login.html";
    } 

    //Se agrega evento click al boton cerrar sesion entrega 4  ej 2
   document.getElementById("cerrarSesion").addEventListener("click", function(){
    cerrarSesion();
});

    // Se obtiene el "a" agregado en index.html, quedando guardado en la variable emailNavBar - entrega 2
    let emailNavBar = document.getElementById("email");
    // Se busca el valor (email) guardado anteriormente en localStorage en login.js - entrega 2 
    let emailValor = window.localStorage.getItem("email");
    // Se asigna al valor que se muestra en pantalla del "a" el email previamente guardado - entrega 2
    emailNavBar.innerHTML = emailValor;

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});


