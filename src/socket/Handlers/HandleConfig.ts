import { Socket } from "socket.io";
import { TypeConfigTenis } from "../../types/TypeConfigTenis";
import ControllerConfigPost from "../../controllers/config/ControllerConfigPost";
import ControllerConfigGet from "../../controllers/config/ControllerConfigGet";

export default function HandleConfig(socket: Socket) {
  socket.on('config_post', (data: TypeConfigTenis) => ControllerConfigPost(socket, data));
  socket.on('config_get', (user: TypeConfigTenis) => ControllerConfigGet(socket, user));
}
