export default async function handler(req, res) {
  const { address } = req.query;

  const targetUrl = `https://layerzeroscan.com/api/trpc/messages.list?input=${encodeURIComponent(JSON.stringify({
    filters: {
      address,
      stage: 'mainnet',
      created: {}
    }
  }))}`;

  try {
    const response = await fetch(targetUrl);
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy request failed' });
  }
}
