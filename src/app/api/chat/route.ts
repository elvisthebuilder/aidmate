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

    // Check if we have any tokens
    if (tokens.length === 0) {
      console.log('❌ No AI tokens configured')
      return getHealthResponse(message)
    }

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
          if (response.status === 401) {
            console.log(`❌ ${providerName} token appears to be invalid or expired`)
          }
        }
      } catch (error) {
        console.log(`❌ ${providerName} provider error:`, error)
        continue
      }
    }

    console.log('❌ All AI providers failed, using fallback response')
    return getHealthResponse(message)

  } catch (error) {
    console.log('❌ API Error:', error)
    return getHealthResponse('general health inquiry')
  }
}

// Fallback health responses when AI is unavailable
function getHealthResponse(message: string): NextResponse {
  const lowerMessage = message.toLowerCase()
  
  let response = "I'm AidMate, your health assistant. "
  
  if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent')) {
    response += "🚨 For medical emergencies, please call 911 immediately or go to your nearest emergency room. Don't wait for online assistance."
  } else if (lowerMessage.includes('headache') || lowerMessage.includes('head')) {
    response += "For headaches, try resting in a quiet, dark room, staying hydrated, and applying a cold or warm compress. If severe or persistent, consult a healthcare provider."
  } else if (lowerMessage.includes('fever') || lowerMessage.includes('temperature')) {
    response += "For fever, rest, stay hydrated, and consider over-the-counter fever reducers if appropriate. Seek medical care if fever is high (over 103°F) or persistent."
  } else if (lowerMessage.includes('cut') || lowerMessage.includes('wound') || lowerMessage.includes('bleeding')) {
    response += "For cuts: Clean your hands, apply direct pressure to stop bleeding, clean the wound gently, and apply a bandage. Seek medical care for deep cuts or if bleeding won't stop."
  } else {
    response += "I'm currently experiencing technical difficulties with my AI system. For any health concerns, please consult with a healthcare professional or call your doctor."
  }
  
  response += "\n\n⚠️ This is general information only. Always consult healthcare professionals for medical advice."
  
  return NextResponse.json({ message: response })
}