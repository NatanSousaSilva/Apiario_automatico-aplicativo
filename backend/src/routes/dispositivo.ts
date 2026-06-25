import { Router } from "express";

import { Controller_Dispositivo } from "../app/controllers/controller_dispositivo";
import { auth } from "../app/middlewares/auth";
import { admin } from "../app/middlewares/admin";

const dispositivo = Router();

dispositivo.get("/list", auth, admin, Controller_Dispositivo.list);
dispositivo.get("/list_by_idusuario", auth, Controller_Dispositivo.list_by_idusuario);
dispositivo.get("/find_by_chave", auth, Controller_Dispositivo.find_by_chave);
dispositivo.post("/create", auth, admin, Controller_Dispositivo.create);
dispositivo.put("/update", auth, admin, Controller_Dispositivo.update);
dispositivo.delete("/discociar", auth, Controller_Dispositivo.discociar);
dispositivo.delete("/delete", auth, admin, Controller_Dispositivo.delete);

export { dispositivo };