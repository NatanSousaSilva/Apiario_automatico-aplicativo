import { Request, Response } from "express";
import { Dispositivo } from "../models"; 
import { Controller_Dados_Leitura } from "./controller_dados_leitura";

interface IData{
    chave_dispositivo: string,
    valor: string,
    sensor: string
}

class Controller_Device_Communication{
    constructor(){}

    public static async return_date(req: Request, res: Response): Promise<void> {
        const date = new Date();
        
        res.status(200).json({
            success: true,
            results: date,
        });
    }

    public static async register_data(req: Request<{}, {}, IData>, res: Response): Promise<void> {
        try {
            const dispositivo = await Dispositivo.findOne({
                where: {
                    chave: req.body.chave_dispositivo
                }
            });

            if (!dispositivo){
                res.status(400).json({
                    success: false,
                    error: "Dispositivo não cadastrado."
                });

                return;
            }

            const dados_leitura = Controller_Dados_Leitura.create_var(req.body.chave_dispositivo, req.body.valor, req.body.sensor);

            if (!dados_leitura){
                res.status(400).json({
                    success: false,
                    error: "Não foi possivel cadastrar os dados."
                });

                return;
            }

            res.status(200).json({
                success: true,
                error: "Dados cadastrados."
            });


        } catch {
            res.status(400).json({
                success: false,
                error: "Não foi possivel cadastrar os dados."
            });
        }
        
    }

}

export { Controller_Device_Communication };