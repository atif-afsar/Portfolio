import { useState } from "react";
import { sendMessageToBot } from "../services/chatApi.js";

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    if (!text.trim()) {
      return;
    }

    try {
      setMessages((prev) => [...prev, { type: "user", content: text }]);
      setLoading(true);

      const response = await sendMessageToBot(text);
      setMessages((prev) => [...prev, { type: "bot", content: response.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: "Sorry, I encountered an error. Please try again later.",
          isError: true,
        },
      ]);
      console.error("Chat error:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    sendMessage,
  };
}
