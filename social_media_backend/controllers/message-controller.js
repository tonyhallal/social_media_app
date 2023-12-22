/***********************************************************************************************************************
 File: message-controller.js
 Author: Tony Hallal
 Date: 14/11/2023
 Description: handles messages read and delete operations. Handles validators and delegates to the message
 service. Messaging is handled in realtime.
 ***********************************************************************************************************************/
import {MessageService} from "../services/message-service.js";
/**
 * calls the getConversation function to load a conversation between two users. Returns an array containing the
 * conversation in case of success. Returns an error message in case of an error
 * @param req
 * @param res
 * @return {Promise<void>}
 */
export const loadMessages = async (req, res) => {

    try {
        const {loggedUser, user} = req.params;
        const conversation = await MessageService.getConversation(loggedUser, user);
        res.render('messages', {conversation, user});
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
}

/**
 * renders the connected users page
 * @param req
 * @param res
 */
export const connectedUsersForMessaging = (req, res) => {
    res.render('connected-users');
}

