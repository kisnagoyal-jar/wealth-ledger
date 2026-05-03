export interface CryptoAsset {
  id: string; symbol: string; name: string; currentPrice: number; priceChange24h: number
}

const COIN_META: Record<string, { symbol: string; name: string }> = {
  bitcoin:  { symbol: 'BTC', name: 'Bitcoin'  },
  ethereum: { symbol: 'ETH', name: 'Ethereum' },
  solana:   { symbol: 'SOL', name: 'Solana'   },
}

interface CoinGeckoResponse { [coinId: string]: { usd: number; usd_24h_change: number } }

export async function fetchCoinGeckoPrices(): Promise<Record<string, CryptoAsset>> {
  const res = await fetch('/api/crypto-prices')
  if (!res.ok) throw new Error(`API ${res.status}`)
  const data: CoinGeckoResponse = await res.json()
  const assets: Record<string, CryptoAsset> = {}
  for (const [coinId, v] of Object.entries(data)) {
    const meta = COIN_META[coinId]; if (!meta) continue
    assets[coinId] = { id: coinId, symbol: meta.symbol, name: meta.name, currentPrice: v.usd, priceChange24h: v.usd_24h_change }
  }
  return assets
}
