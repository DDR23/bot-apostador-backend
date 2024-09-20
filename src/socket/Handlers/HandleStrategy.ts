import { Server, Socket } from "socket.io";
import { Types } from "mongoose";
import { TypeStrategyTenis, TypeStrategyTenisCreate } from "../../types/TypeStrategyTenis";
import ControllerStrategyPost from "../../controllers/strategy/ControllerStrategyPost";
import ControllerConfigGetAllByConfig from "../../controllers/strategy/ControllerStrategyGetAllByConfig";
import ControllerStrategyDelete from "../../controllers/strategy/ControllerStrategyDelete";

export default function HandleStrategy(io: Server,socket: Socket) {
  socket.on('STRATEGY_POST', (data: TypeStrategyTenisCreate) => ControllerStrategyPost(socket, data));
  socket.on('STRATEGY_GETALL_BY_CONFIG', (configId: Types.ObjectId) => ControllerConfigGetAllByConfig(socket, configId));
  socket.on('STRATEGY_DELETE', (data: TypeStrategyTenis) => ControllerStrategyDelete(socket, data));
}
