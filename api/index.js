let ultimoTreino = { distancia: "0.00 km", tempo: "00:00", data: "" };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'POST') {
      let dados = {};
      
      try {
        if (req.body) {
          if (typeof req.body === 'string') {
            dados = JSON.parse(req.body);
          } else {
            dados = req.body;
          }
        }
      } catch (e) {
        dados = {};
      }

      const rawDist = String(dados.distancia || dados.distance || dados.dist || "0");
      const rawTempo = String(dados.tempo || dados.moving_time || dados.duration || dados.time || "00:00");

      let distNum = 0;
      try {
        distNum = parseFloat(rawDist.replace(/[^\d.]/g, '')) || 0;
        if (distNum > 100) {
          distNum = distNum / 1000;
        }
      } catch (e) {
        distNum = 0;
      }

      ultimoTreino = {
        distancia: `${distNum.toFixed(2)} km`,
        tempo: rawTempo.trim(),
        data: new Date().toLocaleTimeString('pt-BR')
      };

      return res.status(200).json({
        sucesso: true,
        dados: ultimoTreino
      });
    }

    if (req.method === 'GET') {
      return res.status(200).json({
        sucesso: true,
        dados: ultimoTreino
      });
    }

    return res.status(405).json({ sucesso: false, erro: "Método não permitido" });

  } catch (erro) {
    return res.status(200).json({ 
      sucesso: true, 
      dados: ultimoTreino, 
      aviso: "Recuperado de excepção interna" 
    });
  }
}
