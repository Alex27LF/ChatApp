const { io } = require("../server");

// Conexion al SocketIO
io.on("connection", (socket) => {
    console.log("Usuario conectado" /* socket.id */);
    // Captura Fecha de la conversacion
    var hoy = new Date();
    var fecha = getDayChat(hoy.getDay()) + "," + hoy.getDate() + " de " + getMonthchat(hoy.getMonth() + 1) 
        + " del " + hoy.getFullYear();

    // Emite un Mensaje de Bienvenida
    socket.emit("menssageServer", {
        username: "Administrador - SocketIO",
        message: "Bienvenidos a la aplicación de chat",
        time: fecha,
    });

    // Escucha si un usuario se desconecta
    socket.on("disconnect", () => {
        console.log("Usuario desconectado");
    });

    // Escucha los mensajes de los usuarios
    socket.on("chat:message", function (data) {
        io.sockets.emit("chat:message", data);
    });

    // Escucha si un usuario escribe un mensaje
    socket.on("chat:typing", function (data) {
        socket.broadcast.emit("chat:typing", data);
    });
});

// Transforma el numero del Dia en String
function getDayChat(day) {
    switch (day) {
        case 1:
            return "Lunes";
        break;
        case 2:
            return "Martes";
        break;
        case 3:
            return "Miercoles";
        break;
        case 4:
            return "Jueves";
        break;
        case 5:
            return "Viernes";
        break;
        case 6:
            return "Sábado";
        break;
        case 7:
            return "Domingo";
        break;
        default:
            return "";
    }
}

// Transforma el numero del Mes en String
function getMonthchat(month) {
    switch (month) {
        case 1:
            return "Enero";
        break;
        case 2:
            return "Febrero";
        break;
        case 3:
            return "Marzo";
        break;
        case 4:
            return "Abril";
        break;
        case 5:
            return "Mayo";
        break;
        case 6:
            return "Junio";
        break;
        case 7:
            return "Julio";
        break;
        case 8:
            return "Agosto";
        break;
        case 9:
            return "Septiembre";
        break;
        case 10:
            return "Octubre";
        break;
        case 11:
            return "Noviembre";
        break;
        case 12:
            return "Diciembre";
        break;
        default:
            return '';
    }
}
