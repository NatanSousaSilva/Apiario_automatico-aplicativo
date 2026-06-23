import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

import { Controller_Usuario } from "./controller_usuario";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class Controller_Credential{
    public static async login_google(req: Request,res: Response): Promise<void> {
        try {
            const { token } = req.body;

            const ticket = await client.verifyIdToken({
                    idToken: token,
                    audience: process.env.GOOGLE_CLIENT_ID,
                });

            const payload = ticket.getPayload();

            if (!payload) {
                res.status(401).json({
                    erro: "Token inválido"
                });
                return;
            }

            if (!payload.email || !payload.name || !payload.sub) {
                res.status(401).json({
                    erro: "Dados do usuário não encontrados"
                });
                return;
            }

            const email = payload.email;

            let usuario = await Controller_Usuario.find_by_email_var(email);

            if (!usuario) {
                const nome = payload.name;
                const google_id = payload.sub;
                const provedor_login = "google";
                const senha = null;
                const admin = false;

                usuario = await Controller_Usuario.create_usuario_var(nome, email, google_id, provedor_login, senha, admin);
            }

            const token_jwt = jwt.sign({
                    id: usuario.id,
                    email: usuario.email,
                    nome: usuario.nome
                },
                process.env.JWT_SECRET as string,
                {
                    expiresIn: "7d"
                }
            );

            res.status(201).json({
                messager: "Login realizado",
                results: token_jwt,
            });
            return;

        } catch (erro) {
            res.status(500).json({
                erro: "Erro ao autenticar"
            });
        }
    }
};

export {Controller_Credential};