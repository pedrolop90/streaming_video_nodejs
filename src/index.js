//PAQUETES REQUERIDOS
const express=require('express'),
 engine=require('ejs-mate'),
 path=require('path'),
 socketIO=require('socket.io'),
 http=require('http')

//INICIALIZACIONES
const app = express(),
server=http.createServer(app),
puerto=process.env.PORT||3000,
io=socketIO(server)

//CONFIGURACIONES
app.engine('ejs', engine);
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

//RUTAS
app.use(require('./routes/'));

//SOCKETS
require('./sockets.js')(io);
//ARCHIVOS ESTATICOS
app.use(express.static(path.join(__dirname,'public')));

//INICIAR SERVIDOR
server.listen(puerto,()=>{
  console.log("servidor funcionando en el puerto "+puerto);
});
