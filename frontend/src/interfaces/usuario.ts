interface IUsuario {
    id: number;
    email: string;
    senha: string;
    google_id: string;
    nome: string;
    provedor_login: string;
}

export {IUsuario};