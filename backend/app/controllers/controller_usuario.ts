import { Request, Response } from "express";
import { Usuario } from "../models/usuario";

interface IUsuario {
    id: number;
    email: string;
    senha: string;
    google_id: string;
    nome: string;
    provedor_login: string;
}

class Controller_Usuario{
    constructor() {}

    public static async create_usuario_http(req: Request<{}, {}, IUsuario>, res: Response): Promise<void> {
        try {
            const partida = await Usuario.create({
                id: req.body.id,
                email: req.body.email,
                senha: req.body.senha,
                google: req.body.google_id,
                nome: req.body.nome,
                provedor_login: req.body.provedor_login,
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

    public static async read_usuarios(req: Request, res: Response): Promise<void> {
        try {
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

    public static async update_usuario(req: Request, res: Response): Promise<void> {
        try {
            await Usuario.update(req.body, {
                where: { id: req.params.id },
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

    public static async delete_usuario(req: Request, res: Response): Promise<void> {
        try {
            await Usuario.destroy({
                where: { id: req.params.id },
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

    public static async find_by_email_http(req: Request, res: Response): Promise<void> {
        try {
            const usuario = await Usuario.findOne({
                where: { email: req.params.email },
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

    public static async create_usuario_var(nome: string, email: string, google_id: string | null, provedor_login: string): Promise<Usuario> {
        return await Usuario.create({
            nome,
            email,
            google_id,
            provedor_login,
        });
    }

    public static async find_by_email_var(_email: string): Promise<Usuario | null> {
        return await Usuario.findOne({
            where: {
                email: _email,
            },
        });
    }


};

export {Controller_Usuario};