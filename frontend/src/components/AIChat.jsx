import { useState } from "react"
import axios from "axios"

function AIChat({ token }) {

  const [question, setQuestion] = useState("")
  const [messages, setMessages] = useState([])

  const askAI = async () => {

    if (!question) return

    const userMessage = {
      sender: "user",
      text: question
    }

    setMessages(prev => [...prev, userMessage])

    try {

      const res = await axios.post(
        "https://smart-expense-classifier-backend.onrender.com/ai/ask",
        { question },
        { headers: { Authorization: token } }
      )

      const aiMessage = {
        sender: "ai",
        text: res.data.answer
      }

      setMessages(prev => [...prev, aiMessage])

    } catch (error) {

      setMessages(prev => [...prev, {
        sender: "ai",
        text: "AI request failed."
      }])

    }

    setQuestion("")
  }

  return (

    <div style={{ marginTop: "40px" }}>

      <h2>AI Financial Assistant</h2>

      <div
        style={{
          background: "#1e293b",
          maxHeight: "400px",
          borderRadius: "10px",
          overflowY: "auto",
          marginBottom: "20px"
        }}
      >

        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              marginBottom: "10px"
            }}
          >

            <span
              style={{
                display: "inline-block",
                padding: "10px",
                borderRadius: "8px",
                background:
                  msg.sender === "user"
                    ? "#3b82f6"
                    : "#334155",
                color: "white"
              }}
            >
              {msg.text}
            </span>

          </div>
        ))}

      </div>

      <input
        placeholder="Ask about your spending..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: "70%" }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            askAI()
          }
        }}
      />

      <button
        onClick={askAI}
        style={{ marginLeft: "10px" }}
      >
        Send
      </button>

    </div>

  )

}

export default AIChat