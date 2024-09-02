import { Socket } from 'socket.io';
import { Config } from '../../models/ModelConfig';

export default function ControllerConfigPost(socket: Socket, data: any) {
  try {
    // Validação básica dos dados
    if (!data || typeof data !== 'object') {
      throw new Error('Dados inválidos.');
    }

    // Verifica se o ID está definido (se não, assume que é uma nova configuração)
    let config;
    if (data._id) {
      config = Config.findById(data._id);
      if (config) {
        config.update(data);
      } else {
        throw new Error('Configuração não encontrada.');
      }
    } else {
      // Se não há ID, cria uma nova configuração
      config = new Config(data);
      config.save();
    }

    // Retornando sucesso ao cliente via WebSocket
    socket.emit('CONFIG_POST_RES', {
      success: true,
      message: 'Configuração salva ou atualizada com sucesso!',
      data: { ...config },  // Envia os dados da configuração como resposta
    });

  } catch (error) {
    // Tratamento de erros
    console.error('Erro ao salvar ou atualizar configuração:', error);

    // Enviando erro ao cliente via WebSocket
    socket.emit('CONFIG_POST_RES', {
      success: false,
      // message: error.message || 'Erro desconhecido.',
    });
  }
}
