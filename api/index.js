let ultimoTreino = { distancia: "0.00 km", tempo: "00:00", data: "" };

// Função para gerar a periodização da semana com base no dia atual
function gerarPeriodizacaoSemanal() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  // Lógica para variar o foco semanal de forma progressiva
  const semanaDoAno = Math.floor((hoje - new Date(ano, 0, 1)) / (7 * 24 * 60 * 60 * 1000));
  
  // Alterna blocos de treino a cada semana para evitar platô
  const ciclos = [
    {
      focoGeral: "Desenvolvimento Aeróbico e Base (Bloco A)",
      dias: [
        { dia: "Segunda", tipo: "Corrida Contínua (Z2)", meta: "5.0 km", assessor: "Manter FC estável em Zona 2." },
        { dia: "Terça", tipo: "Fortalecimento Miniband", meta: "40 min", assessor: "Estabilidade de joelhos e core." },
        { dia: "Quarta", tipo: "Treino Intervalado", meta: "6x 400m", assessor: "Ganho de velocidade e VO2." },
        { dia: "Quinta", tipo: "Descanso Total", meta: "--", assessor: "Recuperação tecidual profunda." },
        { dia: "Sexta", tipo: "Rodagem Regenerativa", meta: "4.0 km", assessor: "Soltar as pernas bem leve." },
        { dia: "Sábado", tipo: "Longão Progressivo", meta: "9.0 km", assessor: "Resistência e gestão de ritmo." },
        { dia: "Domingo", tipo: "Descanso Total", meta: "--", assessor: "Supercompensação completa." }
      ]
    },
    {
      focoGeral: "Ganho de Limiar e Potência (Bloco B)",
      dias: [
        { dia: "Segunda", tipo: "Rodagem Limiar (Z3/Z4)", meta: "6.0 km", assessor: "Foco em sustentação de pace." },
        { dia: "Terça", tipo: "Fortalecimento Miniband", meta: "40 min", assessor: "Foco em cadeia posterior e glúteos." },
        { dia: "Quarta", tipo: "TI Curto (Velocidade)", meta: "8x 200m", assessor: "Potência anaeróbica e passada." },
        { dia: "Quinta", tipo: "Descanso Total", meta: "--", assessor: "Recuperação e mobilidade." },
        { dia: "Sexta", tipo: "Rodagem Leve", meta: "5.0 km", assessor: "Recuperação ativa." },
        { dia: "Sábado", tipo: "Longão em Z2", meta: "10.0 km", assessor: "Volume e eficiência aeróbica." },
        { dia: "Domingo", tipo: "Descanso Total", meta: "--", assessor: "Descanso e preparação mental." }
      ]
    }
  ];

  return ciclos[semanaDoAno % ciclos.length];
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'POST') {
      let dados = {};
      if (req.body) {
        dados = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      }

      const rawDist = String(dados.distancia || dados.distance || dados.dist || "0");
      const rawTempo = String(dados.tempo || dados.moving_time || dados.duration || dados.time || "00:00");

      let distNum = parseFloat(rawDist.replace(/[^\d.]/g, '')) || 0;
      if (distNum > 100) distNum = distNum / 1000;

      ultimoTreino = {
        distancia: `${distNum.toFixed(2)} km`,
        tempo: rawTempo.trim(),
        data: new Date().toLocaleTimeString('pt-BR')
      };
    }

    if (req.method === 'GET') {
      const periodoAtual = gerarPeriodizacaoSemanal();
      return res.status(200).json({
        sucesso: true,
        dados: ultimoTreino,
        periodizazione: periodoAtual
      });
    }
  } catch (erro) {
    return res.status(500).json({ sucesso: false, erro: erro.message });
  }
}
