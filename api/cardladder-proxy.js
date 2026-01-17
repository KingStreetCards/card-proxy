export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { certId } = req.query;

  if (!certId) {
    return res.status(400).json({ error: 'certId parameter is required' });
  }

  try {
    const apiUrl = `https://www.cardladder.com/api/psaCert/${certId}`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.cardladder.com/',
        'Origin': 'https://www.cardladder.com'
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json({ 
        error: 'Card Ladder API returned an error',
        status: response.status,
        data: data
      });
    }

    return res.status(200).json(data);
    
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch from Card Ladder',
      message: error.message 
    });
  }
}
