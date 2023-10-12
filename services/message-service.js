/************************************************************************************************
 File: message-service.js
 Author: Tony Hallal
 Date: 12/10/2023
 Description: Contains all services related to messages.
 *************************************************************************************************/
import {query} from "../database/db.js";

//load conversation
const getMessages = async (senderId, receiverId) => {
    try {
        const sql = `SELECT * from message 
                            WHERE sender_id = ? AND receiver_id = ? 
                            or sender_id = ? and receiver_id = ?`;
        return await query(sql, [senderId, receiverId, receiverId, senderId]);
    } catch (err) {
        throw new Error(err);
    }
}

//add message
const addMessage = async (message) => {
    const { senderId, receiverId, messageContent } = message;
    const sql = `INSERT INTO message (sender_id, receiver_id, message_content, message_attachment)
                        values (?,?,?,?) `;
return await query(sql,[senderId, receiverId, messageContent.textMessage, messageContent.msgAttachment])
}

//TODO: continue delete functionality