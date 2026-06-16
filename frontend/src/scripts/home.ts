interface IDispositivo {
    id: number;
    chave: string;
}

async function listar_dispositivos(): Promise<void> {
    try {
        const resposta = await fetch(
            "http://localhost:3000/dispositivo/read"
        );

        if (!resposta.ok) {
            throw new Error(
                `Erro HTTP: ${resposta.status}`
            );
        }

        const dispositivos: IDispositivo[] =
            await resposta.json();

        const lista = document.getElementById("lista-dispositivo");

        if (!lista) return;

        lista.replaceChildren();

        const fragment = document.createDocumentFragment();

        for (const dispositivo of dispositivos) {

            const card = document.createElement("div");

            const chave = document.createElement("h3");

            const btn_excluir = document.createElement("button");

            const btn_dados = document.createElement("button");

            chave.textContent = dispositivo.chave;

            btn_excluir.addEventListener(
                "click",
                () => excluir_dispositivo(dispositivo.id)
            );

            btn_dados.addEventListener(
                "click",
                () => dados_dispositivo(dispositivo.id)
            );

            card.append(
                chave,
                btn_excluir,
                btn_dados,
            );

            card.classList.add("card-dispositivo");
            chave.classList.add("btn_excluir");
            chave.classList.add("btn_dados");

            fragment.appendChild(card);
        }

        lista.appendChild(fragment);

    } catch (erro) {

        console.error(
            "Erro ao listar dispositivos:",
            erro
        );

    }
}

window.addEventListener(
    "DOMContentLoaded",
    listar_dispositivos
);