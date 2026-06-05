import { sequelize } from "../../config/config_db";
import Sequelize, { Model } from "sequelize";
import { Time } from "./time";
import { Partida } from "./partida";

class Time_Partida extends Model{}

Time_Partida.init({
    partida_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: Partida,
            key: 'id'
        }
    },
    time_casa: {
        type: Sequelize.STRING,
        primaryKey: true,
        references: {
            model: Time,
            key: 'nome'
        }
    },
    time_fora: {
        type: Sequelize.STRING,
        primaryKey: true,
        references: {
            model: Time,
            key: 'nome'
        }
    },
}, {
    sequelize,
    timestamps: false,
    tableName: 'times_partidas',
    modelName: 'Time_Partida',

});

export {Time_Partida}