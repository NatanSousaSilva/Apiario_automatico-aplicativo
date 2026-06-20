import { Request, Response } from "express";
import { Dados_Leitura } from "../models/dados_leitura";

interface IDados_leitrua {
    vez_lida: number;
    chave_dispositivo: number;
    valor: string;
    sensor: string;

}

class Controller_Dados_Leitura{
    constructor() {}

    public static async create(req: Request<{}, {}, IDados_leitrua>, res: Response): Promise<void> {
        try {
            if (!req.usuario?.id_usuario) {
                res.status(401).json({
                    erro: "Usuário não autenticado"
                });
                return;
            }

            const dados_leitura = await Dados_Leitura.create({
                vez_lida: req.body.vez_lida,
                chave_dispositivo: req.body.chave_dispositivo,
                valor: req.body.valor,
                sensor: req.body.sensor,
            });

            res.status(201).json({
                success_message: "Dados_Leitura registrado.",
                results: [],
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

    public static async list_by_chavedispositivo(req: Request<{}, {}, IDados_leitrua>, res: Response): Promise<void> {
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
                results: [dados_leitura],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Erro encontrar dados_leitura.",
                error: err,
            });
        }
    }

    public static async delete(req: Request<{}, {}, IDados_leitrua>, res: Response): Promise<void> {
        try {
            if (!req.usuario?.id_usuario) {
                res.status(401).json({
                    erro: "Usuário não autenticado"
                });
                return;
            }

            await Dados_Leitura.destroy({where: { 
                chave_dispositivo: req.body.chave_dispositivo,
                vez_lida: req.body.vez_lida
                },
            });

            res.status(200).json({
                message: "Dados_Leitura deletado.",
                results: [],
            });
        } catch (err) {
            res.status(200).json({
                error_message: "Error deletar dados_leitura",
                errors: err,
            });
        }
    }

};

export {Controller_Dados_Leitura};