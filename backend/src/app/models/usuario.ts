import { sequelize } from "../../config/config_db";
import Sequelize, { Model } from "sequelize";

class Usuario extends Model {
    declare id: number;
    declare email: string;
    declare senha: string | null;
    declare google_id: string | null;
    declare nome: string | null;
    declare provedor_login: string;
    declare admin: boolean;
}

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
    admin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    },
}, {
    sequelize,
    timestamps: false,
    tableName: "usuarios",
    modelName: "Usuario",
});

export { Usuario };