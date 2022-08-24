function login() {
    // se agarra el valor del input de email
    let email = document.getElementById("email").value;  
    // se agarra el valor del input de password
    let password = document.getElementById("password").value;
    
    // se realiza validacion de los campos 

    if(email == "" || password == "") {
        Swal.fire({
            icon: 'error',
            text: 'Debe llenar todos los campos!'
           })
    } else {
        // se agrega variable de sesion para indicar que se logueo una persona
        window.sessionStorage.setItem("logueado", true);  
        // se guarda el email del usuario que logro ingresar - entrega 2
        window.localStorage.setItem("email", email);
        // se redirecciona a index.html (pagina principal del sitio)
        window.location.href = "index.html";
   }
}




