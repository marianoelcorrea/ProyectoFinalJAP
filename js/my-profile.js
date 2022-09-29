//Se agrega barra de navegacion 
document.addEventListener("DOMContentLoaded", function(e){

    let logueado = window.sessionStorage.getItem("logueado");
    // si la variable es null significa que nadie hizo login
    if(logueado == null) {
    // si nadie hizo login se direcciona a dicha pagina
        window.location = "login.html";
    } 
    
   let emailNavBar = document.getElementById("email");

   let emailValor = window.localStorage.getItem("email");

   emailNavBar.innerHTML = emailValor;
   
   //Se agrega evento click al boton cerrar sesion
   document.getElementById("cerrarSesion").addEventListener("click", function(){
    cerrarSesion();
});

    });
  
