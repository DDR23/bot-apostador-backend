import { Socket } from 'socket.io';
import Strategy from '../../models/ModelStrategy';
import { TypeStrategyTenisCreate } from '../../types/TypeStrategyTenis';

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
    console.log(strategy)
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
