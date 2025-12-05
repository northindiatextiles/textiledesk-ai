import { Sparkles, Search, BookOpen, Lightbulb, Factory } from "lucide-react";

interface WelcomeScreenProps {
  onSuggestionClick: (suggestion: string) => void;
}

const suggestions = [
  {
    icon: Search,
    title: "Find fabrics",
    description: "Search for specific textile materials",
    query: "What are the best fabrics for summer clothing?"
  },
  {
    icon: Factory,
    title: "Manufacturing",
    description: "Learn about textile production",
    query: "Explain the weaving process for denim fabric"
  },
  {
    icon: BookOpen,
    title: "Material specs",
    description: "Get detailed specifications",
    query: "What is the GSM range for premium cotton shirts?"
  },
  {
    icon: Lightbulb,
    title: "Industry trends",
    description: "Discover latest innovations",
    query: "What are the latest sustainable textile innovations?"
  },
];

const WelcomeScreen = ({ onSuggestionClick }: WelcomeScreenProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 animate-fade-in">
      {/* Logo & Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 mb-6 shadow-lg">
          <Sparkles className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-display font-bold mb-3">
          <span className="gradient-text">TextileAI</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-md">
          Your intelligent assistant for the textile industry. Search, learn, and discover.
        </p>
      </div>

      {/* Suggestion Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion.query)}
            className="group p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 text-left"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-secondary group-hover:bg-primary/10 transition-colors">
                <suggestion.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {suggestion.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {suggestion.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-8 mt-12 text-center">
        <div>
          <p className="text-2xl font-bold text-foreground">50K+</p>
          <p className="text-xs text-muted-foreground">Fabric Types</p>
        </div>
        <div className="w-px h-10 bg-border" />
        <div>
          <p className="text-2xl font-bold text-foreground">1M+</p>
          <p className="text-xs text-muted-foreground">Material Specs</p>
        </div>
        <div className="w-px h-10 bg-border" />
        <div>
          <p className="text-2xl font-bold text-foreground">24/7</p>
          <p className="text-xs text-muted-foreground">AI Support</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
