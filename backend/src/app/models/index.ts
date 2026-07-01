import { Usuario } from "./usuario";
import { Dispositivo } from "./dispositivo";
import { Dados_Leitura } from "./dados_leitura";

Usuario.hasMany(Dispositivo, {
    foreignKey: "id_usuario",
    as: "dispositivos",
});

Dispositivo.belongsTo(Usuario, {
    foreignKey: "id_usuario",
    as: "usuario",
});

Dispositivo.hasMany(Dados_Leitura, {
    foreignKey: "chave_dispositivo",
    sourceKey: "chave",
    as: "leituras",
});

Dados_Leitura.belongsTo(Dispositivo, {
    foreignKey: "chave_dispositivo",
    targetKey: "chave",
    as: "dispositivo",
});

export { Usuario, Dispositivo, Dados_Leitura };