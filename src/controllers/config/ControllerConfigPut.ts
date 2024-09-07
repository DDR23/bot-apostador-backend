import { Socket } from "socket.io";
import { Types } from "mongoose";
import Config from '../../models/ModelConfig';
import { TypeConfigUpdate } from "../../types/TypeConfig";

export default async function ControllerConfigPut(socket: Socket, id: Types.ObjectId, data: Partial<TypeConfigUpdate>) {
  try {
    if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
      socket.emit('CONFIG_PUT_RES', {
        title: 'Alerta',
        message: 'Nada foi alterado.'
      });
      return;
    };
    const UpdatedConfig = await Config.update(id, data);
    socket.emit('CONFIG_PUT_RES', {
      title: 'Sucesso',
      message: 'A configuração foi atualizada.',
      data: UpdatedConfig
    });
  } catch (error) {
    socket.emit('CONFIG_PUT_RES', {
      title: 'Erro',
      message: (error as Error).message || 'A ação não pode ser finalizada.',
    });
  }
}
