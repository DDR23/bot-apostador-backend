import { Socket } from "socket.io";
import { Types } from "mongoose";
import Strategy from '../../models/ModelStrategy';

export default async function ControllerConfigGetAllByConfig(socket: Socket, configId: Types.ObjectId) {
  try {
    const strategies = await Strategy.findAllByConfig(configId);
    socket.emit('STRATEGY_GETALL_BY_CONFIG_RES', {
      title: 'Sucesso',
      message: 'Todas as configurações foram enviadas.',
      data: strategies
    })
  } catch (error) {
    socket.emit('STRATEGY_GETALL_BY_CONFIG_RES', {
      title: 'Erro',
      message: (error as Error).message || 'A ação não pode ser finalizada.',
    });
  }
}
