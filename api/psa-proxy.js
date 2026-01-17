export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { certId } = req.query;

  if (!certId) {
    return res.status(400).json({ error: 'certId is required' });
  }

  try {
    const PSA_TOKEN = process.env.PSA_TOKEN;
    
    const response = await fetch(
      `https://api.psacard.com/publicapi/cert/GetByCertNumber/${certId}`,
      {
        headers: {
          'Authorization': `bearer ${PSA_TOKEN}`,
          'User-Agent': 'Mozilla/5.0'
        }
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: 'PSA API error',
        status: response.status 
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
