/***********************************************************************************************************************
 File: message-controller.js
 Author: Tony Hallal
 Date: 14/11/2023
 Description: handles messages read and delete operations. Handles validators and delegates to the message
 service. Messaging is handled in realtime.
 ***********************************************************************************************************************/
import {MessageService} from "../services/message-service.js";
import {validationResult} from "express-validator";

/**
 * calls the getConversation function to load a conversation between two users. Returns an array containing the
 * conversation in case of success. Returns an error message in case of an error
 * @param req
 * @param res
 * @return {Promise<void>}
 */
export const loadMessages = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }
    try {
        const {sender_id, receiver_id} = req.body;
        res.status(200).send(await MessageService.getConversation(sender_id, receiver_id));
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
}

/**
 * Handles message deletion. Returns a description of the database altering in case of success. Returns an error message
 * @param req
 *@param res
 * in case of an error.
 * @return {Promise<void>}
 */
export const deleteMessage = async (req, res) => {
    try {
        const {message_id} = req.params;
        res.status(201).send({
            dbModification: await MessageService.removeMessage(message_id),
            message: 'message deleted successfully'
        });
    } catch (err) {
        res.status(500).send(`was not able to delete message. \n ${err.message}`);
    }
}