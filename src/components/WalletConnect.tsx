import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, ChevronDown } from "lucide-react";
import { useState } from "react";

export const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress] = useState("7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU");

  const handleConnect = () => {
    // Mock connection - in real app would use Solana wallet adapter
    setIsConnected(true);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (isConnected) {
    return (
      <div className="flex items-center space-x-2">
        <Badge variant="outline" className="text-success border-success">
          Connected
        </Badge>
        <Button variant="outline" className="text-governance-primary border-governance-primary hover:bg-governance-secondary">
          <Wallet className="w-4 h-4 mr-2" />
          {formatAddress(walletAddress)}
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={handleConnect}
      className="bg-gradient-to-r from-governance-primary to-accent hover:from-governance-primary/90 hover:to-accent/90 text-white"
    >
      <Wallet className="w-4 h-4 mr-2" />
      Connect Wallet
    </Button>
  );
};