import { Socket } from "socket.io";
import Config from '../../models/ModelConfig';

export default async function ControllerConfigGetAll(socket: Socket) {
  try {
    const configs = await Config.findAll();
    socket.emit('CONFIG_GETALL_RES', {
      title: 'Sucesso',
      message: 'Todas as configurações foram enviadas.',
      data: configs
    })
  } catch (error) {
    socket.emit('CONFIG_GETALL_RES', {
      title: 'Erro',
      message: (error as Error).message || 'A ação não pode ser finalizada.',
    });
  }
}
