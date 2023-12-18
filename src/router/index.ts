import express from 'express';
import authentication from './authentication';
import account from './account';

const router = express.Router();

export default (): express.Router => {

    authentication(router);
    account(router);
    return router;
}