import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';

export default function setupSocket(httpServer: HttpServer) {
  const io = new Server(httpServer, { cors: { origin: process.env.URL_FRONT } });
  
  io.on('connection', (socket) => {
    console.log('Um usuário se conectou');
    
    // Lógica de eventos e comunicação via socket aqui
    
    socket.on('disconnect', () => console.log('Usuário desconectado'));
  });
}