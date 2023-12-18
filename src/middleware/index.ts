import express from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "P6cOq0Pxf8Kzf47dpWZywo5uPJooaBT0@dsfsadfd";

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.sendStatus(401);
    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer") return res.sendStatus(401);
    jwt.verify(token, JWT_SECRET, function (err, data) {
        if (err) return res.sendStatus(401);
        else next();
    });
}
