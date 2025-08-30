import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, TrendingUp, ExternalLink } from "lucide-react";

const mockProposals = [
  {
    id: "1",
    title: "Increase Validator Commission Cap to 15%",
    dao: "Solana Foundation",
    status: "Active",
    votes: { yes: 12500, no: 3200 },
    timeLeft: "2 days",
    description: "Proposal to increase the validator commission cap from 10% to 15% to improve network security and validator participation.",
    aiScore: 85,
  },
  {
    id: "2", 
    title: "Grant Funding for DeFi Innovation Hub",
    dao: "Solana DeFi Collective",
    status: "Active",
    votes: { yes: 8900, no: 1100 },
    timeLeft: "5 days",
    description: "Allocate 500,000 SOL for establishing a DeFi innovation hub to accelerate protocol development.",
    aiScore: 92,
  },
  {
    id: "3",
    title: "Upgrade Governance Token Economics",
    dao: "MetaDAO", 
    status: "Pending",
    votes: { yes: 0, no: 0 },
    timeLeft: "7 days",
    description: "Implement new tokenomics model with increased staking rewards and governance participation incentives.",
    aiScore: 78,
  },
];

export const ProposalExplorer = () => {
  return (
    <Card className="shadow-governance">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-governance-primary flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Proposal Explorer
          </CardTitle>
          <Badge variant="outline" className="text-accent border-accent">
            {mockProposals.length} Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockProposals.map((proposal) => (
            <div key={proposal.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-governance-primary mb-1">{proposal.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{proposal.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {proposal.timeLeft} left
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {proposal.dao}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={proposal.status === "Active" ? "default" : "secondary"}
                    className={proposal.status === "Active" ? "bg-success text-white" : ""}
                  >
                    {proposal.status}
                  </Badge>
                  <div className="mt-2 text-sm">
                    <div className="text-accent font-medium">AI Score: {proposal.aiScore}%</div>
                  </div>
                </div>
              </div>
              
              {/* Voting Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-success">Yes: {proposal.votes.yes.toLocaleString()}</span>
                  <span className="text-destructive">No: {proposal.votes.no.toLocaleString()}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-success to-success-foreground h-2 rounded-full"
                    style={{ 
                      width: `${(proposal.votes.yes / (proposal.votes.yes + proposal.votes.no)) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button size="sm" className="flex-1">
                  Vote Yes
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Vote No
                </Button>
                <Button size="sm" variant="ghost">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};