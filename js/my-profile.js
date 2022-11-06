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
  
    (function () {
        'use strict'
      
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')
      
        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
          .forEach(function (form) {
            form.addEventListener('submit', function (event) {
              if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
              }
      
              form.classList.add('was-validated')
            }, false)
          })
      })()
 