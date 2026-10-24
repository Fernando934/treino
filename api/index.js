async function carregarDadosTreino() {
  try {
    const resposta = await fetch('/api');
    const json = await resposta.json();

    if (json.sucesso && json.dados) {
      const { distancia, tempo } = json.dados;

      // Se a distância vier limpa da API (ex: "15.00 km") ou como número
      let distTexto = distancia || "0.00 km";
      let tempoTexto = tempo || "00:00";

      // 1. Atualizar cartões do topo (certifica-te de que os IDs coincidem com o teu HTML)
      const elDistancia = document.getElementById('distancia') || document.querySelector('.distancia');
      const elTempo = document.getElementById('tempo') || document.querySelector('.tempo');

      if (elDistancia) elDistancia.textContent = distTexto;
      if (elTempo) elTempo.textContent = tempoTexto;

      // 2. Atualizar a mensagem de status da análise técnica
      const elStatus = document.querySelector('.analise-status') || document.getElementById('status');
      if (elStatus && distancia !== "0.00 km") {
        elStatus.textContent = `Último treino recebido: ${distTexto} em ${tempoTexto}.`;
      }
    }
  } catch (erro) {
    console.error("Erro ao procurar dados na API:", erro);
  }
}

// Procura os dados assim que a página carrega e atualiza a cada 5 segundos
document.addEventListener('DOMContentLoaded', () => {
  carregarDadosTreino();
  setInterval(carregarDadosTreino, 5000);
});
