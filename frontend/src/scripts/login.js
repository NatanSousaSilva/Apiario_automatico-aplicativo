import { definir_formulario, definir_modal } from "./functions.js";
import { URL_base } from "./url.js";

class Login {
    constructor() {}

    static async verificar_admin(token) {
        const resposta = await fetch(`${URL_base}/credential/verificar_admin`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (resposta.ok) return true;
        else return false;
    }

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

        if (Login.verificar_admin(dados.token)) return; 

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

        const admin = await Login.verificar_admin(dados.token);

        if (admin) { 
            window.location.href = "/dashboard";
            return;
        }

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

        const resposta = await fetch(`${URL_base}/credential/cadastro_local`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha,
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
    
}

class Recuperar_Senha {
    static async solicitar_recuperacao_senha() {
        const emailInput = document.getElementById("email_recuperar_senha");
        const emailConfirmacaoInput = document.getElementById("confirmacao_email_recuperar_senha");

        if (!emailInput || !emailConfirmacaoInput) {
            throw new Error("Campos de e-mail não encontrados.");
        }

        const email = emailInput.value.trim();
        const emailConfirmacao = emailConfirmacaoInput.value.trim();

        if (email !== emailConfirmacao) {
            throw new Error("E-mails não correspondem.");
        }

        localStorage.setItem("email_recuperacao", email);

        const resposta = await fetch(`${URL_base}/credential/email_recuperacao`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email
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

    static async validar_codigo() {
        const codigoInput = document.getElementById("codigo_recuperacao");

        if (!codigoInput) {
            throw new Error("Campo de código não encontrado.");
        }

        const codigo = codigoInput.value.trim();
        const email = localStorage.getItem("email_recuperacao");

        if (!email) {
            throw new Error("E-mail de recuperação não encontrado.");
        }

        const resposta = await fetch(`${URL_base}/credential/validar_codigo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                codigo
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

    static async alterar_senha() {
        const senhaInput = document.getElementById("nova_senha");
        const confirmarSenhaInput = document.getElementById("confirmar_nova_senha");

        if (!senhaInput || !confirmarSenhaInput) {
            throw new Error("Campos de senha não encontrados.");
        }

        const senha = senhaInput.value;
        const confirmarSenha = confirmarSenhaInput.value;

        if (senha !== confirmarSenha) {
            throw new Error("As senhas não correspondem.");
        }

        const email = localStorage.getItem("email_recuperacao");

        if (!email) {
            throw new Error("E-mail de recuperação não encontrado.");
        }

        const resposta = await fetch(`${URL_base}/credential/alterar_senha`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                senha
            })
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(
                erro.erro ??
                `Erro HTTP: ${resposta.status}`
            );
        }

        localStorage.removeItem("email_recuperacao");
    }
}


///////////////////////////////


window.addEventListener("DOMContentLoaded", () => {
    definir_formulario(
        "form_login_local",
        () => Login.login_local(),
        null,
        null,
        "Login realizado com sucesso!"
    );

    definir_formulario(
        "form_cadastro",
        () => Login.cadastro_local(),
        "modal_cadastro",
        null,
        "Conta criada com sucesso!"
    );

    definir_formulario(
        "form_recuperar_senha",
        () => Recuperar_Senha.solicitar_recuperacao_senha(),
        "modal_recuperar_senha",
        "modal_validar_codigo_recuperacao",
        "Código enviado para seu e-mail!"
    );

    definir_formulario(
        "form_validar_codigo_recuperacao",
        () => Recuperar_Senha.validar_codigo(),
        "modal_validar_codigo_recuperacao",
        "modal_nova_senha",
        "Código validado!"
    );

    definir_formulario(
        "form_nova_senha",
        () => Recuperar_Senha.alterar_senha(),
        "modal_nova_senha",
        null,
        "Senha alterada com sucesso!"
    );

    ////////////////

    definir_modal("modal_cadastro", "abrir_cadastro");
    definir_modal("modal_recuperar_senha", "abrir_recuperar_senha");
    definir_modal("modal_validar_codigo_recuperacao");
    definir_modal("modal_nova_senha");

});

window.login_google = (response) => {Login.login_google(response).catch(erro => {
    console.error("Erro no login Google:", erro);
    alert("Erro no login Google");
});};