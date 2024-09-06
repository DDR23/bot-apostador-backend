import { Socket } from "socket.io";
import ControllerStrategyPost from "../../controllers/strategy/ControllerStrategyPost";
import { TypeStrategyTenisCreate } from "../../types/TypeStrategyTenis";

export default function HandleStrategy(socket: Socket) {
  socket.on('STRATEGY_POST', (data: TypeStrategyTenisCreate) => ControllerStrategyPost(socket, data));
  // socket.on('STRATEGY_GET', (id: string) => ControllerConfigGet(socket, id));
  // socket.on('STRATEGY_GETALL', () => ControllerConfigGetAll(socket));
  // socket.on('STRATEGY_PUT', (id: string, data: Partial<TypeConfigUpdate>) => ControllerConfigPut(socket, id, data));
  // socket.on('STRATEGY_DELETE', (id: string) => ControllerConfigDelete(socket, id));
}
