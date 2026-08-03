
class Dados_Dispositivo {

    static grafico_ruido = null;
    static grafico_humidade = null;
    static grafico_temperatura = null;
    static grafico_peso = null;


    static async carregar_dados() {

        try {

            const token = localStorage.getItem("token");
            const chave_dispositivo =
                localStorage.getItem("dispositivo_atual");


            if (!token || !chave_dispositivo) {
                throw new Error("Dispositivo não selecionado");
            }


            const resposta = await fetch(
                "http://localhost:3000/dados_leitura/list_by_chavedispositivo",
                {
                    method: "POST",

                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        chave_dispositivo: chave_dispositivo
                    })
                }
            );


            if (!resposta.ok) {

                let erro;

                try {
                    erro = await resposta.json();
                } catch {
                    erro = {};
                }

                throw new Error(
                    erro.erro || `Erro HTTP: ${resposta.status}`
                );
            }


            const dados = await resposta.json();

            const leituras = dados.results;


            if (!Array.isArray(leituras)) {
                throw new Error(
                    "A resposta da API não contém um array em 'results'."
                );
            }


            this.processar_dados(leituras);

        } catch (erro) {

            console.error(
                "Erro ao carregar dados:",
                erro
            );
        }
    }


    static processar_dados(leituras) {

        const filtrar_sortear = (tipo_sensor) => {

            return leituras
                .filter(item => item.sensor === tipo_sensor)
                .sort((a, b) => a.vez_lida - b.vez_lida);
        };


        const temperatura =
            filtrar_sortear("temperatura");

        const humidade =
            filtrar_sortear("humidade");

        const peso =
            filtrar_sortear("peso");

        const ruido =
            filtrar_sortear("ruido");


        this.atualizar_grafico(
            "grafico_temperatura",
            "Temperatura",
            temperatura.map(d => d.vez_lida.toString()),
            temperatura.map(d => Number(d.valor)),
            "grafico_temperatura"
        );


        this.atualizar_grafico(
            "grafico_humidade",
            "Humidade",
            humidade.map(d => d.vez_lida.toString()),
            humidade.map(d => Number(d.valor)),
            "grafico_humidade"
        );


        this.atualizar_grafico(
            "grafico_peso",
            "Peso",
            peso.map(d => d.vez_lida.toString()),
            peso.map(d => Number(d.valor)),
            "grafico_peso"
        );


        this.atualizar_grafico(
            "grafico_ruido",
            "Ruído",
            ruido.map(d => d.vez_lida.toString()),
            ruido.map(d => Number(d.valor)),
            "grafico_ruido"
        );
    }


    static atualizar_grafico(
        canvas_id,
        titulo,
        labels,
        valores,
        propriedade
    ) {

        const grafico = this[propriedade];


        // Se o gráfico já existe,
        // apenas atualiza os dados.
        if (grafico) {

            grafico.data.labels = labels;

            grafico.data.datasets[0].data =
                valores;

            grafico.update();

            return;
        }


        const canvas =
            document.getElementById(canvas_id);


        if (!canvas) {

            console.error(
                `Canvas "${canvas_id}" não encontrado.`
            );

            return;
        }


        this[propriedade] = new Chart(
            canvas,
            {
                type: "line",

                data: {

                    labels: labels,

                    datasets: [
                        {
                            label: titulo,

                            data: valores,

                            borderWidth: 2,

                            tension: 0.3
                        }
                    ]
                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false
                }
            }
        );
    }
}


window.addEventListener(
    "DOMContentLoaded",
    () => {

        async function rodarLoop() {

            await Dados_Dispositivo.carregar_dados();

            setTimeout(
                rodarLoop,
                5000
            );
        }


        rodarLoop();
    }
);
