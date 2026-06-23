import { Request, Response } from "express";
import { Usuario } from "../models/usuario";

interface IUsuario {
    id: number;
    email: string;
    senha: string;
    google_id: string;
    nome: string;
    provedor_login: string;
    admin: boolean;
}

class Controller_Usuario{
    constructor() {}

    public static async create_usuario_http(req: Request<{}, {}, IUsuario>, res: Response): Promise<void> {
        try {
            if (!req.usuario?.id_usuario) {
                res.status(401).json({
                    erro: "Usuário não autenticado"
                });
                return;
            }

            const partida = await Usuario.create({
                email: req.body.email,
                senha: req.body.senha,
                google_id: req.body.google_id,
                nome: req.body.nome,
                provedor_login: req.body.provedor_login,
                admin: req.body.admin,
            });

            res.status(201).json({
                success_message: "Usuario registrada.",
                results: [],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Erro cadastro usuario.",
                error: err,
            });
        }
    }

    public static async list(req: Request, res: Response): Promise<void> {
        try {
            if (!req.usuario?.id_usuario) {
                res.status(401).json({
                    erro: "Usuário não autenticado"
                });
                return;
            }

            const usuarios = await Usuario.findAll();

            res.status(200).json({
                message: "Usuarios listados.",
                results: usuarios,
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Erro renortar usuarios.",
                error: err,
            });
        }
    }

    public static async update(req: Request<{}, {}, IUsuario>, res: Response): Promise<void> {
        try {
            if (!req.usuario?.id_usuario) {
                res.status(401).json({
                    erro: "Usuário não autenticado"
                });
                return;
            }

            await Usuario.update(req.body, {
                where: { id: req.body.id },
            });

            res.status(200).json({
                message: "Usuario editado.",
                results: [],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Erro editar usuario.",
                error: err,
            });
        }
    }

    public static async delete(req: Request<{}, {}, IUsuario>, res: Response): Promise<void> {
        try {
            if (!req.usuario?.id_usuario) {
                res.status(401).json({
                    erro: "Usuário não autenticado"
                });
                return;
            }

            await Usuario.destroy({
                where: { id: req.body.id },
            });

            res.status(200).json({
                message: "Usuario deletada.",
                results: [],
            });
        } catch (err) {
            res.status(200).json({
                error_message: "Error deletar usuario",
                errors: err,
            });
        }
    }

    public static async find_by_email_http(req: Request<{}, {}, IUsuario>, res: Response): Promise<void> {
        try {
            if (!req.usuario?.id_usuario) {
                res.status(401).json({
                    erro: "Usuário não autenticado"
                });
                return;
            }

            const usuario = await Usuario.findOne({
                where: { email: req.body.email },
            });

            res.status(200).json({
                message: "Usuario encontrado.",
                results: [usuario],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Erro encontrar usuario.",
                error: err,
            });
        }
    }

    public static async create_usuario_var(nome: string, email: string, google_id: string | null, provedor_login: string, senha: string | null, admin: boolean): Promise<Usuario> {
        return await Usuario.create({
            nome,
            email,
            google_id,
            provedor_login,
            senha,
            admin,
        });
    }

    public static async find_by_email_var(email: string): Promise<Usuario | null> {
        return await Usuario.findOne({
            where: {
                email,
            },
        });
    }


};

export {Controller_Usuario};