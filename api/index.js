// Variável armazenada em memória no servidor (persiste entre requisições quentes)
let ultimoTreino = null;

export default async function handler(req, res) {
  // Configurações de CORS
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

  // Se o Make enviar dados via POST:
  if (req.method === 'POST') {
    const dados = req.body || {};
    
    // Atualiza o treino guardado
    ultimoTreino = {
      distancia: dados.distancia || 'N/A',
      tempo: dados.tempo || 'N/A',
      data: new Date().toLocaleString('pt-BR')
    };

    return res.status(200).json({
      sucesso: true,
      mensagem: "Treino recebido e salvo na API!",
      dados: ultimoTreino
    });
  }

  // Se a página web (index.html) consultar via GET:
  if (req.method === 'GET') {
    return res.status(200).json({
      sucesso: true,
      dados: ultimoTreino
    });
  }
}
