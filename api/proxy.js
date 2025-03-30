export default async function handler(req, res) {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: '缺少 address 参数' });
  }

  const input = {
    filters: {
      address,
      stage: "mainnet",
      created: {}
    }
  };

  const url = `https://layerzeroscan.com/api/trpc/messages.list?input=${encodeURIComponent(JSON.stringify(input))}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "*/*"
      }
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: "代理失败", detail: err.message });
  }
}
