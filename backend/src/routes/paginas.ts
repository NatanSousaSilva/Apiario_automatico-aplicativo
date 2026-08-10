import { Router } from "express";
import path from "path";
import { auth } from "../app/middlewares/auth";
import { admin } from "../app/middlewares/admin";

const paginas = Router();

paginas.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../frontend/src/pages/login.html"));
});
paginas.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../frontend/src/pages/home.html"));
});
paginas.get("/dados_dispositivo", (req, res)=> {
    res.sendFile(path.join(__dirname, "../../../frontend/src/pages/dados_dispositivo.html"));
});
paginas.get("/dashboard", admin, (req, res) => {
    res.sendFile(path.join(__dirname, "../../../frontend/src/pages/dashboard.html"));
});

export { paginas };