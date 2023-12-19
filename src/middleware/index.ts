// Import required modules and libraries
import express from 'express';
import jwt from 'jsonwebtoken';

// Secret key for JWT verification 
// TODO : to change to read from .env file
const JWT_SECRET = "P6cOq0Pxf8Kzf47dpWZywo5uPJooaBT0@dsfsadfd";

// Middleware function for authentication
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    // Get the Authorization header from the request
    const authHeader = req.headers["authorization"];

    // If the Authorization header is missing, return a 401 Unauthorized status
    if (!authHeader) return res.sendStatus(401);

    // Split the Authorization header into type and token
    const [type, token] = authHeader.split(" ");

    // If the type is not "Bearer", return a 401 Unauthorized status
    if (type !== "Bearer") return res.sendStatus(401);

    // Verify the JWT token using the provided secret key
    jwt.verify(token, JWT_SECRET, function (err, data) {
        // If there's an error in JWT verification, return a 401 Unauthorized status
        if (err) return res.sendStatus(401);
        // If verification is successful, call the next middleware in the chain
        else next();
    });
}
