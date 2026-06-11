import { Router } from "express";
import { Controller_Dados_Leitura } from "../app/controllers/controller_dados_leitura";

const dados_leitura = Router();

dados_leitura.get("/read", Controller_Dados_Leitura.read_dados_leitura);
dados_leitura.get("/find/:nome", Controller_Dados_Leitura.find_dados_leitura);
dados_leitura.post("/create", Controller_Dados_Leitura.create_dados_leitura);
dados_leitura.put("/update", Controller_Dados_Leitura.update_dados_leitura);
dados_leitura.delete("/delete", Controller_Dados_Leitura.delete_dados_leitura);

export { dados_leitura };
