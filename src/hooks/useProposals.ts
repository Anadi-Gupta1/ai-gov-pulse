import { useState, useEffect } from "react";

export interface Proposal {
  id: string;
  title: string;
  dao: string;
  status: "Active" | "Pending" | "Completed" | "Failed";
  votes: { yes: number; no: number };
  timeLeft: string;
  description: string;
  aiScore: number;
  category: string;
  createdAt: string;
}

const initialProposals: Proposal[] = [
  {
    id: "1",
    title: "Increase Validator Commission Cap to 15%",
    dao: "Solana Foundation",
    status: "Active",
    votes: { yes: 12500, no: 3200 },
    timeLeft: "2 days",
    description: "Proposal to increase the validator commission cap from 10% to 15% to improve network security and validator participation. This change will help maintain a healthy validator ecosystem by ensuring sustainable operations.",
    aiScore: 85,
    category: "Protocol",
    createdAt: "2024-01-15"
  },
  {
    id: "2", 
    title: "Grant Funding for DeFi Innovation Hub",
    dao: "Solana DeFi Collective",
    status: "Active",
    votes: { yes: 8900, no: 1100 },
    timeLeft: "5 days",
    description: "Allocate 500,000 SOL for establishing a DeFi innovation hub to accelerate protocol development and foster ecosystem growth. The hub will provide resources and mentorship for emerging DeFi projects.",
    aiScore: 92,
    category: "Treasury",
    createdAt: "2024-01-12"
  },
  {
    id: "3",
    title: "Upgrade Governance Token Economics",
    dao: "MetaDAO", 
    status: "Pending",
    votes: { yes: 0, no: 0 },
    timeLeft: "7 days",
    description: "Implement new tokenomics model with increased staking rewards and governance participation incentives. This proposal aims to increase voter turnout and long-term token holder engagement.",
    aiScore: 78,
    category: "Governance",
    createdAt: "2024-01-10"
  },
  {
    id: "4",
    title: "Mango Markets Recovery Plan",
    dao: "Mango DAO",
    status: "Active",
    votes: { yes: 15600, no: 2400 },
    timeLeft: "1 day",
    description: "Comprehensive recovery plan for Mango Markets including fund allocation, security upgrades, and user compensation strategy. This proposal outlines the path forward after recent market volatility.",
    aiScore: 67,
    category: "Recovery",
    createdAt: "2024-01-08"
  },
  {
    id: "5",
    title: "Cross-Chain Bridge Security Audit",
    dao: "Wormhole Contributors",
    status: "Active",
    votes: { yes: 7800, no: 1200 },
    timeLeft: "3 days",
    description: "Fund comprehensive security audit of cross-chain bridge infrastructure with leading blockchain security firms. The audit will cover smart contracts, validator networks, and guardian systems.",
    aiScore: 88,
    category: "Security",
    createdAt: "2024-01-05"
  },
  {
    id: "6",
    title: "NFT Marketplace Fee Restructure",
    dao: "Magic Eden DAO",
    status: "Completed",
    votes: { yes: 18900, no: 4100 },
    timeLeft: "Ended",
    description: "Restructure marketplace fees to better support creators and reduce trading costs. The new fee structure will implement a tiered system based on trading volume and creator royalties.",
    aiScore: 91,
    category: "Marketplace",
    createdAt: "2024-01-01"
  }
];

export const useProposals = () => {
  const [proposals, setProposals] = useState<Proposal[]>(initialProposals);
  const [loading, setLoading] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProposals(prev => prev.map(proposal => {
        if (proposal.status === "Active") {
          // Simulate vote changes
          const voteIncrease = Math.floor(Math.random() * 50);
          const isYes = Math.random() > 0.4; // 60% chance of yes votes
          
          return {
            ...proposal,
            votes: {
              yes: proposal.votes.yes + (isYes ? voteIncrease : 0),
              no: proposal.votes.no + (isYes ? 0 : voteIncrease)
            }
          };
        }
        return proposal;
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const voteOnProposal = async (proposalId: string, vote: "yes" | "no", userVotePower: number = 100) => {
    setLoading(true);
    
    // Simulate blockchain transaction delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProposals(prev => prev.map(proposal => {
      if (proposal.id === proposalId) {
        return {
          ...proposal,
          votes: {
            yes: proposal.votes.yes + (vote === "yes" ? userVotePower : 0),
            no: proposal.votes.no + (vote === "no" ? userVotePower : 0)
          }
        };
      }
      return proposal;
    }));
    
    setLoading(false);
    return true;
  };

  const getProposalById = (id: string) => {
    return proposals.find(p => p.id === id);
  };

  const getProposalsByStatus = (status: Proposal["status"]) => {
    return proposals.filter(p => p.status === status);
  };

  const getProposalsByDAO = (dao: string) => {
    return proposals.filter(p => p.dao === dao);
  };

  return {
    proposals,
    loading,
    voteOnProposal,
    getProposalById,
    getProposalsByStatus,
    getProposalsByDAO
  };
};