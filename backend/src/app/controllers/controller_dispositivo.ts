import { Request, Response } from "express";
import { Dispositivo } from "../models/dispositivo";

interface IDispositivo {
    chave: number;
    id_usuario: number;
    senha: string;
}

class Controller_Dispositivo{
    constructor() {}

    public static async create_dispositivo(req: Request<{}, {}, IDispositivo>, res: Response,): Promise<void> {
        try {
            const dispositivo = await Dispositivo.create({
                chave: req.body.chave,
                id_usuario: req.body.id_usuario,
                senha: req.body.senha,
            });

            res.status(201).json({
                success_message: "Dispositivo registrado.",
                results: [],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Erro cadastro dispositivo.",
                error: err,
            });
        }
    }

    public static async list(req: Request, res: Response): Promise<void> {
        try {
            const dispositivos = await Dispositivo.findAll();

            res.status(200).json({
                message: "Dispositivos listados.",
                results: dispositivos,
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Erro renortar dispositivos.",
                error: err,
            });
        }
    }

    public static async list_by_idusuario(req: Request, res: Response): Promise<void> {
        try {
            const id_usuario = req.usuario?.id_usuario;

            if (!id_usuario) {
                res.status(401).json({
                    erro: "Usuário não autenticado"
                });
                return;
            }

            const dispositivos = await Dispositivo.findAll({
                where: { id_usuario: id_usuario}
            });

            res.status(200).json({
                message: "Dispositivos listados.",
                results: dispositivos,
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Erro renortar dispositivos.",
                error: err,
            });
        }
    }

    public static async update_dispositivo(req: Request<{}, {}, IDispositivo>, res: Response): Promise<void> {
        try {
            if (!req.usuario?.id_usuario) {
                res.status(401).json({
                    erro: "Usuário não autenticado"
                });
                return;
            }

            await Dispositivo.update(req.body, {
                where: { chave: Number(req.body.chave) },
            });

            res.status(200).json({
                message: "Dispositivo editado.",
                results: [],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Erro editar dispositivo.",
                error: err,
            });
        }
    }

    public static async discociar_dispositivo(req: Request<{}, {}, IDispositivo>, res: Response): Promise<void> {
        try {
            await Dispositivo.update({ id_usuario: null }, {
                where: { chave: Number(req.body.chave) },
            });

            res.status(200).json({
                message: "Dispositivo editado.",
                results: [],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Erro editar dispositivo.",
                error: err,
            });
        }
    }

    public static async delete_dispositivo(req: Request<{}, {}, IDispositivo>, res: Response): Promise<void> {
        try {
            await Dispositivo.destroy({
                where: { chave: Number(req.body.chave) },
            });

            res.status(200).json({
                message: "Dispositivo deletado.",
                results: [],
            });
        } catch (err) {
            res.status(200).json({
                error_message: "Error deletar dispositivo",
                errors: err,
            });
        }
    }

    public static async find_by_chave(req: Request, res: Response): Promise<void> {
        try {
            const dispositivo = await Dispositivo.findOne({
                where: { chave: Number(req.params.chave) },
            });

            res.status(200).json({
                message: "Dispositivo encontrado.",
                results: [dispositivo],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Erro encontrar dispositivo.",
                error: err,
            });
        }
    }

};

export {Controller_Dispositivo};