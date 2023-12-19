// Import required modules and libraries
import express from 'express';
import { createAccount, getAccountByAccountNo, updateAccountByAccountNo } from '../db/account';

// Function to create a new account
export const createNewAccount = async (req: express.Request, res: express.Response) => {

    try {

        const { user_id, account_no, account_type, balance, created_date } = req.body;

        // Create a new account using the provided parameters
        const newAcc = await createAccount({ user_id, account_no, account_type, balance, created_date });
        console.log("Account creation success")

        // Send the created account in the response
        return res.status(200).json(newAcc).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
// Function to deposit funds into an account
export const deposit = async (req: express.Request, res: express.Response) => {

    try {

        const { account_no, amount } = req.body;

        // Check if account_no and amount are provided
        if (!account_no || !amount) {
            return res.sendStatus(400);
        }

        // Retrieve the account by account_no
        const account = await getAccountByAccountNo(account_no);

        // Check if the account exists
        if (!account) {
            return res.json({ status: 400, error: "No account existed" })
        }

        // Calculate the new balance after deposit
        const balance = (BigInt(account.balance.toString()) + BigInt(amount)).toString();

        // Update the account with the new balance
        const updated = await updateAccountByAccountNo(account.account_no, { "balance": balance });

        // Send the updated account in the response
        return res.status(200).json(updated).end();

    } catch (error) {
        console.log(error)
        return res.sendStatus(400);
    }

}
// Function to withdraw funds from an account
export const withdraw = async (req: express.Request, res: express.Response) => {

    try {

        const { account_no, amount } = req.body;

        // Check if account_no and amount are provided
        if (!account_no || !amount) {
            return res.sendStatus(400);
        }
        // Retrieve the account by account_no
        const account = await getAccountByAccountNo(account_no);

        // // Check if the account exists and has sufficient balance , balance should greater than zero 
        const balance = BigInt(account.balance) - BigInt(amount);
        if (balance < 0) {
            return res.json({ status: "error", error: "Insufficient Balance" })
        }

        // Update the account with the new balance after withdrawal
        const updated = await updateAccountByAccountNo(account.account_no, { balance })

        // Send the updated account in the response
        return res.status(200).json(updated).end();

    } catch (error) {

        console.log(error);
        return res.sendStatus(400);
    }

}
// Function to get account information by account number
export const getAccountInfo = async (req: express.Request, res: express.Response) => {

    try {

        const { acc: account_no } = req.params;

        // Retrieve the account by account_no
        const account = await getAccountByAccountNo(account_no);

        // Check if the account exists
        if (!account) {
            return res.json({ status: 400, error: "no account found" })
        }

        // Send the account information in the response
        return res.status(200).json(account).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);

    }
} 