let ultimoTreino = { distancia: "Aguardando...", tempo: "Aguardando...", data: "" };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    // Mostra exatamente o que o Make enviou nos logs da Vercel
    console.log("CORPO RECEBIDO DO MAKE:", JSON.stringify(req.body));

    let dados = req.body || {};
    if (typeof dados === 'string') {
      try { dados = JSON.parse(dados); } catch (e) {}
    }

    // Tenta capturar os valores de forma totalmente flexível
    ultimoTreino = {
      distancia: dados.distancia || dados.distance || dados.dist || Object.values(dados)[0] || 'N/A',
      tempo: dados.tempo || dados.moving_time || dados.duration || dados.time || Object.values(dados)[1] || 'N/A',
      data: new Date().toLocaleTimeString('pt-BR')
    };

    return res.status(200).json({
      sucesso: true,
      recebido: dados,
      dados: ultimoTreino
    });
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      sucesso: true,
      dados: ultimoTreino
    });
  }
}
