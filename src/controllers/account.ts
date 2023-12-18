import express from 'express';
import { createAccount, getAccountByAccountNo, updateAccountByAccountNo } from '../db/account';

export const createNewAccount = async (req: express.Request, res: express.Response) => {

    try {

        const { user_id, account_no, account_type, balance, created_date } = req.body;

        const newAcc = await createAccount({ user_id, account_no, account_type, balance, created_date });

        console.log("Account creation success")
        return res.status(200).json(newAcc).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deposit = async (req: express.Request, res: express.Response) => {

    try {

        const { account_no, amount } = req.body;

        if (!account_no || !amount) {
            return res.sendStatus(400);
        }

        const account = await getAccountByAccountNo(account_no);
        if (!account) {
            return res.json({ status: 400, error: "No account existed" })
        }

        const balance = (BigInt(account.balance.toString()) + BigInt(amount)).toString();
        const updated = await updateAccountByAccountNo(account.account_no, { "balance": balance });


        return res.status(200).json(updated).end();

    } catch (error) {
        console.log(error)
        return res.sendStatus(400);
    }

}

export const withdraw = async (req: express.Request, res: express.Response) => {

    try {
        const { account_no, amount } = req.body;

        if (!account_no || !amount) {
            return res.sendStatus(400);
        }

        const account = await getAccountByAccountNo(account_no);
        // balance should greater than zero 
        const balance = BigInt(account.balance) - BigInt(amount);
        if (balance < 0) {
            return res.json({ status: "error", error: "Insufficient Balance" })
        }

        const updated = await updateAccountByAccountNo(account.account_no, { balance })
        return res.status(200).json(updated).end();

    } catch (error) {

        console.log(error);
        return res.sendStatus(400);
    }

}

export const getAccountInfo = async (req: express.Request, res: express.Response) => {

    try {

        const { acc: account_no } = req.params;

      
        const account = await getAccountByAccountNo(account_no);

        if (!account) {
            return res.json({ status: 400, error: "no account found" })
        }

        return res.status(200).json(account).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);

    }
} 