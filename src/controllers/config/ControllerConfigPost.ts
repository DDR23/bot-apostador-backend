import { Socket } from 'socket.io';
import Config from '../../models/ModelConfig';
import { TypeConfig } from '../../types/TypeConfig';

export default async function ControllerConfigPost(socket: Socket, data: TypeConfig) {
  try {
    if (!data || typeof data !== 'object') throw new Error('Dados inválidos.');
    const config = await Config.save(data);
    socket.emit('CONFIG_POST_RES', {
      title: 'Sucesso',
      message: 'Configuração criada com sucesso!',
      data: config,
    });
  } catch (error) {
    socket.emit('CONFIG_POST_RES', {
      title: 'Erro inesperado',
      message: (error as Error).message || 'A ação não pode ser finalizada.',
    });
  }
}
