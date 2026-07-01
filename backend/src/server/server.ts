import express from "express";
import cors from "cors";

import { dispositivo } from "../routes/dispositivo";
import { usuario } from "../routes/usuario";
import { dados_leitura } from "../routes/dados_leitura";
import { paginas } from "../routes/paginas";
import { credencial } from "../routes/credencial";

const Server = express();

Server.use(express.json());

Server.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

Server.get("/", (req, res) => {
  res.status(200).json({
    message: "test",
  });
});

Server.use("/", paginas);
Server.use("/usuario", usuario);
Server.use("/dispositivo", dispositivo);
Server.use("/dados_leitura", dados_leitura);
Server.use("/credencial", credencial);

export default Server;