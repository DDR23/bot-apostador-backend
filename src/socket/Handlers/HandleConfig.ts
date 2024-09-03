import { Socket } from "socket.io";
import ControllerConfigPost from "../../controllers/config/ControllerConfigPost";
import { TypeConfig } from "../../types/TypeConfig";
import ControllerConfigGetAll from "../../controllers/config/ControllerConfigGetAll";

export default function HandleConfig(socket: Socket) {
  socket.on('CONFIG_POST', (data: TypeConfig) => ControllerConfigPost(socket, data));
  socket.on('CONFIG_GETALL', () => ControllerConfigGetAll(socket));
}
