import { Request, Response } from "express";
import { Time_Partida } from "../models/time_partida";

interface ITime_partida {
    id: number;
    time_casa: string;
    time_fora: string;
}


class Controller_Time_Partida{
    constructor() {}

    public static async create_time_partida(
        req: Request<{}, {}, ITime_partida>,
        res: Response,
    ) {
        try {
            const time_partida = await Time_Partida.create({
                id: req.body.id,
                time_casa: req.body.time_casa,
                time_fora: req.body.time_fora,
            });

            res.status(201).json({
                success_message: "Time_partida registrado.",
                results: [],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Erro cadastro time_partida.",
                error: err,
            });
        }
    }

    public static async delete_time_partida(req: Request, res: Response) {
        try {
            await Time_Partida.destroy({
                where: { id: req.params.id },
            });

            res.status(200).json({
                message: "Time_Partida deletado.",
                results: [],
            });
        } catch (err) {
            res.status(200).json({
                error_message: "Error deletar time_partida",
                errors: err,
            });
        }
    }

    public static async find_partida_id(req: Request, res: Response) {
        try {
            const partida = await Time_Partida.findOne({
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

    public static async find_partida_timecasa(req: Request, res: Response) {
        try {
            const partida = await Time_Partida.findOne({
                where: { time_casa: req.params.time_casa},
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

    public static async find_partida_timefora(req: Request, res: Response) {
        try {
            const partida = await Time_Partida.findOne({
                where: { time_fora: req.params.time_fora},
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

export {Controller_Time_Partida};