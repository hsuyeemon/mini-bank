// Import required modules and libraries
import express from 'express';
import { createNewAccount, deposit, withdraw, getAccountInfo } from '../controllers/account';
import { isAuthenticated } from '../middleware';

// Export a function that configures account-related routes on the provided router
export default (router: express.Router) => {

    // Requires authentication using the isAuthenticated middleware

    // Define a route for creating a new account (POST /account/create)
    router.post('/account/create', isAuthenticated, createNewAccount);

    // Define a route for depositing funds into an account (POST /account/deposit)
    router.post('/account/deposit', isAuthenticated, deposit);

    // Define a route for withdrawing funds from an account (POST /account/withdraw)
    router.post('/account/withdraw', isAuthenticated, withdraw);

    // Define a route for getting account information (GET /account/:acc)
    router.get('/account/:acc', isAuthenticated, getAccountInfo);
}