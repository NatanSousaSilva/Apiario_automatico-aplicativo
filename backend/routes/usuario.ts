import { Router } from "express";
import { Controller_Usuario } from "../app/controllers/controller_usuario";

const usuario = Router();

usuario.get("/read", Controller_Usuario.read_usuarios);
usuario.get("/find/:id", Controller_Usuario.find_usuario);
usuario.post("/create", Controller_Usuario.create_usuario);
usuario.put("/update", Controller_Usuario.update_usuario);
usuario.delete("/delete", Controller_Usuario.delete_usuario);

export { usuario };
