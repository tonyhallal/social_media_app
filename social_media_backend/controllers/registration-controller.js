/***********************************************************************************************************************
 * File: registration-controller.js
 * Author: Tony Hallal
 * Date: 19/12/2023
 * Description: contains a controller function that handles rendering the registration page
***********************************************************************************************************************/
/**
 * handles rendering the registration page
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const renderRegistration = async (req, res) => {
    res.render('registration');
}