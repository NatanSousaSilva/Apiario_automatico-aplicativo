import { Router } from "express";
import { Controller_Dispositivo } from "../app/controllers/controller_dispositivo";
import { auth } from "../app/middlewares/auth";

const dispositivo = Router();

dispositivo.get("/read", auth, Controller_Dispositivo.list_by_idusuario);
dispositivo.get("/read_all", auth, Controller_Dispositivo.list);
dispositivo.get("/find_by_chave", auth, Controller_Dispositivo.find_by_chave);
dispositivo.post("/create", auth, Controller_Dispositivo.create_dispositivo);
dispositivo.put("/update", auth, Controller_Dispositivo.update_dispositivo);
dispositivo.delete("/delete", auth, Controller_Dispositivo.delete_dispositivo);

export { dispositivo };