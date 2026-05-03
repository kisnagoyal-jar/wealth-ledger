// Server-side proxy to CoinGecko — avoids CORS errors in the browser.
// Next.js fetches this server-to-server, so no CORS headers are needed.
export async function GET() {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true',
      { next: { revalidate: 60 } }, // cache response for 60 seconds
    )
    if (!res.ok) throw new Error(`CoinGecko ${res.status}`)
    const data = await res.json()
    return Response.json(data)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch prices'
    return Response.json({ error: message }, { status: 500 })
  }
}
