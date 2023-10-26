import MessagesManager from "../dao/mongo/managers/MessagesManager.js";

const messagesServices = new MessagesManager();

const registerChatHandler = (io,socket) => {
    
    const saveMessage = async data =>{
        console.log(data);
        const result = await messagesServices.createMessage(data);
        io.to(data.room).emit('chat:logMessage',data);
    }

    const joinSocketToRoom = (room) =>{
        socket.join(room);
    }

    socket.on('chat:message',saveMessage);
    socket.on('chat:joinroom',joinSocketToRoom)
}

export default registerChatHandler;