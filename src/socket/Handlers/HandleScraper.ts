import { Server, Socket } from "socket.io";
import { TypeConfigToScraper } from "../../types/TypeConfig";
import ControllerScraperStart from "../../controllers/scraper/ControllerScraperStart";
import ControllerScraperStop from "../../controllers/scraper/ControllerScraperStop";

export default function HandleScraper(io: Server, socket: Socket) {
  socket.on('SCRAPER_START', (data: TypeConfigToScraper) => ControllerScraperStart(io, socket, data));
  socket.on('SCRAPER_STOP', (data: TypeConfigToScraper) => ControllerScraperStop(io, socket, data));
}
