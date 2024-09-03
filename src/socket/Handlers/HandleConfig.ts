import { Socket } from "socket.io";
import { TypeConfig } from "../../types/TypeConfig";
import ControllerConfigPost from "../../controllers/config/ControllerConfigPost";
import ControllerConfigGetAll from "../../controllers/config/ControllerConfigGetAll";
import ControllerConfigDelete from "../../controllers/config/ControllerConfigDelete";

export default function HandleConfig(socket: Socket) {
  socket.on('CONFIG_POST', (data: TypeConfig) => ControllerConfigPost(socket, data));
  socket.on('CONFIG_GETALL', () => ControllerConfigGetAll(socket));
  socket.on('CONFIG_DELETE', (id: string) => ControllerConfigDelete(socket, id));
}
