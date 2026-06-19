import { IUsuario } from "../interfaces/usuario";

async function handle_credential(response: google.accounts.id.CredentialResponse): Promise<void> {
    const token = response.credential;

    if (!token) {
        throw new Error("Token não recebido.");
    }

    const resposta = await fetch("http://localhost:3000/credential/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
    });

    if (!resposta.ok) {
        throw new Error("Erro ao autenticar");
    }

    const dados = await resposta.json();

    const usuario: IUsuario = dados.usuario;
    const tokenJWT: string = dados.token;

    localStorage.setItem("token", tokenJWT);

    await acessar_dispositivos("/home");
}

async function acessar_dispositivos(rota: string) {

    const token = localStorage.getItem("token");

    const resposta = await fetch(rota, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const dados = await resposta.json();

    console.log(dados);
}