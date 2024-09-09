import { Socket } from 'socket.io';
import { TypeConfigToScraper } from '../../types/TypeConfig';
import GetSocket from '../../utils/GetSocket';
import Strategy from '../../models/ModelStrategy';

export default async function ControllerEntryPost(socket: Socket, data: TypeConfigToScraper) {
  try {
    const scraper = GetSocket();

    const strategies = await Strategy.findAllByConfig(data._id);
    data.CONFIG_STRATEGIES = strategies;

    const handleScraperInitRes = (response: { title: string, message: string }) => {
      const { title, message } = response;
      socket.emit('ENTRY_POST_RES', {
        title: title,
        message: message,
        data: response
      });
      scraper.off('SCRAPER_INIT_RES', handleScraperInitRes);
    }
    scraper.on('SCRAPER_INIT_RES', handleScraperInitRes);

    scraper.emit('SCRAPER_INIT', data);

    // espera o retorno do evento (esse retorno deve ser apenas um novo objeto "entrada" pra que ela seja salva aqui, toda a logica de analise e entrada fica no scraping).
    // da um await entry.save() e envia uma notificação pro front que uma entrada acabou de ser feita

  } catch (error) {
    socket.emit('ENTRY_POST_RES', {
      title: 'Erro',
      message: (error as Error).message || 'A ação não pode ser finalizada.',
    });
  }
}
