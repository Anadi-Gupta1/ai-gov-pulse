import { Button } from "@/components/ui/button";
import { WalletConnect } from "./WalletConnect";
import { ModeToggle } from "./mode-toggle";
import { Vote, TrendingUp, Zap, BarChart3 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
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
              <Link to="/">
                <Button 
                  variant="ghost" 
                  className={isActive("/") ? "text-governance-primary" : "text-muted-foreground hover:text-governance-primary"}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Link to="/proposals">
                <Button 
                  variant="ghost" 
                  className={isActive("/proposals") ? "text-governance-primary" : "text-muted-foreground hover:text-governance-primary"}
                >
                  Proposals
                </Button>
              </Link>
              <Link to="/analytics">
                <Button 
                  variant="ghost" 
                  className={isActive("/analytics") ? "text-governance-primary" : "text-muted-foreground hover:text-governance-primary"}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              </Link>
              <Link to="/ai-insights">
                <Button 
                  variant="ghost" 
                  className={isActive("/ai-insights") ? "text-governance-primary" : "text-muted-foreground hover:text-governance-primary"}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  AI Insights
                </Button>
              </Link>
            </nav>
          </div>

          {/* Theme Toggle and Wallet Connection */}
          <div className="flex items-center gap-3">
            <ModeToggle />
            <WalletConnect />
          </div>
        </div>
      </div>
    </header>
  );
};