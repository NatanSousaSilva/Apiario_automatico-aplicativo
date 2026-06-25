import { sequelize } from "../../config/config_db";
import Sequelize, { Model } from "sequelize";
import { Dispositivo } from "./dispositivo";

class Dados_Leitura extends Model {
    declare vez_lida: number;
    declare chave_dispositivo: string;
    declare valor: string;
    declare sensor: string;
}

Dados_Leitura.init({
    vez_lida: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    chave_dispositivo: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Dispositivo,
            key: "chave",
        },
    },
    valor: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    sensor: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    timestamps: false,
    tableName: "dados_leitura",
    modelName: "DadosLeitura",
});

export { Dados_Leitura };