import { NextResponse } from 'next/server'
import { fetchArticles } from '@/lib/fetchArticles'

export const revalidate = 3600 // re-fetch every hour

export async function GET() {
  try {
    const articles = await fetchArticles()
    return NextResponse.json({ articles, fetchedAt: new Date().toISOString() })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }
}
