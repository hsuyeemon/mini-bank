// Import the necessary modules and libraries
import express from 'express';
import { register, login, changePassword } from '../controllers/authentication';
import { isAuthenticated } from '../middleware';

// Export a function that configures authentication-related routes on the provided router
export default (router: express.Router) => {

    // Define a route for user registration (POST /auth/register)
    router.post("/auth/register", register);

    // Define a route for user login (POST /auth/login)
    router.post('/auth/login', login);

    // Define a route for changing password with authentication middleware (POST /auth/change-password)
    router.post('/auth/change-password', isAuthenticated, changePassword);

}