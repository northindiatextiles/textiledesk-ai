import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Mic, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

const ChatInput = ({ onSend, isLoading, placeholder = "Ask about textiles, fabrics, or materials..." }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px";
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [message]);

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pb-6">
      <div className="relative bg-secondary rounded-2xl border border-border shadow-lg">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          className={cn(
            "w-full bg-transparent resize-none py-4 px-4 pr-32 text-foreground placeholder:text-muted-foreground focus:outline-none",
            "min-h-[56px] max-h-[200px]"
          )}
          disabled={isLoading}
        />

        <div className="absolute right-2 bottom-2 flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground"
          >
            <Paperclip className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground"
          >
            <Mic className="w-4 h-4" />
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!message.trim() || isLoading}
            size="sm"
            className={cn(
              "h-9 w-9 p-0 rounded-xl transition-all",
              message.trim() && !isLoading
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-muted-foreground"
            )}
          >
            {isLoading ? (
              <StopCircle className="w-4 h-4" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      <p className="text-xs text-center text-muted-foreground mt-3">
        TextileAI can make mistakes. Verify important textile specifications independently.
      </p>
    </div>
  );
};

export default ChatInput;
