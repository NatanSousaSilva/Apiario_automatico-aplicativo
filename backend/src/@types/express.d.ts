import "express";

declare global {
    namespace Express {
        interface Request {
            usuario?: {
                id_usuario: number;
                email: string;
            };
        }
    }
}

export {};