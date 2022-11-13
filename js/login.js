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
       // Busco si existe la lista de usuarios en el local storage - entrega 7 ej 3
        let listaUsuariosString = window.localStorage.getItem("listaUsuarios");
        // Se convierte de string del local storage a un array - entrega 7 ej 
        let listaUsuarios = JSON.parse(listaUsuariosString);
        // Si es nulo se crea el array con la lista de usuarios - entrega 7 ej 3
            if(listaUsuarios == null){
                listaUsuarios = new Array ();
            }
        // Se busca si existe un usuario con el correo dentro de la lista - entrega 7 ej 3 
        let usuario = listaUsuarios.find(x => x.email == email);
            if(usuario == null){
        //Se crea el objeto para guardar en el local storage los datos del usuario - entrega 7 ej 3
        usuario = {nombre: "", 
        segundoNombre: "", 
        apellido: "", 
        segundoApellido: "", 
        email: email, 
        telefono: "", 
        imgPerfil: ""};
        // Se agrega un usuario a la lista de usuarios - entrega 7 ej 3
        listaUsuarios.push(usuario);
            }
        // Se guarda el usuario que se logueo como usuario actual en el local storage - entrega 7 ej 3
        let usuarioString = JSON.stringify(usuario);
        window.localStorage.setItem("usuario", usuarioString);
        // Se actualiza la lista de usuarios en el local storage - entrega 7 ej 3
        window.localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));
        
        // se redirecciona a index.html (pagina principal del sitio)
        window.location.href = "index.html";
   }
}






