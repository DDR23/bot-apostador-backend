import { Server, Socket } from "socket.io";
import { TypeConfigToScraper } from "../../types/TypeConfig";
import GetSocket from "../../utils/GetSocket";

export default function ControllerScraperStop(io: Server, socket: Socket, data: TypeConfigToScraper) {
  try {
    const scraper = GetSocket();

    // PARA O BOT
    scraper.emit('SCRAPER_FINISH', data)

  } catch (error) {
    socket.emit('SCRAPER_STOP_RES', {
      title: 'Erro',
      message: (error as Error).message || 'A ação não pode ser finalizada.',
    });
  }
}