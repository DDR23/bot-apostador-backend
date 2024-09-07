import { Socket } from 'socket.io';
import Config from '../../models/ModelConfig';
import { TypeConfigCreate } from '../../types/TypeConfig';

export default async function ControllerConfigPost(socket: Socket, data: TypeConfigCreate) {
  try {
    if (!data || typeof data !== 'object') {
      socket.emit('CONFIG_POST_RES', {
        title: 'Erro',
        message: 'Dados inválidos.'
      });
      return;
    };
    const config = await Config.save(data);
    socket.emit('CONFIG_POST_RES', {
      title: 'Sucesso',
      message: 'Configuração criada com sucesso!',
      data: config
    });
  } catch (error) {
    socket.emit('CONFIG_POST_RES', {
      title: 'Erro',
      message: (error as Error).message || 'A ação não pode ser finalizada.',
    });
  }
}
