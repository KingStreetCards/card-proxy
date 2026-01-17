export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { certId } = req.query;

  if (!certId) {
    return res.status(400).json({ error: 'certId is required' });
  }

  try {
    const response = await fetch(
      `https://www.cardladder.com/api/psaCert/${certId}`
    );

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: 'Card Ladder API error',
        status: response.status 
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
