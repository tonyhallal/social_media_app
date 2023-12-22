/***********************************************************************************************************************
 * File: multer.js
 * Author: Tony Hallal
 * Date: 19/12/2023
 * Description: Handles the configuration of the multer library.
 ***********************************************************************************************************************/
import multer from 'multer';

const storage = multer.memoryStorage();
export const upload = multer({storage: storage});