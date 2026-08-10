import { definir_formulario, definir_modal } from "./functions.js";
import { URL_base } from "./url.js";

class Home {
    static async associar_dispositivo() {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("Usuário não autenticado");
            }

            const chave_input = document.getElementById("chave_dispositivo");
            const senha_input = document.getElementById("senha_dispositivo");

            if (!chave_input || !senha_input) {
                throw new Error("Campos de chave ou senha do dispositivo não encontrados.");
            }

            const chave = chave_input.value.trim();
            const senha = senha_input.value.trim();

            const resposta = await fetch(`${URL_base}/dispositivo/associar`,{
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    chave: chave,
                    senha: senha
                })
            });

            if (!resposta.ok) {
                const erro = await resposta.json();

                throw new Error(
                    erro.erro ?? `Erro HTTP: ${resposta.status}`
                );
            }

        } catch (erro) {
            console.error(
                "Erro ao associar dispositivo", erro
            );
        }

        await Home.listar_dispositivos();
    }

    static async listar_dispositivos() {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("Usuário não autenticado");
            }

            const resposta = await fetch(`${URL_base}/dispositivo/list_by_idusuario`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!resposta.ok) {
                const erro = await resposta.json();

                throw new Error(
                    erro.erro ?? `Erro HTTP: ${resposta.status}`
                );
            }

            const dados = await resposta.json();
            const dispositivos = dados.results;
            const lista = document.getElementById("lista_dispositivos");

            if (!lista) { return }

            lista.replaceChildren();

            const fragment = document.createDocumentFragment();

            for (const dispositivo of dispositivos) {
                const card = document.createElement("div");
                const h3 = document.createElement("h3");
                const btn_excluir = document.createElement("button");
                const btn_dados = document.createElement("button");

                h3.textContent = dispositivo.chave;
                btn_excluir.textContent = "Excluir";
                btn_dados.textContent = "Ver Dados";

                btn_excluir.addEventListener("click", async () => {
                    await Home.excluir_dispositivo(dispositivo.chave);
                    await Home.listar_dispositivos();
                });

                btn_dados.addEventListener("click",
                    async () => {
                        await Home.acessar_dados_dispositivo(dispositivo.chave);
                    }
                );

                card.append(h3, btn_excluir, btn_dados);
                card.classList.add("card-dispositivo");

                fragment.appendChild(card);
            }

            lista.appendChild(fragment);
        } catch (erro) {
            console.error(
                "Erro ao listar dispositivos:", erro
            );
        }
    }

    static async excluir_dispositivo(chave) {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error(
                    "Usuário não autenticado"
                );
            }

            const resposta = await fetch(`${URL_base}/dispositivo/delete`,{
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        chave: chave
                    })
                }
            );

            if (!resposta.ok) {
                const erro = await resposta.json();

                throw new Error(
                    erro.erro ?? `Erro HTTP: ${resposta.status}`
                );
            }

        } catch (erro) {
            console.error(
                "Erro ao excluir dispositivo:",
                erro
            );
        }
    }

    static async acessar_dados_dispositivo(chave) {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error(
                    "Usuário não autenticado"
                );
            }

            localStorage.setItem("dispositivo_atual", chave);

            window.location.href = "/dados_dispositivo";
        } catch (erro) {
            console.error(
                "Erro ao acessar dados:", erro
            );
        }
    }
}

window.addEventListener("DOMContentLoaded",() => {
    definir_formulario(
        "form_associar_dispositivo",
        () => Home.associar_dispositivo(),
        "modal_associar_dispositivo",
        null,
        "Dispositivo associado com sucesso!"
    );
    definir_modal("modal_associar_dispositivo", "abrir_associar_dispositivo");

    Home.listar_dispositivos();

    const voltar_login = document.getElementById("voltar_login");

    voltar_login.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "/";

        localStorage.removeItem("token");
    });
});