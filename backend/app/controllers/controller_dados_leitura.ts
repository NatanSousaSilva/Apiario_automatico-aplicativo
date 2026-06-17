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

    public static async create_dados_leitura(
        req: Request<{}, {}, IDados_leitrua>,
        res: Response,
    ) {
        try {
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

    public static async read_dados_leitura(req: Request, res: Response) {
        try {
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

    public static async delete_dados_leitura(req: Request, res: Response) {
        try {
            await Dados_Leitura.destroy({
                where: { id: req.params.id },
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

    public static async find_by_dispositivo(req: Request, res: Response) {
        try {
            const dados_leitura = await Dados_Leitura.findAll({
                where: { dispositivo: req.params.dispositivo },
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


};

export {Controller_Dados_Leitura};