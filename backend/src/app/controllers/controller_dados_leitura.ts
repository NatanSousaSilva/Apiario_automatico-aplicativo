import { Request, Response } from "express";
import { Dados_Leitura } from "../models/index";

interface IDados_leitura {
    vez_lida: number;
    chave_dispositivo: string;
    valor: string;
    sensor: string;

}

class Controller_Dados_Leitura{
    constructor() {}

    public static async create(req: Request<{}, {}, IDados_leitura>, res: Response): Promise<void> {
        try {
            const ultima = await Dados_Leitura.max("vez_lida", {
                where: {
                    chave_dispositivo: req.body.chave_dispositivo,
                },
            }) as number | null;

            const vez_lida = (ultima ?? 0) + 1;

            const dados_leitura = await Dados_Leitura.create({
                vez_lida,
                chave_dispositivo: req.body.chave_dispositivo,
                valor: req.body.valor,
                sensor: req.body.sensor,
            });

            if (!dados_leitura) {
                res.status(400).json({
                    error_message: "Não foi possível criar o dados_dispositivo."
                });
                return;
            }

            res.status(201).json({
                success_message: "Dados_Leitura registrado.",
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Erro cadastro dados_leitura.",
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

            const dados_leitura = await Dados_Leitura.findAll();

            res.status(200).json({
                message: "Dados_Leitura listados.",
                results: dados_leitura,
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Erro renortar dados_leitura.",
                error: err,
            });
        }
    }

    public static async list_by_chavedispositivo(req: Request<{}, {}, IDados_leitura>, res: Response): Promise<void> {
        try {
            if (!req.usuario?.id_usuario) {
                res.status(401).json({
                    erro: "Usuário não autenticado"
                });
                return;
            }

            const dados_leitura = await Dados_Leitura.findAll({
                where: { chave_dispositivo: req.body.chave_dispositivo },
            });

            res.status(200).json({
                message: "Dados_Leitura encontrado.",
                results: dados_leitura,
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Erro encontrar dados_leitura.",
                error: err,
            });
        }
    }

    public static async delete(req: Request<{}, {}, IDados_leitura>, res: Response): Promise<void> {
        try {
            if (!req.usuario?.id_usuario) {
                res.status(401).json({
                    erro: "Usuário não autenticado"
                });
                return;
            }

            const dados_leitura = await Dados_Leitura.destroy({where: { 
                chave_dispositivo: req.body.chave_dispositivo,
                vez_lida: req.body.vez_lida
                },
            });

            if (!dados_leitura) {
                res.status(404).json({
                    erro: "dados_leitura não encontrada."
                });
                return;
            }

            res.status(200).json({
                message: "Dados_Leitura deletado.",
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Error deletar dados_leitura",
                errors: err,
            });
        }
    }
    public static async find_by_chave_vez(req: Request<{}, {}, IDados_leitura>, res: Response): Promise<void> {
        try {
            if (!req.usuario?.id_usuario) {
                res.status(401).json({
                    erro: "Usuário não autenticado"
                });
                return;
            }

            const dados_leitura = await Dados_Leitura.findOne({
                where: { chave_dispositivo: req.body.chave_dispositivo,
                         vez_lida: req.body.vez_lida
                 },
            });

            res.status(200).json({
                message: "Dados_Leitura eoncontrado.",
                results: dados_leitura,
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Erro encontrar Dados_Leitura.",
                error: err,
            });
        }
    }

};

export {Controller_Dados_Leitura};