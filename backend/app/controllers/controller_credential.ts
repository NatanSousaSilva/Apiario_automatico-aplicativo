import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";

import { Controller_Usuario } from "./controller_usuario";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class Controller_Credential{
    public static async login_google(req: Request,res: Response): Promise<void> {
        try {
            const { token } = req.body;

            const ticket =
                await client.verifyIdToken({
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

            const email = payload.email;
            const nome = payload.name;

            let usuario = await Controller_Usuario.find_by_email_var(email);

            if (!usuario) {

                usuario =  await Controller_Usuario.create_usuario_var(nome, email);
            }

            res.status(200).json({
                id_usuario: usuario.id_usuario,
                nome: usuario.nome,
                email: usuario.email,
            });

        } catch (erro) {
            res.status(500).json({
                erro: "Erro ao autenticar"
            });
        }
    }
};




export {Controller_Credential};