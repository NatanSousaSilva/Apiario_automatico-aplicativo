interface IDispositivo {
    id_usuario: number;
    chave: string;
}

async function listar_dispositivos(id_usuario: string): Promise<void> {
    try {
        const resposta = await fetch('http://localhost:3000/dispositivo/find_by_idusuario/${id_usuario}');

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        ///////

        const dispositivos: IDispositivo[] = await resposta.json();

        const lista = document.getElementById("lista_dispositivo");

        if (!lista) return;

        lista.replaceChildren();

        const fragment = document.createDocumentFragment();

        for (const dispositivo of dispositivos) {

            const card = document.createElement("div");
            const h3_chave = document.createElement("h3");
            const btn_excluir = document.createElement("button");
            const btn_dados = document.createElement("button");

            ///////

            h3_chave.textContent = dispositivo.chave;
            btn_excluir.textContent = "Excluir";
            btn_dados.textContent = "Ver Dados";

            btn_excluir.addEventListener(
                "click",
                async () => {
                    await excluir_dispositivo(dispositivo.chave);
                    await listar_dispositivos(id_usuario);
                }
            );

            btn_dados.addEventListener(
                "click",
                async () => await acessar_dados_dispositivo(dispositivo.chave)
            );

            ///////

            card.append(h3_chave, btn_excluir, btn_dados,);

            card.classList.add("card-dispositivo");
            btn_excluir.classList.add("btn_excluir");
            btn_dados.classList.add("btn_dados");

            fragment.appendChild(card);
        }

        lista.appendChild(fragment);

    } catch (erro) {
        console.error("Erro ao listar dispositivos:", erro);
    }
}


async function excluir_dispositivo(chave_dispositivo: string): Promise<void> {
    try{
        const resposta = await fetch('http://localhost:3000/dispositivo/delete/${chave_dispositivo}', {
            method: "DELETE",
        });

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

    } catch (erro){
        console.error("Erro ao excluir dispositivo:", erro);
    }
}


async function acessar_dados_dispositivo(chave_dispositivo: string): Promise<void> {
    try{
        localStorage.setItem("dispositivo_atual", chave_dispositivo);

        const resposta = await fetch('http://localhost:3000/dados_dispositivo')

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

    } catch (erro){
        console.error("Erro ao acessar dados:", erro);
    }
}


window.addEventListener(
    "DOMContentLoaded",
    () => {
        const id_usuario = localStorage.getItem("id_usuario_atual");

        if (id_usuario) {
            listar_dispositivos(id_usuario);
        }
    }
);