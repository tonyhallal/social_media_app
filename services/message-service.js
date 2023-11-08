/************************************************************************************************
 File: message-service.js
 Author: Tony Hallal
 Date: 12/10/2023
 Description: Contains all services related to messages.
 *************************************************************************************************/
import {query} from "../database/db.js";
/**
 *
 * @param senderId
 * @param receiverId
 * loads all messages between two users.
 * @returns {Promise<*|undefined>}
 */
const get = async (senderId, receiverId) => {
    try {
        const sql = `SELECT * from message 
                            WHERE sender_id = ? AND receiver_id = ? 
                            or sender_id = ? and receiver_id = ?`;
        return await query(sql, [senderId, receiverId, receiverId, senderId]);
    } catch (err) {
        throw new Error(err);
    }
}
/**
 *
 * @param message
 * adds a message to the database.
 * @returns {Promise<*|undefined>}
 */
const add = async (message) => {
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
 *
 * @param message_id
 * @returns {Promise<*|undefined>}
 */
const remove = async (message_id) => {
    try {
        const sql = `delete from message where message_id = ?`;
        return await query(sql, [message_id])
    } catch (err) {
        throw new Error(err);
    }
}