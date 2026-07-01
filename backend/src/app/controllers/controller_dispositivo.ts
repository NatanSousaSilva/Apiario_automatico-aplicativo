import { Request, Response } from "express";
import { Dispositivo } from "../models/index";

interface IDispositivo {
    chave: string;
    id_usuario: number | null;
    senha: string;
}

class Controller_Dispositivo{
    constructor() {}

    public static async create(req: Request<{}, {}, IDispositivo>, res: Response,): Promise<void> {
        try {
            if (!req.usuario?.id_usuario) {
                res.status(401).json({
                    erro: "Usuário não autenticado"
                });
                return;
            }

            const dispositivo = await Dispositivo.create({
                chave: req.body.chave,
                senha: req.body.senha,
            });

            if (!dispositivo) {
                res.status(400).json({
                    error_message: "Não foi possível criar o dispositivo."
                });
                return;
            }

            res.status(201).json({
                success_message: "Dispositivo registrado.",
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
            if (!req.usuario?.id_usuario) {
                res.status(401).json({
                    erro: "Usuário não autenticado"
                });
                return;
            }
            
            const dispositivos = await Dispositivo.findAll({
                attributes: {
                    exclude: ["senha"],
                },
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
                where: { id_usuario: id_usuario},
                attributes: {
                    exclude: ["senha"],
                },
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

    public static async associar(req: Request<{}, {}, IDispositivo>, res: Response): Promise<void> {
        try {
            if (!req.usuario?.id_usuario) {
                res.status(401).json({
                    erro: "Usuário não autenticado"
                });
                return;
            }

            await Dispositivo.update({id_usuario: req.body.id_usuario}, {
                where: { chave: req.body.chave },
            });

            res.status(200).json({
                message: "Dispositivo editado.",
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Erro editar dispositivo.",
                error: err,
            });
        }
    }

    public static async desassoociar(req: Request<{}, {}, IDispositivo>, res: Response): Promise<void> {
        try {
            if (!req.usuario?.id_usuario) {
                res.status(401).json({
                    erro: "Usuário não autenticado"
                });
                return;
            }

            await Dispositivo.update({ id_usuario: null }, {
                where: { chave: req.body.chave },
            });

            res.status(200).json({
                message: "Dispositivo editado.",
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Erro editar dispositivo.",
                error: err,
            });
        }
    }

    public static async delete(req: Request<{}, {}, IDispositivo>, res: Response): Promise<void> {
        try {
            if (!req.usuario?.id_usuario) {
                res.status(401).json({
                    erro: "Usuário não autenticado"
                });
                return;
            }

            const dispositivo = await Dispositivo.destroy({
                where: { chave: req.body.chave },
            });

            if (!dispositivo) {
                res.status(404).json({
                    erro: "Dispositivo não encontrada."
                });
                return;
            }

            res.status(200).json({
                message: "Dispositivo deletado.",
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Error deletar dispositivo",
                errors: err,
            });
        }
    }

    public static async find_by_chave(req: Request<{}, {}, IDispositivo>, res: Response): Promise<void> {
        try {
            if (!req.usuario?.id_usuario) {
                res.status(401).json({
                    erro: "Usuário não autenticado"
                });
                return;
            }

            const dispositivo = await Dispositivo.findOne({
                where: { chave: req.body.chave },
            });

            res.status(200).json({
                message: "Dispositivo encontrado.",
                results: dispositivo,
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