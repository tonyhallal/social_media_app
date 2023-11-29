/**********************************************************************
 File: db.js
 Author: Tony Hallal
 Date: 9/10/2023
 Description: this is a helper that handles database executions.
 **********************************************************************/

import {createConnection} from "mysql2/promise";
import db from "./config.js";

let connection;

//used to create a connection
const connect = async () => {
    try {
//create a connection
        connection = await createConnection(db)
    } catch (err) {
        console.error(`Error connecting to the database:\n${err.message}`);
        process.exit(1);
    }
}

//used to execute a query
export const query = async (sql, params) => {
//check if there is a connection
    if (!connection) {
        await connect();
    }

    try {
        const [results] = await connection.execute(sql, params);
        return results;
    } catch (err) {
        console.error(`error executing the following query: ${sql}\n**${err.message}**`);
        throw new Error(err);
    }
}

