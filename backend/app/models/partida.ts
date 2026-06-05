import { sequelize } from "../../config/config_db";
import Sequelize, { Model } from "sequelize";

class Partida extends Model{}

Partida.init({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    time_casa: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    time_fora: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    qtd_gols_casa: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    qtd_gols_fora: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    resultado: {
        type: Sequelize.STRING,
        allowNull: true,
    },
},{
    sequelize,
    timestamps: false,
    tableName: "partida",
    modelName: "Partida",
},
);

export {Partida}