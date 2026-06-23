import { Request, Response, NextFunction } from "express";
import { Usuario } from "../models/usuario";

async function admin(req: Request, res: Response, next: NextFunction): Promise<void> {
    const usuario = await Usuario.findByPk(
        req.usuario?.id_usuario
    );

    if (!usuario) {
        res.status(404).json({
            erro: "Usuário não encontrado"
        });
        return;
    }

    if (!usuario.admin) {
        res.status(403).json({
            erro: "Acesso negado"
        });
        return;
    }

    next();
}

export { admin };