class Login{
    constructor(){}

    public static async login_google(response: google.accounts.id.CredentialResponse): Promise<void> {
        const token = response.credential;

        if (!token) {
            throw new Error("Token não recebido.");
        }

        const resposta = await fetch("http://localhost:3000/credential/login_google", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.erro ?? `Erro HTTP: ${resposta.status}`);
        }

        const dados = await resposta.json();

        if (!dados.token) {
            throw new Error("Token não recebido");
        }

        localStorage.setItem("token", dados.token);

        window.location.href = "/home";
    }

    public static async login_local(): Promise<void> {
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const senha = (document.getElementById("senha") as HTMLInputElement).value;

        const resposta = await fetch("http://localhost:3000/credential/login_local",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    senha
                }),
            }
        );

        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.erro ?? `Erro HTTP: ${resposta.status}`);
        }

        const dados = await resposta.json();

        localStorage.setItem("token", dados.token);
        window.location.href = "/home";
    }
};

window.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form_login_local");

    if (form instanceof HTMLFormElement) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            await Login.login_local();
        });
    }
});

(window as any).login_google = Login.login_google;