//Se agrega barra de navegacion 
document.addEventListener("DOMContentLoaded", function(e){

    let logueado = window.sessionStorage.getItem("logueado");
    // si la variable es null significa que nadie hizo login
    if(logueado == null) {
    // si nadie hizo login se direcciona a dicha pagina
        window.location = "login.html";
    } 
    
   let emailNavBar = document.getElementById("email");

   // Se busca la nueva variable usuario que se guardar en el localStorage y se asgina al campo email que se muestra en la barra de navegacion la propiedad email - entrega 7 - ej 1
   let usuarioString = window.localStorage.getItem("usuario");
   let usuario = JSON.parse(usuarioString);
   emailNavBar.innerHTML = usuario.email;
   // Cuando se carga la pagina se llama esta funcion que carga los campos del form - entrega 7  ej 2
   llenarCamposForm(usuario);
   
   //Se agrega evento click al boton cerrar sesion
   document.getElementById("cerrarSesion").addEventListener("click", function(){
    cerrarSesion();
});

    });
  // Funcion para las validaciones del form -  entrega 7  ej 1
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
                // Se llama a la funcion cuando las validaciones estan ok - entrega 7 ej 1
                submitForm(); 
              }
      
              form.classList.add('was-validated')
            }, false)
          })
      })()

// Funcion que agarra los campos y le asigna los valores -  entrega 7 ej 1
function llenarCamposForm(usuario){

  document.getElementById("nombre").value = usuario.nombre;
  document.getElementById("segundoNombre").value = usuario.segundoNombre;
  document.getElementById("apellido").value = usuario.apellido;
  document.getElementById("segundoApellido").value = usuario.segundoApellido;
  document.getElementById("emailForm").value = usuario.email;
  document.getElementById("telefono").value = usuario.telefono;
  document.getElementById("fotoPerfil").src = usuario.imgPerfil;
  var image = new Image();
  image.src = usuario.imgPerfil;
  document.body.appendChild(image);

} 

//Funcion que guarda los campos en el local storage - entrega 7 - ej 3
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
   // deasfiate 7
   let foto = document.getElementById("fotoPerfil");
   // Se asigna el valor de la imagen convertida en texto al usuario que se guarda -  desafiate 7
   usuario.imgPerfil = foto.src;
   
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
 
// Funcion que permmite convertir una imagen en base64 (formato de texto plano que permite almacenar un archivo) - desafiate 7
let imgInput = document.getElementById('btnImgPerfil');
imgInput.addEventListener('change', function (e) {
    if (e.target.files) {
        let imageFile = e.target.files[0];
        let reader = new FileReader();
        reader.onload = function (e) {
            let img = document.createElement("img");
            img.onload = function(event) {
                  // Crea un canvas dinamicamente
                  let canvas = document.createElement("canvas");

                  let ctx = canvas.getContext("2d");

                  // Redimensiona la imagen
                  ctx.drawImage(img, 0, 0, 300, 190);

                  // Muestra el resultado en el control de la imagen
                  let dataurl = canvas.toDataURL(imageFile.type);
                  document.getElementById("fotoPerfil").src = dataurl;
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(imageFile);
    }
});

