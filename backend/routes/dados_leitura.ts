import { Router } from "express";
import { Controller_Dados_Leitura } from "../app/controllers/controller_dados_leitura";

const dados_leitura = Router();

dados_leitura.get("/read", Controller_Dados_Leitura.read_dados_leitura);
dados_leitura.get("/find/:dispositivo", Controller_Dados_Leitura.find_by_dispositivo);
dados_leitura.post("/create", Controller_Dados_Leitura.create_dados_leitura);
dados_leitura.delete("/delete/:dispositivo", Controller_Dados_Leitura.delete_dados_leitura);

export { dados_leitura };
