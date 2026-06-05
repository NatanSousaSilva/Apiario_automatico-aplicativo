import { sequelize } from "../../config/config_db";
import Sequelize, { Model } from "sequelize";

class Time extends Model {}

Time.init({
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    foto: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    empates: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    vitorias: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    derrotas: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    gols_contra: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    gols_marcados: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    pontos: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
},{
    sequelize,
    timestamps: false,
    tableName: "time",
    modelName: "Time",
},
);

export {Time};