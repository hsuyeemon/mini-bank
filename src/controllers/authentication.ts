// Import required modules and libraries
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { getUserByName, createUser, updateUserById } from '../db/user';

// Secret key for JWT signing
// TODO : to change to read from .env file
const JWT_SECRET = "P6cOq0Pxf8Kzf47dpWZywo5uPJooaBT0@dsfsadfd";

// Function for user login
export const login = async (req: express.Request, res: express.Response) => {

    try {
        const { username, password } = req.body;

        // Check if username and password are provided
        if (!username || !password) {
            return res.sendStatus(403);
        }

        // Retrieve user from the database
        const user = await getUserByName(username).lean();

        // Check if the user exists
        if (!user) {
            return res.json({ status: 403, error: 'Invalid username/ password' })
        }

        // Compare the provided password with the hashed password in the database
        if (await bcrypt.compare(password, user.password)) {
            // If passwords match, generate a JWT token
            const token = jwt.sign({
                id: user._id,
                username: user.username
            },
                JWT_SECRET)
            return res.status(200).json(token).end();
        }

        // If passwords do not match, return an error
        return res.json({ status: 403, error: 'Invalid username/ password' })
     
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

// Function for user registration
export const register = async (req: express.Request, res: express.Response) => {

    try {

        const { username, password: plainTextPassword } = req.body;

        // Check if username and password are provided
        if (!username || !plainTextPassword) {
            return res.sendStatus(403);
        }
        // Check if the username is already in use
        const existingUser = await getUserByName(username);
        if (existingUser) {
            return res.json({ status: 403, error: "Username already in use" });
        }

        // Encrypt the plain text password
        const password = await bcrypt.hash(plainTextPassword, 10);

        // Create a new user in the database
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

// Function to change user password
export const changePassword = async (req: express.Request, res: express.Response) => {

    try {

        // TODO: Find ways to get the user ID from the JWT token
        const { id, newpassword } = req.body;

        // Check if user ID and new password are provided
        if (!id || !newpassword) {
            return res.sendStatus(400);
        }

        // Hash the new password
        const password = await bcrypt.hash(newpassword, 10);

        // Update the user password in the database
        await updateUserById(id, { password });

        res.status(201).send({ message: 'Reset Password Successful' })

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }

}
