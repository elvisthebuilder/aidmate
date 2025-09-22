import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch article')
    }

    const html = await response.text()
    
    const contentPatterns = [
      /<article[^>]*>(.*?)<\/article>/gis,
      /<div[^>]*class="[^"]*content[^"]*"[^>]*>(.*?)<\/div>/gis,
      /<p[^>]*>(.*?)<\/p>/gis
    ]

    let extractedContent = ''
    
    for (const pattern of contentPatterns) {
      const matches = html.match(pattern)
      if (matches && matches.length > 0) {
        extractedContent = matches.join(' ')
        break
      }
    }

    const cleanContent = extractedContent
      .replace(/<script[^>]*>.*?<\/script>/gis, '')
      .replace(/<style[^>]*>.*?<\/style>/gis, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()

    const paragraphs = cleanContent
      .split(/[.!?]+\s+/)
      .filter(p => p.length > 50)
      .slice(0, 8)
      .map(p => `<p>${p.trim()}.</p>`)
      .join('\n\n')

    return NextResponse.json({ 
      content: paragraphs || 'Unable to extract full content from this article.' 
    })

  } catch (error) {
    return NextResponse.json({ 
      content: 'Unable to load full article content. Please visit the original source.' 
    })
  }
}