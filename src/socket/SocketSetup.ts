import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import HandleConfig from './Handlers/HandleConfig';
import HandleStrategy from './Handlers/HandleStrategy';
import HandleEntry from './Handlers/HandleEntry';

export default function SocketSetup(httpServer: HttpServer) {
  const io = new Server(httpServer, { cors: { origin: process.env.URL_FRONT } });

  io.on('connection', (socket) => {
    console.log('Um usuário se conectou');

    HandleConfig(socket);
    HandleStrategy(socket);
    HandleEntry(socket);

    socket.on('disconnect', () => console.log('Usuário desconectado'));
  });
}
