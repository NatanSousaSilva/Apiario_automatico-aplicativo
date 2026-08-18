import { Router } from "express";
import { Controller_Credential } from "../app/controllers/controller_credential";
import { admin } from "../app/middlewares/admin";
import { auth } from "../app/middlewares/auth";

const credencial = Router();

credencial.post("/login_google", Controller_Credential.login_google);
credencial.post("/login_local", Controller_Credential.login_local);
credencial.post("/cadastro_local", Controller_Credential.cadastrar_local);
credencial.get("/verificar_admin", auth, admin, (req, res)=> {res.status(200).json({ok: true});});

export { credencial };