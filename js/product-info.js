// Se obtiene el "a" agregado en index.html, quedando guardado en la variable emailNavBar - entrega 2
let emailNavBar = document.getElementById("email");
// Se busca el valor (email) guardado anteriormente en localStorage en login.js - entrega 2 
let emailValor = window.localStorage.getItem("email");
// Se asigna al valor que se muestra en pantalla del "a" el email previamente guardado - entrega 2
emailNavBar.innerHTML = emailValor;