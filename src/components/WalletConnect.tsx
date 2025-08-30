import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, ChevronDown, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useWallet } from "@/hooks/useWallet";

export const WalletConnect = () => {
  const { wallet, connect, disconnect, formatAddress } = useWallet();

  if (wallet.isConnected && wallet.address) {
    return (
      <div className="flex items-center space-x-2">
        <Badge variant="outline" className="text-success border-success">
          Connected
        </Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-governance-primary border-governance-primary hover:bg-governance-secondary">
              <Wallet className="w-4 h-4 mr-2" />
              {formatAddress(wallet.address)}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <div className="p-3 border-b">
              <p className="text-sm font-medium text-governance-primary">Wallet Info</p>
              <p className="text-xs text-muted-foreground">Balance: {wallet.balance.toFixed(2)} SOL</p>
              <p className="text-xs text-muted-foreground">Voting Power: {wallet.votingPower.toLocaleString()}</p>
            </div>
            <DropdownMenuItem onClick={disconnect} className="text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <Button 
      onClick={connect}
      disabled={wallet.isConnecting}
      className="bg-gradient-to-r from-governance-primary to-accent hover:from-governance-primary/90 hover:to-accent/90 text-white"
    >
      <Wallet className="w-4 h-4 mr-2" />
      {wallet.isConnecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
};