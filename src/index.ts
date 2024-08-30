//CONFIG. PADRÃO DO EXPRESS
import express from "express";
const app = express();
app.use(express.json());

//CONFIG. PADRÃO DO DOTENV
import { config } from 'dotenv';
config();

//CONFIG. PADRÃO DO SOCKET
import http from 'http';
import setupSocket from "./sockets/socket";
const httpServer = http.createServer(app);
setupSocket(httpServer)

httpServer.listen(8080, () => console.log('servidor rodando'));
