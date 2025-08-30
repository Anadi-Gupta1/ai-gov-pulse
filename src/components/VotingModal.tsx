import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Wallet, Clock, Users, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Proposal {
  id: string;
  title: string;
  description: string;
  dao: string;
  status: string;
  votes: { yes: number; no: number };
  timeLeft: string;
  aiScore: number;
}

interface VotingModalProps {
  proposal: Proposal | null;
  isOpen: boolean;
  onClose: () => void;
  isWalletConnected: boolean;
}

export const VotingModal = ({ proposal, isOpen, onClose, isWalletConnected }: VotingModalProps) => {
  const [voteChoice, setVoteChoice] = useState<"yes" | "no" | "">("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  if (!proposal) return null;

  const totalVotes = proposal.votes.yes + proposal.votes.no;
  const yesPercentage = totalVotes > 0 ? (proposal.votes.yes / totalVotes) * 100 : 0;

  const handleVote = async () => {
    if (!voteChoice) return;
    
    setIsSubmitting(true);
    
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Vote Submitted!",
      description: `Your ${voteChoice.toUpperCase()} vote has been recorded on-chain.`,
    });
    
    setIsSubmitting(false);
    onClose();
    setVoteChoice("");
    setComment("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-governance-primary">{proposal.title}</DialogTitle>
          <DialogDescription>
            Cast your vote and participate in governance
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Proposal Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {proposal.timeLeft} left
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {proposal.dao}
              </span>
              <Badge className="bg-success text-white">
                {proposal.status}
              </Badge>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              {proposal.description}
            </p>

            {/* AI Analysis */}
            <div className="bg-governance-muted p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-accent" />
                <span className="font-medium text-governance-primary">AI Analysis</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI Confidence Score: <span className="font-medium text-accent">{proposal.aiScore}%</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Based on historical data and community sentiment, this proposal has a high likelihood of success.
              </p>
            </div>
          </div>

          {/* Current Results */}
          <div className="space-y-3">
            <h4 className="font-medium text-governance-primary">Current Results</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-success">Yes: {proposal.votes.yes.toLocaleString()}</span>
                <span className="text-destructive">No: {proposal.votes.no.toLocaleString()}</span>
              </div>
              <Progress value={yesPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {yesPercentage.toFixed(1)}% in favor • {totalVotes.toLocaleString()} total votes
              </p>
            </div>
          </div>

          {/* Voting Section */}
          {isWalletConnected ? (
            <div className="space-y-4">
              <Label className="text-governance-primary font-medium">Cast Your Vote</Label>
              <RadioGroup value={voteChoice} onValueChange={(value) => setVoteChoice(value as "yes" | "no")}>
                <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-governance-muted transition-colors">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes" className="flex-1 cursor-pointer text-success">
                    Vote YES - Support this proposal
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-governance-muted transition-colors">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no" className="flex-1 cursor-pointer text-destructive">
                    Vote NO - Oppose this proposal
                  </Label>
                </div>
              </RadioGroup>

              <div className="space-y-2">
                <Label htmlFor="comment" className="text-governance-primary">
                  Comment (Optional)
                </Label>
                <Textarea
                  id="comment"
                  placeholder="Share your reasoning for this vote..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleVote}
                  disabled={!voteChoice || isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <Wallet className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Submit Vote
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Your vote will be recorded on the Solana blockchain and cannot be changed.
              </p>
            </div>
          ) : (
            <div className="text-center p-6 bg-governance-muted rounded-lg">
              <Wallet className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-governance-primary font-medium mb-2">Wallet Required</p>
              <p className="text-sm text-muted-foreground mb-4">
                Connect your Solana wallet to participate in governance voting.
              </p>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};