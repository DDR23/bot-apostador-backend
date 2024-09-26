import { Server, Socket } from "socket.io";
import { TypeConfigToScraper } from "../../types/TypeConfig";
import GetSocket from "../../utils/GetSocket";

export default function ControllerScraperStop(io: Server, socket: Socket, data: TypeConfigToScraper) {
  const scraper = GetSocket();

  // Set up response handler
  const handleScraperFinishRes = (response: { title: string, message: string }) => {
    io.emit('SCRAPER_STOP_RES', response);
    scraper.off('SCRAPER_FINISH_RES', handleScraperFinishRes);
  };

  try {
    // Stop the bot
    scraper.emit('SCRAPER_FINISH', data._id);

    // Listen for stop response
    scraper.on('SCRAPER_FINISH_RES', handleScraperFinishRes);
  } catch (error) {
    socket.emit('SCRAPER_STOP_RES', {
      title: 'Erro',
      message: (error as Error).message || 'A ação não pode ser finalizada.',
    });
  }
}