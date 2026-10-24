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
      
      if (req.body) {
        if (typeof req.body === 'string') {
          try { dados = JSON.parse(req.body); } catch (e) { dados = {}; }
        } else {
          dados = req.body;
        }
      }

      const rawDist = String(dados.distancia || dados.distance || dados.dist || "0");
      const rawTempo = String(dados.tempo || dados.moving_time || dados.duration || dados.time || "00:00");

      let distNum = parseFloat(rawDist.replace(/[^\d.]/g, '')) || 0;
      if (distNum > 100) {
        distNum = distNum / 1000;
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
  } catch (erro) {
    return res.status(500).json({ sucesso: false, erro: erro.message });
  }
}
