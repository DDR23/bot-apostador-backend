import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import HandleConfig from './Handlers/HandleConfig';
import HandleStrategy from './Handlers/HandleStrategy';
import HandleScraper from './Handlers/HandleScraper';

export default function SocketSetup(httpServer: HttpServer) {
  const io = new Server(httpServer, { cors: { origin: process.env.URL_FRONT } });

  io.on('connection', (socket) => {
    console.log('Um usuário se conectou');

    HandleConfig(io, socket);
    HandleStrategy(io, socket);
    HandleScraper(io, socket);

    socket.on('disconnect', () => console.log('Usuário desconectado'));
  });
}
