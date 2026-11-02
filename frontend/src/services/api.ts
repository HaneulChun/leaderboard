const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export interface Player {
  name: string
  score: number
}

export async function getLeaderboard(count = 10): Promise<Player[]> {
  const res = await fetch(`${BASE}/api/leaderboard?count=${count}`)
  if (!res.ok) throw new Error('Failed to load leaderboard')
  return res.json()
}

export async function submitScore(name: string, score: number): Promise<Player> {
  const res = await fetch(`${BASE}/api/leaderboard`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, score }),
  })
  if (!res.ok) throw new Error('Failed to submit score')
  return res.json()
}