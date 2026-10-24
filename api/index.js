async function atualizarDashboard() {
  try {
    const resposta = await fetch('/api');
    const resultado = await resposta.json();

    if (resultado.sucesso && resultado.dados) {
      let { distancia, tempo } = resultado.dados;

      // 1. Limpa espaços e extrai apenas números de distancia
      let distNum = parseFloat(String(distancia).replace(/[^\d.]/g, '')) || 0;

      // Se o valor estiver em metros (ex: 15000.0), converte para km
      if (distNum > 100) {
        distNum = distNum / 1000;
      }

      // 2. Extrai horas/minutos do tempo recebido
      let tempoTexto = String(tempo).trim();

      // Atualiza os elementos na página (ajuste os IDs de acordo com o seu HTML)
      const elDistancia = document.getElementById('distancia') || document.querySelector('.distancia-val');
      const elTempo = document.getElementById('tempo') || document.querySelector('.tempo-val');

      if (elDistancia) elDistancia.innerText = `${distNum.toFixed(2)} km`;
      if (elTempo) elTempo.innerText = tempoTexto;
    }
  } catch (erro) {
    console.error("Erro ao atualizar o dashboard:", erro);
  }
}

// Executa a cada 5 segundos para manter o dashboard atualizado em tempo real
setInterval(atualizarDashboard, 5000);
atualizarDashboard();
