"import Express from "express";

import { partida } from "../routes/partida";
import { time } from "../routes/time";
import { time_partida } from "../routes/time_partida";

import cors from "cors";"

const Server = Express();

Server.use(Express.json());

Server.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }),
);

Server.get("/", (req, res) => {
    res.json({
        message: "test",
    }).status(200);
});

Server.use("/partida", partida);
Server.use("/time", time);
Server.use("/time_partida", time_partida);

export default Server;