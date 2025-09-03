import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoadingOverlay } from "@/components/ui/loading";
import { Clock, Users, TrendingUp, ExternalLink, Eye } from "lucide-react";
import { useState } from "react";
import { VotingModal } from "./VotingModal";
import { ProposalDetailModal } from "./ProposalDetailModal";
import { useProposals, type Proposal } from "@/hooks/useProposals";
import { useWallet } from "@solana/wallet-adapter-react";
import { useToast } from "@/hooks/use-toast";

export const ProposalExplorer = () => {
  const { proposals, voteOnProposal, loading } = useProposals();
  const { connected } = useWallet();
  const { toast } = useToast();
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [votingModalOpen, setVotingModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const handleVote = (proposal: Proposal, voteType: "yes" | "no") => {
    if (!connected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to vote on proposals.",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedProposal(proposal);
    setVotingModalOpen(true);
  };

  const handleViewDetails = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setDetailModalOpen(true);
  };

  const activeProposals = proposals.filter(p => p.status === "Active");
  return (
    <LoadingOverlay isLoading={loading}>
      <Card className="shadow-governance">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-governance-primary flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Proposal Explorer
            </CardTitle>
            <Badge variant="outline" className="text-accent border-accent">
              {activeProposals.length} Active
            </Badge>
          </div>
        </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {proposals.slice(0, 6).map((proposal) => (
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
                <Button 
                  size="sm" 
                  className="flex-1" 
                  onClick={() => handleVote(proposal, "yes")}
                  disabled={loading || proposal.status !== "Active"}
                >
                  Vote Yes
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleVote(proposal, "no")}
                  disabled={loading || proposal.status !== "Active"}
                >
                  Vote No
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => handleViewDetails(proposal)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => window.open(`https://app.realms.today/dao/${proposal.dao.replace(/\s+/g, '').toLowerCase()}`, '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      
      <VotingModal
        proposal={selectedProposal}
        isOpen={votingModalOpen}
        onClose={() => setVotingModalOpen(false)}
        isWalletConnected={connected}
      />
      
      <ProposalDetailModal
        proposal={selectedProposal}
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
      />
      </Card>
    </LoadingOverlay>
  );
};