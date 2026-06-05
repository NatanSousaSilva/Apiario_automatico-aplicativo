import { Request, Response } from "express";
import { Time } from "../models/time";

interface ITime {
    nome: string;
    foto: string;
    qtd_jogos_disputados: number;
    empates: number;
    vitorias: number;
    derrotas: number;
    gols_marcados: number;
    gols_contras: number;
    pontos: number;
}


class Controller_Time{
    constructor() {}

    public static async create_time(
        req: Request<{}, {}, ITime>,
        res: Response,
    ) {
        try {
            const time = await Time.create({
                nome: req.body.nome,
                foto: req.body.foto,
                qtd_jogos_disputados: req.body.qtd_jogos_disputados,
                empates: req.body.empates,
                vitorias: req.body.vitorias,
                derrotas: req.body.derrotas,
                gols_marcados: req.body.gols_marcados,
                gols_contras: req.body.gols_contras,
                pontos: req.body.pontos,
            });

            res.status(201).json({
                success_message: "Time registrado.",
                results: [],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Erro cadastro time.",
                error: err,
            });
        }
    }

    public static async read_time(req: Request, res: Response) {
        try {
            const time = await Time.findAll();

            res.status(200).json({
                message: "Times listados.",
                results: time,
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Erro renortar times.",
                error: err,
            });
        }
    }

    public static async update_time(req: Request, res: Response) {
        try {
            await Time.update(req.body, {
                where: { id: req.params.id },
            });

            res.status(200).json({
                message: "Time editado.",
                results: [],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Erro editar time.",
                error: err,
            });
        }
    }

    public static async delete_time(req: Request, res: Response) {
        try {
            await Time.destroy({
                where: { id: req.params.id },
            });

            res.status(200).json({
                message: "Time deletado.",
                results: [],
            });
        } catch (err) {
            res.status(200).json({
                error_message: "Error deletar time",
                errors: err,
            });
        }
    }

    public static async find_time(req: Request, res: Response) {
        try {
            const time = await Time.findOne({
                where: { id: req.params.id },
            });

            res.status(200).json({
                message: "Time encontrado.",
                results: [time],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Erro encontrar time.",
                error: err,
            });
        }
    }


};

export {Controller_Time};