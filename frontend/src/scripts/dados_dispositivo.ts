import { IDados_Leitura } from "../interfaces/dados_leitura";

declare const Chart: any;

class Dados_Dispositivo {
    private static graficoRuido: any;
    private static graficoHumidade: any;
    private static graficoTemperatura: any;
    private static graficoPeso: any;

    public static async carregar_dados(): Promise<void> {
        try {

            const token = localStorage.getItem("token");
            const chave = localStorage.getItem("dispositivo_atual");

            if (!token || !chave) {
                throw new Error("Dispositivo não selecionado");
            }

            const resposta = await fetch(
                `http://localhost:3000/dados_leitura/list_by_chave`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                }
            );

            if (!resposta.ok) {
                throw new Error(`Erro HTTP: ${resposta.status}`);
            }

            const leituras: IDados_Leitura[] = await resposta.json();

            this.processar_dados(leituras);

        } catch (erro) {
            console.error(erro);
        }
    }

    private static processar_dados(leituras: IDados_Leitura[]): void {
        const temperatura = leituras.filter(item => item.sensor === "temperatura")
            .sort((a, b) => a.vez_lida - b.vez_lida);

        const humidade = leituras.filter(item => item.sensor === "humidade")
            .sort((a, b) => a.vez_lida - b.vez_lida);

        const peso = leituras.filter(item => item.sensor === "peso")
            .sort((a, b) => a.vez_lida - b.vez_lida);

        const ruido = leituras.filter(item => item.sensor === "ruido")
            .sort((a, b) => a.vez_lida - b.vez_lida);

        this.atualizar_grafico(
            "grafico_temperatura",
            "Temperatura",
            temperatura.map(d => d.vez_lida.toString()),
            temperatura.map(d => Number(d.valor)),
            "graficoTemperatura"
        );

        this.atualizar_grafico(
            "grafico_humidade",
            "Humidade",
            humidade.map(d => d.vez_lida.toString()),
            humidade.map(d => Number(d.valor)),
            "graficoHumidade"
        );

        this.atualizar_grafico(
            "grafico_peso",
            "Peso",
            peso.map(d => d.vez_lida.toString()),
            peso.map(d => Number(d.valor)),
            "graficoPeso"
        );

        this.atualizar_grafico(
            "grafico_ruido",
            "Ruído",
            ruido.map(d => d.vez_lida.toString()),
            ruido.map(d => Number(d.valor)),
            "graficoRuido"
        );
    }

    private static atualizar_grafico(canvas_id: string, titulo: string, labels: string[], valores: number[], propriedade: string): void {
        const grafico = (this as any)[propriedade];

        if (grafico) {
            grafico.data.labels = labels;
            grafico.data.datasets[0].data = valores;
            grafico.update();

            return;
        }

        const canvas = document.getElementById(
            canvas_id
        ) as HTMLCanvasElement;

        if (!canvas) return;

        (this as any)[propriedade] = new Chart(canvas, {
            type: "line",
            data: {
                labels,
                datasets: [{
                    label: titulo,
                    data: valores,
                    borderWidth: 2,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
}

window.addEventListener("DOMContentLoaded", async () => {
    await Dados_Dispositivo.carregar_dados();

    setInterval(async () => {
        await Dados_Dispositivo.carregar_dados();
    }, 5000);

});