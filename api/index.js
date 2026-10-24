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
    // Tenta apanhar os dados do corpo ou dos parâmetros de query
    let dados = req.body || {};
    
    if (typeof dados === 'string') {
      try { dados = JSON.parse(dados); } catch (e) { dados = {}; }
    }

    // Se o corpo estiver vazio, tenta ler o query string por segurança
    if (!dados || Object.keys(dados).length === 0) {
      dados = req.query || {};
    }

    console.log("DADOS RECEBIDOS:", JSON.stringify(dados));

    ultimoTreino = {
      distancia: dados.distancia || dados.distance || dados.dist || 'N/A',
      tempo: dados.tempo || dados.moving_time || dados.duration || dados.time || 'N/A',
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
