import { useState, useRef, useCallback } from 'react'

export const useVoiceInput = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error starting recording:', error)
    }
  }, [])

  const stopRecording = useCallback((): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!mediaRecorderRef.current) {
        reject(new Error('No recording in progress'))
        return
      }

      mediaRecorderRef.current.onstop = async () => {
        setIsRecording(false)
        setIsProcessing(true)

        try {
          const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' })
          const formData = new FormData()
          formData.append('audio', audioBlob)

          const response = await fetch('/api/speech-to-text', {
            method: 'POST',
            body: formData,
          })

          const data = await response.json()
          setIsProcessing(false)

          if (data.transcription) {
            resolve(data.transcription)
          } else {
            reject(new Error('No transcription received'))
          }
        } catch (error) {
          setIsProcessing(false)
          reject(error)
        }
      }

      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
    })
  }, [])

  return {
    isRecording,
    isProcessing,
    startRecording,
    stopRecording,
  }
}