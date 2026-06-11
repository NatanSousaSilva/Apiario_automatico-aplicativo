import { Request, Response } from "express";
import { Usuario } from "../models/usuario";

interface IUsuario {
    id: number;
    email: string;
    senha: string;
    provedor_login: string;
}

class Controller_Usuario{
    constructor() {}

    public static async create_usuario(
        req: Request<{}, {}, IUsuario>,
        res: Response,
    ) {
        try {
            const partida = await Usuario.create({
                id: req.body.id,
                email: req.body.email,
                senha: req.body.senha,
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

    public static async read_usuarios(req: Request, res: Response) {
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

    public static async update_usuario(req: Request, res: Response) {
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

    public static async delete_usuario(req: Request, res: Response) {
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

    public static async find_usuario(req: Request, res: Response) {
        try {
            const usuario = await Usuario.findOne({
                where: { id: req.params.id },
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


};

export {Controller_Usuario};