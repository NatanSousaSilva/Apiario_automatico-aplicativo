import { URL_base } from "./url";

class Login {
    constructor() {}

    static async login_google(response) {
        const token = response.credential;

        if (!token) {
            throw new Error("Token não recebido.");
        }

        const resposta = await fetch(`${URL_base}/credential/login_google`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: token
            })
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.erro ?? `Erro HTTP: ${resposta.status}`);
        }

        const dados = await resposta.json();
        if (!dados.token) { throw new Error("Token não recebido"); }

        localStorage.setItem("token", dados.token);

        window.location.href = "/home";
    }

    static async login_local() {
        const email_input = document.getElementById("email_login");
        const senha_input = document.getElementById("senha_login");

        if (!email_input || !senha_input) {
            throw new Error("Campos de email ou senha não encontrados.");
        }

        const email = email_input.value.trim();
        const senha = senha_input.value.trim();

        const resposta = await fetch(`${URL_base}/credential/login_local`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                senha: senha
            })
        });

        if (!resposta.ok) {
            const erro = await resposta.json();

            throw new Error(
                erro.erro ??
                `Erro HTTP: ${resposta.status}`
            );
        }

        const dados = await resposta.json();

        if (!dados.token) { throw new Error("Token não recebido."); }

        localStorage.setItem("token", dados.token);

        window.location.href = "/home";
    }

    static async cadastro_local() {
        const nome_input = document.getElementById("nome_cadastro");
        const email_input = document.getElementById("email_cadastro");
        const senha_input = document.getElementById("senha_cadastro");

        if (!email_input || !senha_input || !nome_input) {
            throw new Error("Campos de email ou senha ou nome não encontrados.");
        }

        const nome = nome_input.value.trim();
        const email = email_input.value.trim();
        const senha = senha_input.value;

        const resposta = await fetch("${URL_base}/usuario/create",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha,
                google_id: null,
                provedor_login: null,
                admin: null
            })
        });

        if (!resposta.ok) {
            const erro = await resposta.json();

            throw new Error(
                erro.erro ??
                `Erro HTTP: ${resposta.status}`
            );
        }

    }

    static async recuperar_senha() {


    }
}


///////////////////////////////


window.addEventListener("DOMContentLoaded", () => {
    const form_login_local = document.getElementById("form_login_local");
    
    if (form_login_local instanceof HTMLFormElement) {
        form_login_local.addEventListener("submit", async (event) => {
            event.preventDefault();
            try {
                await Login.login_local();
            } catch (erro) {
                console.error("Erro no login:", erro);
            }
        });
    }

    //////
    
    const form_cadastro = document.getElementById("form_cadastro");

    if (form_cadastro instanceof HTMLFormElement) {
        form_cadastro.addEventListener("submit", async (event) => {
            event.preventDefault();
            try {
            await Usuario.cadastro_local();

            alert("Conta criada com sucesso!");

            form_cadastro.reset();

            const modal_cadastro = document.getElementById("modal_cadastro");
            if (modal_cadastro) {
                modal_cadastro.style.display = "none";
            }

            } catch (erro) {
                console.error("Erro no cadastro:", erro);
            }
        });
    }

    //////

    const form_recuperar_senha = document.getElementById("form_recuperar_senha");

    if (form_recuperar_senha instanceof HTMLFormElement) {
        form_recuperar_senha.addEventListener("submit", async (event) => {
            event.preventDefault();
            try {
                await Login.recuperar_senha();
            } catch (erro) {
                console.error("Erro na Recuperação:", erro);
            }
        });
    }


    ////////////////


    const modal_cadastro = document.getElementById("modal_cadastro");
    const abrir_cadastro = document.getElementById("abrir_cadastro");

    if (modal_cadastro && abrir_cadastro) {
        const fechar = modal_cadastro.querySelector(".fechar");

        abrir_cadastro.addEventListener("click", (e) => {
            e.preventDefault();
            modal_cadastro.style.display = "flex";
        });

        fechar.addEventListener("click", () => {
            modal_cadastro.style.display = "none";
        });

        window.addEventListener("click", (e) => {
            if (e.target === modal_cadastro) {
                modal_cadastro.style.display = "none";
            }
        });
    }


    //////


    const modal_recuperar_senha = document.getElementById("modal_recuperar_senha");
    const abrir_recuperar_senha = document.getElementById("abrir_recuperar_senha");

    if (modal_recuperar_senha && abrir_recuperar_senha) {
        const fechar = modal_recuperar_senha.querySelector(".fechar");

        abrir_recuperar_senha.addEventListener("click", (e) => {
            e.preventDefault();
            modal_recuperar_senha.style.display = "flex";
        });

        fechar.addEventListener("click", () => {
            modal_recuperar_senha.style.display = "none";
        });

        window.addEventListener("click", (e) => {
            if (e.target === modal_recuperar_senha) {
                modal_recuperar_senha.style.display = "none";
            }
        });
    }

});

window.login_google = (response) => {Login.login_google(response).catch(erro => {
    console.error("Erro no login Google:", erro);
});};