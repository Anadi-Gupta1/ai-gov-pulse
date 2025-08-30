import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: number;
  votingPower: number;
  isConnecting: boolean;
}

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: 0,
    votingPower: 0,
    isConnecting: false
  });
  
  const { toast } = useToast();

  // Load wallet state from localStorage on mount
  useEffect(() => {
    const savedWallet = localStorage.getItem('wallet_state');
    if (savedWallet) {
      const parsed = JSON.parse(savedWallet);
      setWallet(prev => ({ ...prev, ...parsed, isConnecting: false }));
    }
  }, []);

  // Save wallet state to localStorage
  const saveWalletState = (state: Partial<WalletState>) => {
    const newState = { ...wallet, ...state };
    setWallet(newState);
    localStorage.setItem('wallet_state', JSON.stringify(newState));
  };

  const connect = async () => {
    setWallet(prev => ({ ...prev, isConnecting: true }));

    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock wallet data
      const mockAddress = "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU";
      const mockBalance = 245.67;
      const mockVotingPower = 1250;

      saveWalletState({
        isConnected: true,
        address: mockAddress,
        balance: mockBalance,
        votingPower: mockVotingPower,
        isConnecting: false
      });

      toast({
        title: "Wallet Connected!",
        description: `Connected to ${mockAddress.slice(0, 4)}...${mockAddress.slice(-4)}`,
      });

    } catch (error) {
      setWallet(prev => ({ ...prev, isConnecting: false }));
      toast({
        title: "Connection Failed",
        description: "Please try again or check your wallet.",
        variant: "destructive"
      });
    }
  };

  const disconnect = () => {
    saveWalletState({
      isConnected: false,
      address: null,
      balance: 0,
      votingPower: 0,
      isConnecting: false
    });

    localStorage.removeItem('wallet_state');
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been safely disconnected.",
    });
  };

  const formatAddress = (address: string | null) => {
    if (!address) return "";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return {
    wallet,
    connect,
    disconnect,
    formatAddress
  };
};