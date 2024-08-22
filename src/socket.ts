import { io } from "./server";

io.on('connection', socket => {
  socket.on('chamada-teste', username => {
    socket.data.username = username;
    console.log(`A conexão com o Id: ${socket.id} pertence ao usuário ${username}`);
  });
});
