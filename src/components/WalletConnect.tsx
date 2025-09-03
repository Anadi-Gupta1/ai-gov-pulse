import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, ChevronDown, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton, WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export const WalletConnect = () => {
  const { publicKey, connected, connecting } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    if (connected && publicKey) {
      connection.getBalance(publicKey).then(balance => {
        setBalance(balance / LAMPORTS_PER_SOL);
      });
    }
  }, [connected, publicKey, connection]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (connected && publicKey) {
    return (
      <div className="flex items-center space-x-2">
        <Badge variant="outline" className="text-success border-success">
          Connected
        </Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-governance-primary border-governance-primary hover:bg-governance-secondary">
              <Wallet className="w-4 h-4 mr-2" />
              {formatAddress(publicKey.toString())}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <div className="p-3 border-b">
              <p className="text-sm font-medium text-governance-primary">Wallet Info</p>
              <p className="text-xs text-muted-foreground">Balance: {balance.toFixed(4)} SOL</p>
              <p className="text-xs text-muted-foreground">Address: {formatAddress(publicKey.toString())}</p>
            </div>
            <div className="p-2">
              <WalletDisconnectButton className="w-full text-destructive bg-transparent hover:bg-destructive/10 border border-destructive/20" />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <WalletMultiButton className="!bg-gradient-to-r !from-governance-primary !to-accent hover:!from-governance-primary/90 hover:!to-accent/90 !text-white !rounded-md !px-4 !py-2 !font-medium !transition-all !duration-200" />
    </div>
  );
};