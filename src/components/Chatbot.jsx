import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "../hooks/useChat";

const TypingDots = () => (
  <div className="flex gap-1">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 bg-yellow-400 rounded-full"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity }}
      />
    ))}
  </div>
);

const TypedMessage = ({ text, isBot }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text]);

  return <span>{displayedText}</span>;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { messages, loading, sendMessage } = useChat();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 lg:bottom-6 lg:right-6 lg:left-auto w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-yellow-400 text-black shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center text-lg lg:text-xl font-bold z-50 hover:scale-110 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat with AI"
      >
        <span className="text-xl lg:text-2xl">{isOpen ? "✕" : "🤖"}</span>
        <span className="text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 whitespace-nowrap bg-black/80 text-yellow-400 px-2 py-1 rounded">
          Chat with AI
        </span>
      </motion.button>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 md:inset-auto md:bottom-28 md:right-6 w-full h-full md:w-80 md:h-[520px] rounded-none md:rounded-2xl bg-black/40 backdrop-blur-xl border-0 md:border border-white/10 shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-black/60 to-black/40 border-b border-white/10 p-4 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 left-3 text-white/60 hover:text-white transition-colors text-xl"
              >
                ✕
              </button>
              <div className="pl-8">
                <h3 className="text-white font-bold text-lg">Atif AI</h3>
                <p className="text-white/60 text-xs">Ask me anything about Atif</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent" />
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center h-full"
                >
                  <p className="text-white/50 text-center text-sm">
                    Hi! Ask me anything about Atif's skills, projects, or experience.
                  </p>
                </motion.div>
              )}

              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-lg ${
                      msg.type === "user"
                        ? "bg-yellow-400 text-black rounded-br-none font-medium"
                        : msg.isError
                        ? "bg-red-500/20 text-red-200 rounded-bl-none border border-red-500/30"
                        : "bg-white/10 text-white rounded-bl-none border border-white/20"
                    }`}
                  >
                    {msg.type === "bot" && !msg.isError ? (
                      <TypedMessage text={msg.content} isBot={true} />
                    ) : (
                      <span className="text-sm">{msg.content}</span>
                    )}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 border border-white/20 px-4 py-3 rounded-lg rounded-bl-none">
                    <TypingDots />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 p-4 bg-black/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 text-sm transition-all duration-200"
                  disabled={loading}
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={loading || !inputValue.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-600 text-black rounded-lg px-4 py-3 transition-all duration-200 text-sm font-bold shadow-lg hover:shadow-yellow-400/50 disabled:shadow-none"
                >
                  Send
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
