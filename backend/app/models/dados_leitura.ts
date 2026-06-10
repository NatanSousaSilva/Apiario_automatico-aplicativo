import { sequelize } from "../../config/config_db";
import Sequelize, { Model } from "sequelize";
import { Dispositivo } from "./dispositivo";

class Dados_Leitura extends Model {}

Dados_Leitura.init({
    vez_lida: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true, 
    },
    chave_dispositivo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Dispositivo,
            key: 'chave',
        },
    },
    valor: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    sensor: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    timestamps: false,
    tableName: "dados_peso",
    modelName: "DadosPeso",
});

export { Dados_Leitura };