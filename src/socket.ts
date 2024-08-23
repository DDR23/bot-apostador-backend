import { io } from './server';

//CONNECT
io.on('connection', (socket) => {
  console.log(`${socket.id} iniciou a conexão`);

  //LOGIN
  socket.on('join_data_req', (req) => {

    socket.data = {
      USER_NAME: req.USER_NAME
    }

    const userDetails = {
      _id: Math.floor(Math.random() * 100),
      USER_NAME: req.USER_NAME,
      socketId: socket.id
    };

    const msgLogin = {
      title: `Olá ${req.USER_NAME} 😀`,
      message: 'Você se conectou com sucesso!'
    };
    
    const res = { userDetails, msgLogin }
    socket.emit('join_data_res', res);
    
  });

  //LOGOUT
  socket.on('logout', () => {

    const msgLogout = {
      title: `Até logo ${socket.data.USER_NAME} 👋`,
      message: 'Você se desconectou com sucesso!'
    };
    
    socket.emit('logout_success', msgLogout);
  });

  //DISCONNECT
  socket.on('disconnect', () => {
    console.log(`Conexão encerrada`);
  });
});
