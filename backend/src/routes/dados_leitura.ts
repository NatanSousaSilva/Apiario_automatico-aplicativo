import { Router } from "express";

import { Controller_Dados_Leitura } from "../app/controllers/controller_dados_leitura";
import { auth } from "../app/middlewares/auth";
import { admin } from "../app/middlewares/admin";

const dados_leitura = Router();

dados_leitura.get("/list", auth, admin, Controller_Dados_Leitura.list);
dados_leitura.get("/list_by_chavedispositivo", auth, Controller_Dados_Leitura.list_by_chavedispositivo);
dados_leitura.get("/find_by_chave_vez", auth, Controller_Dados_Leitura.find_by_chave_vez);
dados_leitura.post("/create", auth, Controller_Dados_Leitura.create);
dados_leitura.delete("/delete", auth, Controller_Dados_Leitura.delete);

export { dados_leitura };
