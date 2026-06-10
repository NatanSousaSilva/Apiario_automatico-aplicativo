import { Router } from "express";
import { Controller_Partida } from "../app/controllers/controller_usuario";

const partida = Router();

partida.get("/read", Controller_Partida.read_partidas);
partida.get("/find/:id", Controller_Partida.find_partida);
partida.post("/create", Controller_Partida.create_partida);
partida.put("/update", Controller_Partida.update_partida);
partida.delete("/delete", Controller_Partida.delete_partida);

export { partida };