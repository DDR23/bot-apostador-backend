import { Socket } from "socket.io";
import { Types } from "mongoose";
import { TypeStrategyTenisCreate } from "../../types/TypeStrategyTenis";
import ControllerStrategyPost from "../../controllers/strategy/ControllerStrategyPost";
import ControllerConfigGetAllByConfig from "../../controllers/strategy/ControllerStrategyGetAllByConfig";

export default function HandleStrategy(socket: Socket) {
  socket.on('STRATEGY_POST', (data: TypeStrategyTenisCreate) => ControllerStrategyPost(socket, data));
  socket.on('STRATEGY_GETALL_BY_CONFIG', (configId: Types.ObjectId) => ControllerConfigGetAllByConfig(socket, configId));
  // socket.on('STRATEGY_GET', (id: string) => ControllerConfigGet(socket, id));
  // socket.on('STRATEGY_PUT', (id: string, data: Partial<TypeConfigUpdate>) => ControllerConfigPut(socket, id, data));
  // socket.on('STRATEGY_DELETE', (id: string) => ControllerConfigDelete(socket, id));
}
