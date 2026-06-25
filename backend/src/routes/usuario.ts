import { Router } from "express";
import { Controller_Usuario } from "../app/controllers/controller_usuario";
import { auth } from "../app/middlewares/auth";
import { admin } from "../app/middlewares/admin";

const usuario = Router();

usuario.get("/list", auth, admin, Controller_Usuario.list);
usuario.get("/find_by_email", auth, Controller_Usuario.find_by_email_http);
usuario.post("/create", auth, Controller_Usuario.create_usuario_http);
usuario.put("/update", auth, Controller_Usuario.update);
usuario.delete("/delete", auth, admin, Controller_Usuario.delete);

export { usuario };
