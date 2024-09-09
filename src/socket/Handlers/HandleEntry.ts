import { Socket } from "socket.io";
import { TypeConfigToScraper } from "../../types/TypeConfig";
import ControllerEntryPost from "../../controllers/entry/ControllerEntryPost";

export default function HandleEntry(socket: Socket) {
  socket.on('ENTRY_POST', (data: TypeConfigToScraper) => ControllerEntryPost(socket, data));
}
