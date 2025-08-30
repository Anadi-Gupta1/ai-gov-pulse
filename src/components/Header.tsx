import { Button } from "@/components/ui/button";
import { WalletConnect } from "./WalletConnect";
import { Vote, TrendingUp, Zap } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-governance-primary to-accent rounded-lg flex items-center justify-center">
                <Vote className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-governance-primary">AI Gov Pulse</span>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              <Button variant="ghost" className="text-governance-primary hover:text-accent">
                <TrendingUp className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button variant="ghost" className="text-muted-foreground hover:text-governance-primary">
                Proposals
              </Button>
              <Button variant="ghost" className="text-muted-foreground hover:text-governance-primary">
                Analytics
              </Button>
              <Button variant="ghost" className="text-muted-foreground hover:text-governance-primary">
                <Zap className="w-4 h-4 mr-2" />
                AI Insights
              </Button>
            </nav>
          </div>

          {/* Wallet Connection */}
          <WalletConnect />
        </div>
      </div>
    </header>
  );
};