import { Socket } from 'socket.io';

export default function ControllerConfigPost(socket: Socket, data: any) {
  console.log('POST:');
  console.log('SOCKET_ID:', socket.id);
  console.log('DATA:', data);
}
