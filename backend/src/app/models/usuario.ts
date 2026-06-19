import { sequelize } from "../../config/config_db";
import Sequelize, { Model } from "sequelize";

class Usuario extends Model {}

Usuario.init({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    google_id: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    provedor_login: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'local',
    },
}, {
    sequelize,
    timestamps: false,
    tableName: "usuarios",
    modelName: "Usuario",
});

export { Usuario };