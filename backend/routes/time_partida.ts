import { Router } from "express";
import { Controller_Time_Partida } from "../app/controllers/controller_dados_leitura";

const time_partida = Router();

time_partida.get("/find_id_partida", Controller_Time_Partida.find_partida_id);
time_partida.get("/find_time_casa/:nome", Controller_Time_Partida.find_partida_timecasa);
time_partida.get("/find_time_fora/:nome", Controller_Time_Partida.find_partida_timefora);
time_partida.post("/create", Controller_Time_Partida.create_time_partida);
time_partida.delete("/delete", Controller_Time_Partida.delete_time_partida);

export { time_partida };