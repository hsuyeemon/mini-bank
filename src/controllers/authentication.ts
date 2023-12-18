import express from 'express';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

import { getUserByName, createUser, updateUserById } from '../db/user';


const JWT_SECRET = "P6cOq0Pxf8Kzf47dpWZywo5uPJooaBT0@dsfsadfd";

export const login = async (req: express.Request, res: express.Response) => {

    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.sendStatus(403);
        }

        const user = await getUserByName(username).lean();

        if (!user) {
            return res.json({ status: 403, error: 'Invalid username/ password' })
        }

        if (await bcrypt.compare(password, user.password)) {

            const token = jwt.sign({
                id: user._id,
                username: user.username
            },
                JWT_SECRET)
            return res.status(200).json(token).end();
        }
        return res.json({ status: 403, error: 'Invalid username/ password' })
        // decrypt 
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


export const register = async (req: express.Request, res: express.Response) => {

    try {

        const { username, password: plainTextPassword } = req.body;

        console.log(username, plainTextPassword);

        if (!username || !plainTextPassword) {
            return res.sendStatus(403);
        }

        const existingUser = await getUserByName(username);
        if (existingUser) {
            return res.json({ status: 403, error: "Username already in use" });
        }

        // encrypt the password 
        const password = await bcrypt.hash(plainTextPassword, 10);

        const user = await createUser({
            username,
            password
        })

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


export const changePassword = async (req: express.Request, res: express.Response) => {

    try {

        // TODO: to find ways to get id from JWT token 
        const { id, newpassword } = req.body;


        if (!id || !newpassword) {
            return res.sendStatus(400);
        }

        const password = await bcrypt.hash(newpassword, 10);
        await updateUserById(id, { password });
        res.status(201).send({ message: 'Reset Password Successful' })

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }

}
