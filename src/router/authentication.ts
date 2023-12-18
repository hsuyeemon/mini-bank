import express from 'express'
import { register , login , changePassword} from '../controllers/authentication';
import { isAuthenticated } from '../middleware';

export default (router:express.Router) => {

    router.post("/auth/register", register);
    router.post('/auth/login',login);
    router.post('/auth/change-password', isAuthenticated , changePassword);

}