/***********************************************************************************************************************
 File: messageSocketHandler.js
 Author: Tony Hallal
 Date: 14/11/2023
 Description: Handles realtime messaging. Sends to the user the connected users, and handles sending messages.
 ***********************************************************************************************************************/
import {MessageService} from "../services/message-service.js";
import {UserService} from "../services/user-service.js";

/**
 * Handles realtime messaging. Handles emitting connected users, as well as emitting messages to other users.
 * @param io
 * @param socket
 * @returns void
 */
export const messageSocketHandler = (io, socket) => {
    socket.on('connect_for_messaging', ({user_username, socketId}) => {
        MessageService.addUserConnection(user_username, socketId);
        io.emit('connected_users', MessageService.getConnectedUsers());
    })

    socket.on('send_message', async ({sender, receiver, message}) => {
        try {
            //save message to the database
            await MessageService.addMessage(sender, receiver, message);
        } catch (err) {
            socket.emit('error', err.message);
            return;
        }

        const receiverSocketId = MessageService.getOneConnectedUser(receiver);
        //emit the message
        socket.to(receiverSocketId).emit('receive_message', message);

    })

    socket.on('disconnect', () => {
        //remove user connection
        MessageService.removeUserConnection(socket.id);
        //re-send connected users
        io.emit('connected_users', MessageService.getConnectedUsers());
    })
}