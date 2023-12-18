import express from 'express';
import { createNewAccount, deposit ,withdraw , getAccountInfo } from '../controllers/account';
import { isAuthenticated } from '../middleware';

export default (router : express.Router)=>{
    router.post('/account/create', isAuthenticated , createNewAccount );
    router.post('/account/deposit', isAuthenticated, deposit);
    router.post('/account/withdraw', isAuthenticated, withdraw);
    router.get('/account/:acc', isAuthenticated,getAccountInfo);
}