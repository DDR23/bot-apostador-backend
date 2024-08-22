import express from "express";
import http from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(express.json());
const serverHttp = http.createServer(app);
const io = new Server(serverHttp, { cors: { origin: 'http://localhost:5173' } });

export { serverHttp, io };