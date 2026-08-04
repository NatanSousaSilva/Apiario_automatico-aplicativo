import { Router } from "express";
import { Controller_Credential } from "../app/controllers/controller_credential";

const credencial = Router();

credencial.post("/login_google", Controller_Credential.login_google);
credencial.post("/login_local", Controller_Credential.login_local);
credencial.post("/cadastro_local", Controller_Credential.cadastrar_local);

export { credencial };