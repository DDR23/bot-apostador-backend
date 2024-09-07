import { Socket } from "socket.io";
import { Types } from "mongoose";
import { TypeConfigCreate, TypeConfigUpdate } from "../../types/TypeConfig";
import ControllerConfigPost from "../../controllers/config/ControllerConfigPost";
import ControllerConfigGet from "../../controllers/config/ControllerConfigGet";
import ControllerConfigGetAll from "../../controllers/config/ControllerConfigGetAll";
import ControllerConfigPut from "../../controllers/config/ControllerConfigPut";
import ControllerConfigDelete from "../../controllers/config/ControllerConfigDelete";

export default function HandleConfig(socket: Socket) {
  socket.on('CONFIG_POST', (data: TypeConfigCreate) => ControllerConfigPost(socket, data));
  socket.on('CONFIG_GET', (id: Types.ObjectId) => ControllerConfigGet(socket, id));
  socket.on('CONFIG_GETALL', () => ControllerConfigGetAll(socket));
  socket.on('CONFIG_PUT', (id: Types.ObjectId, data: Partial<TypeConfigUpdate>) => ControllerConfigPut(socket, id, data));
  socket.on('CONFIG_DELETE', (id: Types.ObjectId) => ControllerConfigDelete(socket, id));
}
