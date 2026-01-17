function GET_CARD_LADDER(certNumber) {
  if (!certNumber) return 'Please provide cert number';
  
  try {
    // Using corsproxy.io which sometimes bypasses Cloudflare better
    var url = 'https://corsproxy.io/?' + 
              encodeURIComponent('https://www.cardladder.com/api/psaCert/' + certNumber);
    
    var response = UrlFetchApp.fetch(url, {
      muteHttpExceptions: true,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (response.getResponseCode() === 200) {
      var data = JSON.parse(response.getContentText());
      
      return [
        ['Field', 'Value'],
        ['Description', data.description || 'N/A'],
        ['Estimated Value', data.estimatedValue ? '$' + data.estimatedValue.toLocaleString() : 'N/A'],
        ['Last Sale Date', data.lastSaleDate ? new Date(data.lastSaleDate).toLocaleDateString() : 'N/A'],
        ['Confidence', data.confidence + '/5']
      ];
    }
    return 'Not Found';
  } catch (error) {
    return 'Error: ' + error.toString();
  }
}
