import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function auth(req: Request, res: Response, next: NextFunction): void {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).json({ erro: "Token ausente" });
            return;
        }

        const parts = authHeader.split(" ");

        if (parts.length !== 2) {
            res.status(401).json({ erro: "Token mal formatado" });
            return;
        }

        const [scheme, token] = parts;

        if (scheme !== "Bearer") {
            res.status(401).json({ erro: "Formato inválido" });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            id_usuario: number;
            email: string;
        };

        req.usuario = decoded;

        next();

    } catch (err) {
        res.status(401).json({ erro: "Token inválido ou expirado" });
    }
}

export {auth};