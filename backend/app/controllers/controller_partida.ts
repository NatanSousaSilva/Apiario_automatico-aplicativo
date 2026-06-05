import { Request, Response } from "express";
import { Partida } from "../models/partida";

interface IPartida {
    id: number;
    time_casa: string;
    time_fora: string;
    qtd_gols_casa: number;
    qtd_gols_fora: number;
    resultado: number;
}


class Controller_Partida{
    constructor() {}

    public static async create_partida(
        req: Request<{}, {}, IPartida>,
        res: Response,
    ) {
        try {
            const partida = await Partida.create({
                id: req.body.id,
                time_casa: req.body.time_casa,
                time_fora: req.body.time_fora,
                qtd_gols_casa: req.body.qtd_gols_casa,
                qtd_gols_fora: req.body.qtd_gols_fora,
                resultado: req.body.resultado,
            });

            res.status(201).json({
                success_message: "Partida registrada.",
                results: [],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Erro cadastro partida.",
                error: err,
            });
        }
    }

    public static async read_partidas(req: Request, res: Response) {
        try {
            const partidas = await Partida.findAll();

            res.status(200).json({
                message: "Partidas listadas.",
                results: partidas,
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Erro renortar partidas.",
                error: err,
            });
        }
    }

    public static async update_partida(req: Request, res: Response) {
        try {
            await Partida.update(req.body, {
                where: { id: req.params.id },
            });

            res.status(200).json({
                message: "Partida editada.",
                results: [],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Erro editar partida.",
                error: err,
            });
        }
    }

    public static async delete_partida(req: Request, res: Response) {
        try {
            await Partida.destroy({
                where: { id: req.params.id },
            });

            res.status(200).json({
                message: "Partida deletada.",
                results: [],
            });
        } catch (err) {
            res.status(200).json({
                error_message: "Error deletar partida",
                errors: err,
            });
        }
    }

    public static async find_partida(req: Request, res: Response) {
        try {
            const partida = await Partida.findOne({
                where: { id: req.params.id },
            });

            res.status(200).json({
                message: "Partida encontrada.",
                results: [partida],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Erro encontrar partida.",
                error: err,
            });
        }
    }


};

export {Controller_Partida};