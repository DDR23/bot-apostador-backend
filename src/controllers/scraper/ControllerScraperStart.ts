import { Server, Socket } from 'socket.io';
import { TypeConfigToScraper } from '../../types/TypeConfig';
import GetSocket from '../../utils/GetSocket';
import Strategy from '../../models/ModelStrategy';
import ControllerConfigPut from '../config/ControllerConfigPut';

export default async function ControllerScraperStart(io: Server, socket: Socket, data: TypeConfigToScraper) {
  try {
    const scraper = GetSocket();
    const strategies = await Strategy.findAllByConfig(data._id);
    data.CONFIG_STRATEGIES = strategies;

    // INICIA O BOT
    scraper.emit('SCRAPER_INIT', data);

    // OUVE REPOSTA DE INÍCIO
    const handleScraperInitResOn = (response: { title: string, message: string }) => {
      const { title, message } = response;
      io.emit('SCRAPER_START_RES_ON', {
        title: title,
        message: message
      });
      scraper.off('SCRAPER_INIT_RES_ON', handleScraperInitResOn);
    };
    scraper.on('SCRAPER_INIT_RES_ON', handleScraperInitResOn);

    // OUVE RESPOSTA DE TÉRMINO
    const handleScraperInitResOff = async (response: { title: string, message: string }) => {
      const { title, message } = response;
      io.emit('SCRAPER_START_RES_OFF', {
        title: title,
        message: message
      });
      scraper.off('SCRAPER_INIT_RES_OFF', handleScraperInitResOff);
      await ControllerConfigPut(io, socket, data._id, { CONFIG_STATUS: false })
    }
    scraper.on('SCRAPER_INIT_RES_OFF', handleScraperInitResOff);

  } catch (error) {
    socket.emit('SCRAPER_START_RES', {
      title: 'Erro',
      message: (error as Error).message || 'A ação não pode ser finalizada.',
    });
  }
}
