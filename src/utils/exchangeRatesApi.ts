interface ExchangeRateResponse { result: string; base_code: string; rates: Record<string, number> }

export async function fetchExchangeRates(): Promise<Record<string, number>> {
  const res = await fetch('https://open.er-api.com/v6/latest/USD')
  if (!res.ok) throw new Error(`ExchangeRate API ${res.status}`)
  const data: ExchangeRateResponse = await res.json()
  if (data.result !== 'success') throw new Error('ExchangeRate API returned non-success')
  return data.rates
}
