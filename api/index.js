let ultimoTreino = { distancia: "Aguardando dados...", tempo: "Aguardando dados..." };

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
    const dados = req.body || {};
    
    // Captura os dados independentemente de como o Make os nomeou
    ultimoTreino = {
      distancia: dados.distancia || dados.distance || JSON.stringify(dados) || 'N/A',
      tempo: dados.tempo || dados.moving_time || dados.duration || 'N/A',
      data: new Date().toLocaleTimeString('pt-BR')
    };

    return res.status(200).json({
      sucesso: true,
      mensagem: "Dados mapeados com sucesso!",
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
