import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import HandleConfig from './Handlers/HandleConfig';

export default function SocketSetup(httpServer: HttpServer) {
  const io = new Server(httpServer, { cors: { origin: process.env.URL_FRONT } });

  io.on('connection', (socket) => {
    console.log('Um usuário se conectou');

    HandleConfig(socket);
    // HandleStrategy(socket);
    
    socket.on('disconnect', () => console.log('Usuário desconectado'));
  });
}
