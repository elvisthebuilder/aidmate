import { NextRequest, NextResponse } from 'next/server'
import { SpeechClient } from '@google-cloud/speech'

const client = new SpeechClient({
  keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE,
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const audioFile = formData.get('audio') as File
    
    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 })
    }

    const audioBytes = Buffer.from(await audioFile.arrayBuffer())

    const config = {
      encoding: 'WEBM_OPUS' as const,
      sampleRateHertz: 48000,
      languageCode: 'en-US',
      enableAutomaticPunctuation: true,
    }

    const request = {
      audio: { content: audioBytes.toString('base64') },
      config,
    }

    const [response] = await client.recognize(request)
    const transcription = response.results
      ?.map(result => result.alternatives?.[0]?.transcript)
      .join('\n')

    return NextResponse.json({ transcription })
  } catch (error) {
    console.error('Speech-to-text error:', error)
    return NextResponse.json({ error: 'Failed to process audio' }, { status: 500 })
  }
}