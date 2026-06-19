interface IDispositivo {
    id_usuario: number;
    chave: string;
}

async function listar_dispositivos(): Promise<void> {
    try {
        const token = localStorage.getItem("token");

        if (!token) throw new Error("Usuário não autenticado");

        const resposta = await fetch("http://localhost:3000/dispositivo/read",{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const dispositivos: IDispositivo[] = await resposta.json();

        const lista = document.getElementById("lista_dispositivo");
        if (!lista) return;

        lista.replaceChildren();

        const fragment = document.createDocumentFragment();

        for (const dispositivo of dispositivos) {

            const card = document.createElement("div");
            const h3 = document.createElement("h3");
            const btnExcluir = document.createElement("button");
            const btnDados = document.createElement("button");

            h3.textContent = dispositivo.chave;
            btnExcluir.textContent = "Excluir";
            btnDados.textContent = "Ver Dados";

            btnExcluir.addEventListener("click", async () => {
                await excluir_dispositivo(dispositivo.chave);
                await listar_dispositivos();
            });

            btnDados.addEventListener("click", async () => {
                await acessar_dados_dispositivo(dispositivo.chave);
            });

            card.append(h3, btnExcluir, btnDados);
            card.classList.add("card-dispositivo");

            fragment.appendChild(card);
        }

        lista.appendChild(fragment);

    } catch (erro) {
        console.error("Erro ao listar dispositivos:", erro);
    }
}


async function excluir_dispositivo(chave: string): Promise<void> {
    try {
        const token = localStorage.getItem("token");

        const resposta = await fetch(`http://localhost:3000/dispositivo/${chave}`,{
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

    } catch (erro) {
        console.error("Erro ao excluir dispositivo:", erro);
    }
}


async function acessar_dados_dispositivo(chave: string): Promise<void> {
    try {
        const token = localStorage.getItem("token");

        if (!token) throw new Error("Usuário não autenticado");

        localStorage.setItem("dispositivo_atual", chave);

        const resposta = await fetch(`http://localhost:3000/dados_dispositivo/${chave}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const dados = await resposta.json();
        console.log(dados);

    } catch (erro) {
        console.error("Erro ao acessar dados:", erro);
    }
}


window.addEventListener("DOMContentLoaded", () => {
    listar_dispositivos();
});