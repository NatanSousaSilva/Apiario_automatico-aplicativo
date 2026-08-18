import Server from "./server/server";
import { sequelize } from "./config/config_db";

const PORT = 3000;

async function iniciarServidor() {
    try {
        await sequelize.authenticate();
        console.log("Banco de dados conectado!");

        await sequelize.sync();
        console.log("Tabelas verificadas/criadas!");

        Server.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });

    } catch (erro) {
        console.error("Erro ao iniciar a aplicação:");
        console.error(erro);
    }
}

iniciarServidor();