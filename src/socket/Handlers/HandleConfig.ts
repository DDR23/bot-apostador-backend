import { Socket } from "socket.io";
import ControllerConfigPost from "../../controllers/config/ControllerConfigPost";
import { TypeConfig } from "../../types/TypeConfig";

export default function HandleConfig(socket: Socket) {
  socket.on('CONFIG_POST', (data: TypeConfig) => ControllerConfigPost(socket, data));
  // socket.on('CONFIG_GET', (id: TypeConfig) => ControllerConfigGet(socket, id));
}
