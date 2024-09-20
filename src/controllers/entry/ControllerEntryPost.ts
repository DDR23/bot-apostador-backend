import { Socket } from 'socket.io';
import { TypeConfigToScraper } from '../../types/TypeConfig';
import GetSocket from '../../utils/GetSocket';
import Strategy from '../../models/ModelStrategy';

export default async function ControllerEntryPost(socket: Socket, data: TypeConfigToScraper) {
  try {
    const scraper = GetSocket();
    const strategies = await Strategy.findAllByConfig(data._id);
    data.CONFIG_STRATEGIES = strategies;

    // const handleScraperInitRes = (response: { title: string, message: string }) => {
    //   const { title, message } = response;
    //   socket.emit('ENTRY_POST_RES', {
    //     title: title,
    //     message: message,
    //   });
    //   scraper.off('SCRAPER_INIT_RES', handleScraperInitRes);
    // };
    // scraper.on('SCRAPER_INIT_RES', handleScraperInitRes);
    scraper.emit('SCRAPER_INIT', data);

  } catch (error) {
    socket.emit('ENTRY_POST_RES', {
      title: 'Erro',
      message: (error as Error).message || 'A ação não pode ser finalizada.',
    });
  }
}
