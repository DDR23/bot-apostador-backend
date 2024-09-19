import { Socket } from 'socket.io';
import { TypeConfigToScraper } from '../../types/TypeConfig';
import GetSocket from '../../utils/GetSocket';
import Strategy from '../../models/ModelStrategy';

export default async function ControllerEntryPost(socket: Socket, data: TypeConfigToScraper) {
  try {
    const scraper = GetSocket();

    const strategies = await Strategy.findAllByConfig(data._id);
    data.CONFIG_STRATEGIES = strategies;

    let eventCount = 0;
    const handleScraperInitRes = (response: { title: string, message: string }) => {
      eventCount++;
      console.log(response);
      const { title, message } = response;
      socket.emit('ENTRY_POST_RES', {
        title: title,
        message: message,
      });

      if (eventCount >= 2) {
        scraper.off('SCRAPER_INIT_RES', handleScraperInitRes);
      }
    };
    scraper.on('SCRAPER_INIT_RES', handleScraperInitRes);

    scraper.emit('SCRAPER_INIT', data);

    // Esperar o retorno do evento
    // Aqui pode-se adicionar lógica adicional, se necessário

  } catch (error) {
    socket.emit('ENTRY_POST_RES', {
      title: 'Erro',
      message: (error as Error).message || 'A ação não pode ser finalizada.',
    });
  }
}
