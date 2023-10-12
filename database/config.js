/**********************************************************************
 File: config.js
 Author: Tony Hallal
 Date: 9/10/2023
 Description: this file contains the configuration of the database
 **********************************************************************/
import {config} from "dotenv";
config();

//database configuration
const db = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}

export default db;