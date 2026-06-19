import { sequelize } from "../../config/config_db";
import Sequelize, { Model } from "sequelize";
import { Usuario } from "./usuario";

class Dispositivo extends Model {}

Dispositivo.init({
    chave: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    idusuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id',
        },
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    timestamps: false,
    tableName: "dispositivos",
    modelName: "Dispositivo",
});

export { Dispositivo };