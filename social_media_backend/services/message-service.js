/************************************************************************************************
 File: message-service.js
 Author: Tony Hallal
 Date: 12/10/2023
 Description: Contains all services related to messages.
 *************************************************************************************************/
import {query} from "../database/db.js";
import {UserService} from "./user-service.js";

//stores connected users' socket IDs
const connectedUsers = new Map();

/**
 * loads all messages between two users.
 * @param sender
 * @param receiver
 * @returns {Promise<*|undefined>}
 */
const getConversation = async (sender, receiver) => {
    try {
        //conversation query
        const sql = `SELECT message_id, message_content, u1.user_username AS sender, u2.user_username AS receiver
                            FROM message m
                            JOIN users u1 ON m.sender_id = u1.user_id
                            JOIN users u2 ON m.receiver_id = u2.user_id
                            WHERE (u1.user_username = ? AND u2.user_username = ?)
                               OR (u1.user_username = ? AND u2.user_username = ?)
                               order by message_id`;

        //execute the query
        return await query(sql, [sender, receiver, receiver, sender]);
    } catch (err) {
        throw new Error(err);
    }
}
/**
 * adds a message to the database.
 * @param message
 * @returns {Promise<*|undefined>}
 */
const addMessage = async (sender, receiver, message) => {
    try {
        const senderQuery = await UserService.findByUsername(sender)
        const receiverQuery = await UserService.findByUsername(receiver)
        const senderId = senderQuery.user_id
        const receiverId = receiverQuery.user_id
        const sql = `INSERT INTO message (sender_id, receiver_id, message_content)
                            values (?,?,?) `;
        return await query(sql, [senderId, receiverId, message])
    } catch (e) {
        console.log(e.message);
    }
}

/**
 * returns all the connected users
 * @return {any[]}
 */
const getConnectedUsers = () => [...connectedUsers.keys()]

/**
 * Checks if the user being fetched is connected. Returns a response message of 200 and the connected user's socket id
 * in case of success. Returns an error message of 404 in case of an error.
 * @param user_username
 * @returns {{res: number}|{res: number, connectedUser: any}}
 */
const getOneConnectedUser = (user_username) => connectedUsers.get(user_username);

/**
 * Add a user's socket ID to the connected users Map.
 * @param user_username
 * @param socketID
 */
const addUserConnection = (user_username, socketID) => {
    connectedUsers.set(user_username, socketID);
}

/**
 * Checks if the user being removed is available. Returns a response message of 201 in case of success. Returns a
 * response message of 404 in case of an error.
 * @param socketID
 * @return {{res: number}}
 */
const removeUserConnection = (socketID) => {
    for (let [key] of connectedUsers.entries()) {
        if (connectedUsers.get(key) === socketID) {
            connectedUsers.delete(key)
            break;
        }
    }
}

export const MessageService = {
    getConversation,
    addMessage,
    getConnectedUsers,
    getOneConnectedUser,
    addUserConnection,
    removeUserConnection
}