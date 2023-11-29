/************************************************************************************************
 File: message-service.js
 Author: Tony Hallal
 Date: 12/10/2023
 Description: Contains all services related to messages.
 *************************************************************************************************/
import {query} from "../database/db.js";

//stores connected users' socket IDs
const connectedUsers = new Map();

/**
 * loads all messages between two users.
 * @param senderId
 * @param receiverId
 * @returns {Promise<*|undefined>}
 */
const getConversation = async (senderId, receiverId) => {
    try {
        const sql = `SELECT * from message 
                            WHERE (sender_id = ? AND receiver_id = ?)
                            or (sender_id = ? and receiver_id = ?)`;
        return await query(sql, [senderId, receiverId, receiverId, senderId]);
    } catch (err) {
        throw new Error(err);
    }
}
/**
 * adds a message to the database.
 * @param message
 * @returns {Promise<*|undefined>}
 */
const addMessage = async (message) => {
    try {
        const {senderId, receiverId, messageContent} = message;
        const sql = `INSERT INTO message (sender_id, receiver_id, message_content, message_attachment)
                            values (?,?,?,?) `;
        return await query(sql, [senderId, receiverId, messageContent.textMessage, messageContent.msgAttachment])
    } catch (e) {
        throw new Error(e);
    }
}
/**
 * deletes the message with the corresponding id
 * @param message_id
 * @returns {Promise<*|undefined>}
 */
const removeMessage = async (message_id) => {
    try {
        const sql = `delete from message where message_id = ?`;
        return await query(sql, [message_id])
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Returns all the connected users
 * @returns {Map<any, any>}
 */
const getConnectedUsers = () => connectedUsers;

/**
 * Checks if the user being fetched is connected. Returns a response message of 200 and the connected user's socket id
 * in case of success. Returns an error message of 404 in case of an error.
 * @param user_id
 * @returns {{res: number}|{res: number, connectedUser: any}}
 */
const getOneConnectedUser = (user_id) => {
    if (!connectedUsers.has(user_id)) {
        return {
            res: 404,
        }
    }
    return {
        res: 200,
        connectedUser: connectedUsers.get(user_id)
    }
}

/**
 * Add a user's socket ID to the connected users Map.
 * @param user_id
 * @param socketID
 */
const addUserConnection = (user_id, socketID) => {
    connectedUsers.set(user_id, socketID);
}

/**
 * Checks if the user being removed is available. Returns a response message of 201 in case of success. Returns a
 * response message of 404 in case of an error.
 * @param socketID
 * @return {{res: number}}
 */
const removeUserConnection = (socketID) => {
    let isUserAvailable = false;
    for (let [key] of connectedUsers.entries()) {
        if (connectedUsers.get(key) === socketID) {
            isUserAvailable = true;
            break;
        }
    }
}

export const MessageService = {
    getConversation,
    addMessage,
    removeMessage,
    getConnectedUsers,
    getOneConnectedUser,
    addUserConnection,
    removeUserConnection
}