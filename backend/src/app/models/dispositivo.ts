import { sequelize } from "../../config/config_db";
import { DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Model } from "sequelize";

import { Usuario } from "./usuario";

class Dispositivo extends Model<InferAttributes<Dispositivo>, InferCreationAttributes<Dispositivo>> {
    declare chave: string;
    declare id_usuario: number | null;
    declare senha: string;
}

Dispositivo.init({
    chave: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Usuario,
            key: "id",
        },
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: "dispositivos",
    modelName: "Dispositivo",
    paranoid: true,
    timestamps: true,
}
);

export { Dispositivo };