import { sequelize } from "../../config/config_db";
import {DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Model,} from "sequelize";
import { Dispositivo } from "./dispositivo";

class Dados_Leitura extends Model<InferAttributes<Dados_Leitura>, InferCreationAttributes<Dados_Leitura>> {
    declare id: CreationOptional<number>;
    declare vez_lida: number;
    declare chave_dispositivo: string;
    declare valor: string;
    declare sensor: string;
}

Dados_Leitura.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    vez_lida: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    chave_dispositivo: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Dispositivo,
            key: "chave",
        },
    },
    valor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sensor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: "dados_leitura",
    modelName: "DadosLeitura",
    paranoid: true,
    timestamps: true,
}
);

export { Dados_Leitura };