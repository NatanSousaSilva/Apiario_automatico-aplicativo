import { definir_formulario, definir_modal } from "./functions";


class Dashboard_Exibicao {
    static async carregar_usuarios() {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("Token não encontrado.");
            }

            const resposta = await fetch("http://localhost:3000/usuario/list",{
                    method: "GET",

                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!resposta.ok) {
                let erro = {};

                try {
                    erro = await resposta.json();
                } catch {}

                throw new Error(
                    erro.erro ||
                    erro.message ||
                    `Erro HTTP: ${resposta.status}`
                );
            }

            const dados = await resposta.json();

            console.log("Usuários recebidos:", dados);

            const usuarios = dados.results;


            if (!Array.isArray(usuarios)) {

                throw new Error(
                    "A API não retornou um array em 'results'."
                );

            }


            this.mostrar_usuarios(usuarios);

        } catch (erro) {
            console.error(
                "Erro ao carregar usuários:",
                erro
            );

            document.getElementById("tabela_usuarios").innerHTML = 
            `   <tr>
                    <td colspan="4">
                        Erro ao carregar usuários.
                    </td>
                </tr>
            `;
        }

    }


    static mostrar_usuarios(usuarios) {
        const tabela = document.getElementById("tabela_usuarios");

        document.getElementById("quantidade_usuarios").textContent = usuarios.length;

        tabela.innerHTML = "";

        if (usuarios.length === 0) {
            tabela.innerHTML = `
                <tr>
                    <td colspan="4">
                        Nenhum usuário encontrado.
                    </td>
                </tr>
            `;

            return;
        }

        usuarios.forEach(usuario => {
            const tr = document.createElement("tr");
            const perfil = usuario.admin ? "Administrador" : "Usuário";

            tr.innerHTML = `
                <td>
                    ${usuario.nome ?? "Sem nome"}
                </td>

                <td>
                    ${usuario.email ?? "Sem e-mail"}
                </td>

                <td>
                    ${perfil}
                </td>

                <td>

                    <button
                        class="editar"
                        data-id="${usuario.id}">
                        Editar
                    </button>

                    <button
                        class="remover"
                        data-id="${usuario.id}">
                        Remover
                    </button>

                </td>

            `;
            tabela.appendChild(tr);
        });

    }

    static async carregar_dispositivos() {
        try {
            const token =
                localStorage.getItem("token");

            if (!token) {
                throw new Error(
                    "Token não encontrado."
                );
            }

            const resposta = await fetch("http://localhost:3000/dispositivo/list",{
                method: "GET",
                headers: {
                    "Authorization":
                        `Bearer ${token}`,

                    "Content-Type":
                        "application/json"
                }
            });

            if (!resposta.ok) {
                let erro = {};

                try {
                    erro = await resposta.json();
                } catch {}

                throw new Error(
                    erro.erro ||
                    erro.message ||
                    `Erro HTTP: ${resposta.status}`
                );

            }

            const dados = await resposta.json();

            console.log( "Dispositivos recebidos:", dados);

            const dispositivos = dados.results;

            if (!Array.isArray(dispositivos)) {
                throw new Error(
                    "A API não retornou um array em 'results'."
                );
            }

            this.mostrar_dispositivos(dispositivos);

        } catch (erro) {
            console.error(
                "Erro ao carregar dispositivos:",
                erro
            );

            document.getElementById("tabela_dispositivos").innerHTML = `
                <tr>
                    <td colspan="3">
                        Erro ao carregar dispositivos.
                    </td>
                </tr>

            `;

        }

    }

    static mostrar_dispositivos(dispositivos) {
        const tabela = document.getElementById("tabela_dispositivos");

        document.getElementById("quantidade_dispositivos").textContent = dispositivos.length;

        tabela.innerHTML = "";

        if (dispositivos.length === 0) {
            tabela.innerHTML = `
                <tr>
                    <td colspan="3">
                        Nenhum dispositivo encontrado.
                    </td>
                </tr>
            `;
            return;
        }

        dispositivos.forEach(dispositivo => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>
                    ${
                        dispositivo.chave_dispositivo
                        ?? "Sem chave"
                    }
                </td>

                <td>
                    ${
                        dispositivo.usuario?.nome
                        ??
                        dispositivo.dono
                        ??
                        "Sem dono"
                    }
                </td>

                <td>
                    <button
                        class="editar"
                        data-id="${dispositivo.id}">
                        Editar
                    </button>

                    <button
                        class="remover"
                        data-id="${dispositivo.id}">
                        Remover
                    </button>
                </td>
            `;
            tabela.appendChild(tr);
        }
    );}

    static async carregar() {
        await Promise.all([
            this.carregar_usuarios(),
            this.carregar_dispositivos()
        ]);
    }
};

class Dashboard_Controle {
    /*
    static async cadastro_admin() {
        const nome_input = document.getElementById("nome_cadastro_admin");
        const email_input = document.getElementById("email_cadastro_admin");
        const senha_input = document.getElementById("senha_cadastro_admin");

        if (!email_input || !senha_input || !nome_input) {
            throw new Error("Campos de email ou senha ou nome não encontrados.");
        }

        const nome = nome_input.value.trim();
        const email = email_input.value.trim();
        const senha = senha_input.value;

        const resposta = await fetch(`${URL_base}/usuario/create`,{
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

    } */

    static async cadastro_dispositivo() {
        const chave_input = document.getElementById("chave_cadastro_dispositivo");
        const senha_input = document.getElementById("senha_cadastro_dispositivo");

        if (!chave_input || !senha_input) {
            throw new Error("Campos de email ou senha ou nome não encontrados.");
        }

        const chave = chave_input.value.trim();
        const senha = senha_input.value;

        const resposta = await fetch(`${URL_base}/dispositivo/create`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chave: chave,
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
};

window.addEventListener("DOMContentLoaded",() => {
    definir_formulario(
        "form_cadastrar_dispositivo",
        () => Dashboard_Controle.associar_dispositivo(),
        "modal_cadastrar_dispositivo",
        null,
        "Dispositivo cadastrado com sucesso!"
    );
    definir_modal("modal_cadastrar_dispositivo", "cadastrar_dispositivo");

    Dashboard_Exibicao.carregar();    

    const btn_sair = document.getElementById("btn_sair");
    btn_sair.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "/";

        localStorage.removeItem("token");
    });

});