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

    public static async read_dispositivos(req: Request, res: Response): Promise<void> {
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

    public static async update_dispositivo(req: Request, res: Response): Promise<void> {
        try {
            await Dispositivo.update(req.body, {
                where: { chave: req.params.chave },
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

    public static async delete_dispositivo(req: Request, res: Response): Promise<void> {
        try {
            await Dispositivo.destroy({
                where: { chave: req.params.chave },
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
                where: { chave: req.params.chave },
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

    public static async find_by_idusuario(req: Request, res: Response): Promise<void> {
        try {
            const dispositivos = await Dispositivo.findAll({
                where: { id_usuario: req.params.id_usuario },
            });

            res.status(200).json({
                message: "Dispositivos encontrado.",
                results: [dispositivos],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Erro encontrar dispositivos.",
                error: err,
            });
        }
    }


};

export {Controller_Dispositivo};