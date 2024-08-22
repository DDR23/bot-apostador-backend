import { serverHttp } from "./server";
import './socket';

serverHttp.listen(8080, () => console.log('servidor rodando'));