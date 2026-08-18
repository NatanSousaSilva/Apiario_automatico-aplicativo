import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { randomInt } from "crypto";

import { Controller_Usuario } from "./controller_usuario";

interface IUsuario {
    nome: string;
    email: string;
    senha: string;
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class Controller_Credential {
    public static async login_google(req: Request, res: Response): Promise<void> {
        try {
            const { token } = req.body;

            if (!token) {
                res.status(400).json({
                    erro: "Token não informado"
                });
                return;
            }

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

            let usuario = await Controller_Usuario.find_by_email_var(payload.email);

            if (!usuario) {
                usuario = await Controller_Usuario.create_usuario_var(payload.name, payload.email, payload.sub, "google", null, false);
            }

            const token_jwt = jwt.sign({
                    id_usuario: usuario.id,
                    email: usuario.email,
                    nome: usuario.nome,
                    admin: usuario.admin
                },
                process.env.JWT_SECRET as string,
                {
                    expiresIn: "7d"
                }
            );

            res.status(200).json({
                message: "Login realizado",
                token: token_jwt
            });
        } catch (erro) {
            console.error(erro);

            res.status(500).json({
                erro: "Erro ao autenticar"
            });
        }
    }

    public static async login_local(req: Request<{}, {}, Pick<IUsuario, "email" | "senha">>, res: Response): Promise<void> {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                res.status(400).json({
                    erro: "Email e senha são obrigatórios"
                });
                return;
            }

            const usuario = await Controller_Usuario.find_by_email_var(email);

            if (!usuario || !usuario.senha) { // necessario para garantir que senha nao é null
                res.status(401).json({
                    erro: "Email ou senha inválidos"
                });
                return;
            }

            const senha_valida = await bcrypt.compare(senha, usuario.senha);

            if (!senha_valida) {
                res.status(401).json({
                    erro: "Email ou Senha inválidos"
                });
                return;
            }

            const token_jwt = jwt.sign({
                    id_usuario: usuario.id,
                    email: usuario.email,
                },
                process.env.JWT_SECRET as string,
                {
                    expiresIn: "7d"
                }
            );

            res.status(200).json({
                message: "Login realizado",
                token: token_jwt
            });

        } catch (erro) {
            console.error(erro);

            res.status(500).json({
                erro: "Erro ao realizar login"
            });
        }
    }
    
    public static async cadastrar_local(req: Request<{}, {}, IUsuario>, res: Response): Promise<void> {
        try {
            const { nome, email, senha } = req.body;

            if (!nome || !email || !senha) {
                res.status(400).json({
                    erro: "Nome, email e senha são obrigatórios"
                });
                return;
            }

            const usuario_existente = await Controller_Usuario.find_by_email_var(email);

            if (usuario_existente) {
                res.status(409).json({
                    erro: "Email já cadastrado"
                });
                return;
            }

            const usuario = await Controller_Usuario.create_usuario_var(
                nome,
                email,
                null,
                "local",
                senha,
                false
            );

            const token_jwt = jwt.sign({
                    id_usuario: usuario.id,
                    email: usuario.email,
                },
                process.env.JWT_SECRET as string,
                {
                    expiresIn: "7d"
                }
            );

            res.status(201).json({
                message: "Usuário cadastrado",
                results: token_jwt
            });

        } catch (erro) {

            console.error(erro);

            res.status(500).json({
                erro: "Erro ao cadastrar usuário"
            });
        }
    }

    public static async enviar_email_recuperacao(req: Request<{}, {}, IUsuario>, res: Response): Promise<void> {
        const { email } = req.body; 
        const codigo = randomInt(100000, 1000000);

        await Controller_Credential.transporter.sendMail({
            from: '"Abelhas do Seridó 4.0" <abelhaspaas@gmail.com>',
            to: email,
            subject: "Recuperação de senha",
            text: `Seu código de recuperação é: ${codigo}`
        });
    }

    private static transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER as string,
            pass: process.env.EMAIL_PASSWORD as string
        }
    });
}

export { Controller_Credential };