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
 * @param socket
 * @returns void
 */
export const messageSocketHandler = (socket) => {
    socket.on('connect_for_messaging', ({user_id, socketID}) => {
        MessageService.addUserConnection(user_id, socketID);
        socket.emit('connected_users', MessageService.getConnectedUsers());
    })

    socket.on('send_message', async ({senderID, receiverID, message}) => {
        let senderUserName;
        try {
            await MessageService.addMessage(message);
            senderUserName = await UserService.findById(senderID);
        } catch (err) {
            socket.emit('error', err.message);
            return;
        }
        const {textMessage} = message; //message to be sent
        const receiver = MessageService.getOneConnectedUser(receiverID);

        //check if there is a receiver
        if (receiver.res === 404) {
            //emit to the sender that the username is invalid
            const senderSocketID = MessageService.getOneConnectedUser(senderID).connectedUser;
            socket.to(senderSocketID).emit('invalid username');
        } else {
            //emit the message
            socket.to(receiver.connectedUser).emit({senderUserName, textMessage});
        }
    })

    socket.on('disconnect', () => {
        MessageService.removeUserConnection(socket.id);
        socket.emit('connected_users', MessageService.getConnectedUsers());
    })
}