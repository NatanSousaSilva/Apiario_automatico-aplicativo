import { Router } from "express";
import { Controller_Dispositivo} from "../app/controllers/controller_dispositivo";

const dispositivo = Router();

dispositivo.get("/read", Controller_Dispositivo.read_dispositivos);
dispositivo.get("/find_by_usuario/:id_usuario", Controller_Dispositivo.find_by_idusuario);
dispositivo.get("/find_by_chave/:chave", Controller_Dispositivo.find_by_chave);
dispositivo.post("/create", Controller_Dispositivo.create_dispositivo);
dispositivo.put("/update", Controller_Dispositivo.update_dispositivo);
dispositivo.delete("/delete", Controller_Dispositivo.delete_dispositivo);

export { dispositivo };