//Se agrega barra de navegacion 
document.addEventListener("DOMContentLoaded", function(e){

    let logueado = window.sessionStorage.getItem("logueado");
    // si la variable es null significa que nadie hizo login
    if(logueado == null) {
    // si nadie hizo login se direcciona a dicha pagina
        window.location = "login.html";
    } 
    
   let emailNavBar = document.getElementById("email");

   // Se busca la nueva variable usuario que se guardar en el localStorage - entrega 7 - ej 2
   let usuarioString = window.localStorage.getItem("usuario");
   let usuario = JSON.parse(usuarioString);
   llenarCamposForm(usuario);
   emailNavBar.innerHTML = usuario.email;
   
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
              } else {
                // Se llama a la funcion cuando las validaciones estan ok
                submitForm(); 
              }
      
              form.classList.add('was-validated')
            }, false)
          })
      })()

// Funcion que agarra los campos y le asigna los valores -  entrega 7
function llenarCamposForm(usuario){

  document.getElementById("nombre").value = usuario.nombre;
  document.getElementById("segundoNombre").value = usuario.segundoNombre;
  document.getElementById("apellido").value = usuario.apellido;
  document.getElementById("segundoApellido").value = usuario.segundoApellido;
  document.getElementById("emailForm").value = usuario.email;
  document.getElementById("telefono").value = usuario.telefono;

}

//Funcion que guarda los campos en el local storage - entrega 7
function submitForm(){
   // Se agarra el usuario del local storage
   let usuarioString = window.localStorage.getItem("usuario");
   let usuario = JSON.parse(usuarioString);
  
   // Se asignan los campos nuevos al usuario del local storage
   usuario.nombre = document.getElementById("nombre").value;
   usuario.segundoNombre = document.getElementById("segundoNombre").value;
   usuario.apellido = document.getElementById("apellido").value;
   usuario.segundoApellido = document.getElementById("segundoApellido").value;
   usuario.email = document.getElementById("emailForm").value;
   usuario.telefono = document.getElementById("telefono").value;
   
   // Obtengo la lisa de usuarios del LS
   let listaUsuariosString = window.localStorage.getItem("listaUsuarios");
  
  let listaUsuarios = JSON.parse(listaUsuariosString);
  
  // Se obtiene el indice del usuario a modificar
  let usuarioIndex = listaUsuarios.findIndex(x => x.email == usuario.email);
  listaUsuarios[usuarioIndex] = usuario;
  
  // Se actualizan en el LS los datos de usario y de la lista de usuarios
  localStorage.setItem("usuario", JSON.stringify(usuario));
  window.localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));
}
 

function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  var dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}