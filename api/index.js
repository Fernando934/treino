export default async function handler(req, res) {
  // Configuração de CORS para permitir requisições de qualquer origem
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Resposta para testes via navegador (GET) ou envio de dados (POST)
  const dadosRecebidos = req.body || {};

  return res.status(200).json({
    sucesso: true,
    mensagem: "API rodando com sucesso!",
    dados: dadosRecebidos
  });
}
