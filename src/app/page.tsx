"use client"

import { chat } from '@/service/chat.service'
import { useState } from 'react'
import { ChatInterface } from '@/components/ChatInterface'

export default function Home() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')

  const handleSubmit = async () => {
    const result = await chat(message)
    setResponse(result)
  }

  return (
    <ChatInterface
      message={message}
      response={response}
      onMessageChange={setMessage}
      onSubmit={handleSubmit}
    />
  )
}
