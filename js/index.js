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
    // Se busca la nueva variable usuario que se guardar en el localStorage - entrega 6 - ej 2
    let usuarioString = window.localStorage.getItem("usuario");
    let usuario = JSON.parse(usuarioString);
 
    emailNavBar.innerHTML = usuario.email;
    
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


