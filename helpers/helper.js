/**********************************************************************************************************************
 File: helper.js
 Author: Tony Hallal
 Date: 12/11/2023
 Description: contains all helper functions for the project.
**********************************************************************************************************************/



/**
 *
 * @param app
 * @param routes
 * Takes the routes that are to be used and assigns them to the app.
 * @returns void
 */
export const useRoutes = (app, ...routes) => {
    routes.forEach(route => {
        app.use(process.env.APP_BASE_PREFIX, route);
    })
}