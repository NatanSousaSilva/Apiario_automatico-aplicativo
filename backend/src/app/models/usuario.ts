import { sequelize } from "../../config/config_db";
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

class Usuario extends Model<InferAttributes<Usuario>, InferCreationAttributes<Usuario>> {
    declare id: CreationOptional<number>;
    declare email: string;
    declare senha: string | null;
    declare google_id: string | null;
    declare nome: string | null;
    declare provedor_login: CreationOptional<string>;
    declare admin: CreationOptional<boolean>;
}

Usuario.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    google_id: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    provedor_login: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "local",
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize,
    tableName: "usuarios",
    modelName: "Usuario",
    paranoid: true,
    timestamps: true
}
);

export { Usuario };