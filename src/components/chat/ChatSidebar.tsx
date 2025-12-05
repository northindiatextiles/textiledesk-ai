import { useState } from "react";
import { Plus, MessageSquare, Search, Settings, Trash2, MoreHorizontal, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ChatHistory {
  id: string;
  title: string;
  date: string;
  active?: boolean;
}

interface ChatSidebarProps {
  isOpen: boolean;
  onNewChat: () => void;
  chatHistory: ChatHistory[];
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
  activeChat: string | null;
}

const ChatSidebar = ({ 
  isOpen, 
  onNewChat, 
  chatHistory, 
  onSelectChat, 
  onDeleteChat,
  activeChat 
}: ChatSidebarProps) => {
  const groupedHistory = {
    today: chatHistory.filter(c => c.date === "Today"),
    yesterday: chatHistory.filter(c => c.date === "Yesterday"),
    previous: chatHistory.filter(c => !["Today", "Yesterday"].includes(c.date)),
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-full bg-sidebar transition-all duration-300 flex flex-col",
        isOpen ? "w-72" : "w-0 overflow-hidden"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <Button 
          onClick={onNewChat}
          className="w-full justify-start gap-3 bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-foreground border border-sidebar-border"
          variant="outline"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </Button>
      </div>

      {/* Search */}
      <div className="p-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sidebar-foreground/50" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full bg-sidebar-accent border-0 rounded-lg py-2 pl-10 pr-4 text-sm text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus:outline-none focus:ring-2 focus:ring-sidebar-ring/50"
          />
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-4">
        {groupedHistory.today.length > 0 && (
          <div>
            <p className="px-3 py-1 text-xs font-medium text-sidebar-foreground/50 uppercase tracking-wider">Today</p>
            <div className="space-y-1">
              {groupedHistory.today.map((chat) => (
                <ChatItem 
                  key={chat.id} 
                  chat={chat} 
                  isActive={activeChat === chat.id}
                  onSelect={onSelectChat}
                  onDelete={onDeleteChat}
                />
              ))}
            </div>
          </div>
        )}

        {groupedHistory.yesterday.length > 0 && (
          <div>
            <p className="px-3 py-1 text-xs font-medium text-sidebar-foreground/50 uppercase tracking-wider">Yesterday</p>
            <div className="space-y-1">
              {groupedHistory.yesterday.map((chat) => (
                <ChatItem 
                  key={chat.id} 
                  chat={chat} 
                  isActive={activeChat === chat.id}
                  onSelect={onSelectChat}
                  onDelete={onDeleteChat}
                />
              ))}
            </div>
          </div>
        )}

        {groupedHistory.previous.length > 0 && (
          <div>
            <p className="px-3 py-1 text-xs font-medium text-sidebar-foreground/50 uppercase tracking-wider">Previous</p>
            <div className="space-y-1">
              {groupedHistory.previous.map((chat) => (
                <ChatItem 
                  key={chat.id} 
                  chat={chat} 
                  isActive={activeChat === chat.id}
                  onSelect={onSelectChat}
                  onDelete={onDeleteChat}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-1">
        <button className="sidebar-item w-full">
          <Layers className="w-4 h-4" />
          <span className="text-sm">Train AI</span>
        </button>
        <button className="sidebar-item w-full">
          <Settings className="w-4 h-4" />
          <span className="text-sm">Settings</span>
        </button>
      </div>
    </aside>
  );
};

const ChatItem = ({ 
  chat, 
  isActive, 
  onSelect, 
  onDelete 
}: { 
  chat: ChatHistory; 
  isActive: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  return (
    <div
      className={cn(
        "group flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200",
        isActive 
          ? "bg-sidebar-accent text-sidebar-foreground" 
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
      )}
      onClick={() => onSelect(chat.id)}
    >
      <MessageSquare className="w-4 h-4 shrink-0" />
      <span className="flex-1 text-sm truncate">{chat.title}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button 
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-sidebar-border rounded transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem 
            className="text-destructive focus:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(chat.id);
            }}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChatSidebar;
