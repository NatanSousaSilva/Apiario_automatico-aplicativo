import { IDados_Leitura } from "../interfaces/dados_leitura";

import Chart from "chart.js/auto";

type Grafico =
    | "grafico_temperatura"
    | "grafico_humidade"
    | "grafico_peso"
    | "grafico_ruido";

class Dados_Dispositivo {
    private static grafico_ruido: Chart<"line"> | null = null;
    private static grafico_humidade: Chart<"line"> | null = null;
    private static grafico_temperatura: Chart<"line"> | null = null;
    private static grafico_peso: Chart<"line"> | null = null;

    public static async carregar_dados(): Promise<void> {
        try {
            const token = localStorage.getItem("token");
            const chave_dispositivo = localStorage.getItem("dispositivo_atual");

            if (!token || !chave_dispositivo) {
                throw new Error("Dispositivo não selecionado");
            }

            const resposta = await fetch(`http://localhost:3000/dados_leitura/list_by_chavedispositivo`,{
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    chave_dispositivo
                })
            });

            if (!resposta.ok) {
                const erro = await resposta.json();
                throw new Error(erro.erro ?? `Erro HTTP: ${resposta.status}`);
            }

            const dados = await resposta.json();
            const leituras: IDados_Leitura[] = dados.results;

            this.processar_dados(leituras);

        } catch (erro) {
            console.error(erro);
        }
    }

    private static processar_dados(leituras: IDados_Leitura[]): void {
        const filtrar_sortear = (tipo_sensor: string) => {
            return leituras
                .filter(item => item.sensor === tipo_sensor)
                .sort((a, b) => a.vez_lida - b.vez_lida);
        };

        const temperatura = filtrar_sortear("temperatura");
        const humidade = filtrar_sortear("humidade");
        const peso = filtrar_sortear("peso");
        const ruido = filtrar_sortear("ruido");

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

    private static atualizar_grafico(canvas_id: string, titulo: string, labels: string[], valores: number[], propriedade: Grafico): void {
        const grafico = this[propriedade];

        if (grafico) {
            grafico.data.labels = labels;
            grafico.data.datasets[0].data = valores;
            grafico.update();
            return;
        }

        const canvas = document.getElementById(canvas_id) as HTMLCanvasElement;

        if (!canvas) return;

        this[propriedade] = new Chart(canvas, {
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

window.addEventListener("DOMContentLoaded", () => {
    async function rodarLoop() {
        await Dados_Dispositivo.carregar_dados();
        setTimeout(rodarLoop, 5000);
    }
    
    rodarLoop();
});