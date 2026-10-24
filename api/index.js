let ultimoTreino = { distancia: "Aguardando...", tempo: "Aguardando...", data: "" };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    let dados = req.body || {};

    if (typeof dados === 'string') {
      try { dados = JSON.parse(dados); } catch (e) { dados = {}; }
    }

    // Captura flexível de qualquer propriedade enviada
    ultimoTreino = {
      distancia: dados.distancia || dados.distance || dados.text || 'N/A',
      tempo: dados.tempo || dados.moving_time || dados.duration || 'N/A',
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
