import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const tokens = [
      process.env.GITHUB_AI_TOKEN_PRIMARY,
      process.env.GITHUB_AI_TOKEN_FALLBACK,
      process.env.GITHUB_AI_TOKEN_TERTIARY
    ].filter(Boolean)

    let response
    const providerNames = ['PRIMARY', 'FALLBACK', 'TERTIARY']
    
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]
      const providerName = providerNames[i]
      
      try {
        response = await fetch('https://models.inference.ai.azure.com/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [
              {
                role: 'system',
                content: 'You are AidMate, a helpful health assistant. Provide accurate health information and first aid guidance. Always remind users to seek professional medical help for serious conditions.'
              },
              {
                role: 'user',
                content: message
              }
            ],
            model: 'gpt-4o-mini',
            temperature: 0.7,
            max_tokens: 1000
          })
        })

        if (response.ok) {
          console.log(`✅ AI Response from: ${providerName} provider`)
          const data = await response.json()
          return NextResponse.json({ 
            message: data.choices[0]?.message?.content || 'I apologize, but I could not generate a response.' 
          })
        } else {
          console.log(`❌ ${providerName} provider failed with status: ${response.status}`)
        }
      } catch (error) {
        console.log(`❌ ${providerName} provider error:`, error)
        continue
      }
    }

    return NextResponse.json({ 
      message: 'I apologize, but I encountered an error. Please try again.' 
    }, { status: 500 })

  } catch (error) {
    return NextResponse.json({ 
      message: 'I apologize, but I encountered an error. Please try again.' 
    }, { status: 500 })
  }
}