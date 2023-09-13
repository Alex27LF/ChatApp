// DOM Elementos de Jquery
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');
let state = document.getElementById('state');
let welcome = document.getElementById('welcome');
let date_chat = document.getElementById('date-chat');

// Conectar al Socket
let socket = io();
socket.on('connect',()=>{
  state.innerHTML = `<p><em>Conectado al servidor...</em></p>`;
});

// Escuchar el Estado del Usuario (Desconectado)
socket.on('disconnect',()=>{
  state.innerHTML = `<p><em>Se perdio la conexion al servidor...</em></p>`;
});

// Escuchar Mensaje del Servidor 
socket.on('menssageServer',(mensaje)=>{
  welcome.innerHTML = `<p><em>Servidor: ${mensaje.username}</em></p>
    <p><em>${mensaje.message}</em></p>`;
  date_chat.innerHTML = `<p><em>${mensaje.time}</em></p>`;
  state.innerHTML = ''

});

// Enviar el Formulario
btn.addEventListener('click', function() {
  // Verifica que exista algun mensaje 
  if (message.value == '') {
    message.placeholder =  'No se ha escrito ningún mensaje...' 
    return; 
  }

  // Obtener Hora del mensaje
  var hoy = new Date();
  if (hoy.getHours() > 11) {
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ' pm.';
  } else {
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ' am.';
  }

  message.placeholder =  'Mensaje...' 

  // Emitimos el Mensaje
  socket.emit('chat:message', {
    message: message.value,
    username: username.value, 
    time: hora,
  });
});

// Verficar si se llena el formulario
message.addEventListener('keypress', function () {
  socket.emit('chat:typing', username.value);
});

// Imprimir informacion de escritura del mensaje
socket.on('chat:typing', function(data) {
  actions.innerHTML =  `<p><em>${data} esta escribiendo...</em></p>`
});

// Escuchar los mensajes de los usuarios
socket.on('chat:message', function(data) {
  // Borrar la informacion de escritura del mensaje
  actions.innerHTML = '';
  // Imprimi el mensaje
  output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message} ${data.time}
  </p>`
  // Limpiar el mensaje del formulario
  message.value =  '';
});