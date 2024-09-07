import { Socket } from 'socket.io';
import Strategy from '../../models/ModelStrategy';
import Config from '../../models/ModelConfig';
import { TypeStrategyTenisCreate } from '../../types/TypeStrategyTenis';
import { Types } from 'mongoose';

export default async function ControllerStrategyPost(socket: Socket, data: TypeStrategyTenisCreate) {
  try {
    if (!data || typeof data !== 'object') {
      socket.emit('STRATEGY_POST_RES', {
        title: 'Erro',
        message: 'Dados inválidos.'
      });
      return;
    };
    const strategy = await Strategy.save(data);
    await Config.addStrategyToConfig(data.STRATEGY_CONFIG, strategy._id as Types.ObjectId )
    socket.emit('STRATEGY_POST_RES', {
      title: 'Sucesso',
      message: 'Estrategia criada com sucesso!',
      data: strategy
    });
  } catch (error) {
    socket.emit('STRATEGY_POST_RES', {
      title: 'Erro',
      message: (error as Error).message || 'A ação não pode ser finalizada.',
    });
  }
}
