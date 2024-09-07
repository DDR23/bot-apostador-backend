import { Socket } from 'socket.io';
import { Types } from 'mongoose';
import Config from '../../models/ModelConfig';

export default async function ControllerConfigDelete(socket: Socket, id: Types.ObjectId) {
  try {
    await Config.delete(id);
    socket.emit('CONFIG_DELETE_RES', {
      title: 'Sucesso',
      message: 'Configuração deletada com sucesso!',
      id
    });
  } catch (error) {
    socket.emit('CONFIG_DELETE_RES', {
      title: 'Erro',
      message: (error as Error).message || 'A ação não pode ser finalizada.',
    });
  }
}
