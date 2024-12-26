"use client"

import { sendMail } from '@/service/mail.service'

interface ChatInterfaceProps {
  message: string;
  response: string;
  onMessageChange: (value: string) => void;
  onSubmit: () => void;
}

export function ChatInterface({ message, response, onMessageChange, onSubmit }: ChatInterfaceProps) {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="mb-8 text-right">
        <button
          onClick={() => sendMail("onboarding@resend.dev", "zhongzhenyu190@gmail.com")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          SendMail
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl mb-4">Chat with AI</h2>
        <div className="flex gap-2">
          <input
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            className="flex-1 border rounded p-2"
            placeholder="Type your message..."
          />
          
          <button 
            onClick={onSubmit} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
        {response && <div className="mt-4 p-4 bg-gray-50 rounded-lg">{response}</div>}
      </div>
    </div>
  )
} 