import Server from "./server/server";
import { sequelize } from "./config/config_db";
import { Usuario } from "./app/models";

const PORT = 3000;

Server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

async function teste() {
    try {
        await sequelize.authenticate();
        console.log("Banco conectado!");

        await sequelize.sync();
        console.log("Tabelas sincronizadas!");

        const [usuario, created] = await Usuario.findOrCreate({
            where: {
                email: "teste@email.com"
            },
            defaults: {
                nome: "Natan",
                email: "teste@email.com",
                google_id: null,
                provedor_login: "local",
                senha: "123456",
                admin: false,
            }
        });

        console.log(created ? "Usuário criado!" : "Usuário já existia.");
        console.log(usuario.toJSON());

    } catch (erro) {
        console.error("Erro:");
        console.error(erro);
    }
}

teste();