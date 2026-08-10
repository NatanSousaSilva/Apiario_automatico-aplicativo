class Dashboard {
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
}

document.addEventListener("DOMContentLoaded",() => {
    Dashboard.carregar();
});

document.getElementById("btn_sair")?.addEventListener("click",() => {
    localStorage.removeItem("token");
    window.location.href = "/login.html";
});