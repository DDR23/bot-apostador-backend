import { Socket } from 'socket.io';
import { Types } from 'mongoose';
import Strategy from '../../models/ModelStrategy';
import Config from '../../models/ModelConfig';
import { TypeStrategyTenis } from '../../types/TypeStrategyTenis';

export default async function ControllerStrategyDelete(socket: Socket, data: TypeStrategyTenis) {
  try {
    const { STRATEGY_CONFIG, _id } = data;
    await Strategy.delete(_id);
    await Config.removeStrategyFromConfig(STRATEGY_CONFIG, _id)
    socket.emit('STRATEGY_DELETE_RES', {
      title: 'Sucesso',
      message: 'Estrategia deletada com sucesso!',
      _id
    });
  } catch (error) {
    socket.emit('STRATEGY_DELETE_RES', {
      title: 'Erro',
      message: (error as Error).message || 'A ação não pode ser finalizada.',
    });
  }
}
