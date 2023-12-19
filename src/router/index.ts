// Import required modules and libraries
import express from 'express';
import authentication from './authentication';
import account from './account';

// Create an instance of the Express Router
const router = express.Router();

// Export a function that returns an instance of the Express Router
export default (): express.Router => {

    // Use the authentication module to configure routes related to authentication
    authentication(router);
    // Use the account module to configure routes related to user accounts
    account(router);
    // Return the configured router instance
    return router;
}