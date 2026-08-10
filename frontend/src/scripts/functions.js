export function definir_formulario(formId, acao, modal_fechar_id, modal_abrir_id, mensagem) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        try {
            await acao();

            alert(mensagem);
            form.reset();

            if (modal_fechar_id){
                const modal_fechar = document.getElementById(modal_fechar_id);
                if (modal_fechar) { modal_fechar.style.display = "none";}
            }

            if (modal_abrir_id) {
                const modal_abrir = document.getElementById(modal_abrir_id);
                if (modal_abrir) { modal_abrir.style.display = "flex";}
            }

        } catch (erro) {
            console.error(erro);
            alert("Ocorreu um erro.");
        }
    });
}

export function definir_modal(modal_id, abrir_id) {
    const modal = document.getElementById(modal_id);
    if (!modal) return;

    const fechar = modal.querySelector(".fechar");

    if (abrir_id) {
        const abrir = document.getElementById(abrir_id);

        abrir.addEventListener("click", (e) => {
            e.preventDefault();
            modal.style.display = "flex";
        });

        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    if (fechar) {
        fechar.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }
}