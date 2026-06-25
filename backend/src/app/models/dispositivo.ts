import { sequelize } from "../../config/config_db";
import Sequelize, { Model } from "sequelize";
import { Usuario } from "./usuario";

class Dispositivo extends Model {
    declare chave: string;
    declare idusuario: number;
    declare senha: string | null;
}

Dispositivo.init({
    chave: {
        type: Sequelize.STRING,
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
        allowNull: false,
    },
}, {
    sequelize,
    timestamps: false,
    tableName: "dispositivos",
    modelName: "Dispositivo",
});

export { Dispositivo };