async function handle_credential(response: google.accounts.id.CredentialResponse): Promise<void> {

    const token = response.credential;

    if (!token) {
        throw new Error("Token não recebido.");
    }

    const resposta = await fetch(
        "http://localhost:3000/auth/google",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
            }),
        }
    );

    const usuario = await resposta.json();

}

async function acessar_dispositivos(){
    
}
