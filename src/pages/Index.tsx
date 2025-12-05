import { useState, useRef, useEffect } from "react";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import WelcomeScreen from "@/components/chat/WelcomeScreen";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface ChatHistory {
  id: string;
  title: string;
  date: string;
}

// Mock responses for demo
const mockResponses: Record<string, string> = {
  default: `I'd be happy to help you with textile-related questions! I have extensive knowledge about:

• Fabric types and compositions
• Manufacturing processes
• Material specifications (GSM, thread count, etc.)
• Sustainable textile practices
• Industry trends and innovations

What would you like to know about?`,
  fabrics: `For summer clothing, here are the best fabric choices:

**1. Cotton**
- Lightweight, breathable, and moisture-absorbing
- GSM range: 120-180 for summer garments
- Best varieties: Pima, Supima, Egyptian cotton

**2. Linen**
- Excellent breathability and natural cooling
- Quick-drying and durable
- Perfect for casual and formal summer wear

**3. Bamboo**
- Naturally antibacterial
- Incredibly soft and breathable
- Eco-friendly option

**4. Chambray**
- Lighter alternative to denim
- Breathable plain weave
- Versatile for various styles

Would you like more details about any of these fabrics?`,
  denim: `The weaving process for denim involves several key steps:

**1. Yarn Preparation**
- Warp yarns are dyed with indigo dye
- Weft yarns remain undyed (white)
- This creates the characteristic blue/white contrast

**2. Warping**
- Dyed yarns are wound onto a beam
- Typically 4,000-6,000 warp threads

**3. Weaving**
- Uses a 3/1 twill weave pattern
- Warp thread goes over 3 weft threads, under 1
- Creates the diagonal ribbing pattern

**4. Finishing**
- Sanforization (pre-shrinking)
- Stone washing or enzyme treatment
- Final inspection and quality control

The result is a durable, versatile fabric weighing between 10-14 oz per square yard for standard denim.`,
};

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    { id: "1", title: "Cotton fabric specifications", date: "Today" },
    { id: "2", title: "Sustainable textile materials", date: "Today" },
    { id: "3", title: "Denim manufacturing process", date: "Yesterday" },
    { id: "4", title: "Silk vs Satin comparison", date: "Yesterday" },
    { id: "5", title: "Textile dyeing techniques", date: "Last week" },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes("summer") || lowerMessage.includes("fabric")) {
      return mockResponses.fabrics;
    }
    if (lowerMessage.includes("denim") || lowerMessage.includes("weaving")) {
      return mockResponses.denim;
    }
    return mockResponses.default;
  };

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateResponse(content),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleNewChat = () => {
    setMessages([]);
    setActiveChat(null);
  };

  const handleSelectChat = (id: string) => {
    setActiveChat(id);
    // In a real app, load chat messages from storage/API
    setMessages([]);
  };

  const handleDeleteChat = (id: string) => {
    setChatHistory((prev) => prev.filter((chat) => chat.id !== id));
    if (activeChat === id) {
      handleNewChat();
    }
  };

  return (
    <div className="h-screen flex bg-background dark">
      {/* Sidebar */}
      <ChatSidebar
        isOpen={sidebarOpen}
        onNewChat={handleNewChat}
        chatHistory={chatHistory}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        activeChat={activeChat}
      />

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          sidebarOpen ? "ml-72" : "ml-0"
        )}
      >
        <ChatHeader
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          userName="John Doe"
          userEmail="john@textilecompany.com"
        />

        {/* Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {messages.length === 0 ? (
            <WelcomeScreen onSuggestionClick={handleSendMessage} />
          ) : (
            <div className="flex-1 overflow-y-auto">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  timestamp={message.timestamp}
                />
              ))}
              {isLoading && (
                <ChatMessage
                  role="assistant"
                  content=""
                  isLoading
                />
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          <ChatInput
            onSend={handleSendMessage}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
