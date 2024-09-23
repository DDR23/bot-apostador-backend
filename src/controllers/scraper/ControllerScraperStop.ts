import { Server, Socket } from "socket.io";
import { TypeConfigToScraper } from "../../types/TypeConfig";
import GetSocket from "../../utils/GetSocket";

export default function ControllerScraperStop(io: Server, socket: Socket, data: TypeConfigToScraper) {
  try {
    const scraper = GetSocket();

    // PARA O BOT
    scraper.emit('SCRAPER_FINISH', data._id)

    // OUVE REPOSTA DE PARADA
    const handleScraperFinishRes = (response: { title: string, message: string }) => {
      const { title, message } = response;
      io.emit('SCRAPER_STOP_RES', {
        title: title,
        message: message
      })
      scraper.off('SCRAPER_FINISH_RES', handleScraperFinishRes)
    }
    scraper.on('SCRAPER_FINISH_RES', handleScraperFinishRes)

  } catch (error) {
    socket.emit('SCRAPER_STOP_RES', {
      title: 'Erro',
      message: (error as Error).message || 'A ação não pode ser finalizada.',
    });
  }
}