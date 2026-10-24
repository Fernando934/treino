let ultimoTreino = { distancia: "Aguardando treino...", tempo: "Aguardando treino..." };

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

    // Se o Make enviar os dados como string, tenta fazer parse
    if (typeof dados === 'string') {
      try {
        dados = JSON.parse(dados);
      } catch (e) {
        dados = {};
      }
    }

    // Atualiza com os valores limpos
    ultimoTreino = {
      distancia: dados.distancia || dados.distance || 'N/A',
      tempo: dados.tempo || dados.moving_time || 'N/A',
      data: new Date().toLocaleTimeString('pt-BR')
    };

    return res.status(200).json({
      sucesso: true,
      mensagem: "Treino registrado!",
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
