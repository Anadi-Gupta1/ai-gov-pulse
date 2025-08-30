import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, ExternalLink, FileText, MessageSquare, BarChart3, AlertTriangle } from "lucide-react";

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

interface ProposalDetailModalProps {
  proposal: Proposal | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProposalDetailModal = ({ proposal, isOpen, onClose }: ProposalDetailModalProps) => {
  if (!proposal) return null;

  const totalVotes = proposal.votes.yes + proposal.votes.no;
  const yesPercentage = totalVotes > 0 ? (proposal.votes.yes / totalVotes) * 100 : 0;

  const discussionPoints = [
    {
      user: "0x1234...5678",
      time: "2 hours ago",
      comment: "This proposal addresses a critical need in our validator infrastructure. Strong support.",
      sentiment: "positive"
    },
    {
      user: "validator_pro",
      time: "4 hours ago", 
      comment: "The 15% cap seems reasonable given current market conditions. However, we should monitor implementation closely.",
      sentiment: "neutral"
    },
    {
      user: "dao_member_42",
      time: "6 hours ago",
      comment: "Concerned about the impact on smaller delegators. Perhaps a gradual rollout would be better?",
      sentiment: "negative"
    }
  ];

  const riskFactors = [
    {
      level: "Medium",
      factor: "Validator Centralization",
      description: "Higher commission caps may favor larger validators"
    },
    {
      level: "Low", 
      factor: "Delegator Impact",
      description: "Minimal short-term effect on delegation rewards"
    },
    {
      level: "Low",
      factor: "Network Security",
      description: "Positive impact on validator sustainability"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-governance-primary">{proposal.title}</DialogTitle>
          <DialogDescription>
            Detailed analysis and community discussion
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
            <TabsTrigger value="discussion">Discussion</TabsTrigger>
            <TabsTrigger value="details">Full Details</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Time Remaining</span>
                  </div>
                  <p className="text-2xl font-bold text-governance-primary">{proposal.timeLeft}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Total Votes</span>
                  </div>
                  <p className="text-2xl font-bold text-governance-primary">{totalVotes.toLocaleString()}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">AI Score</span>
                  </div>
                  <p className="text-2xl font-bold text-accent">{proposal.aiScore}%</p>
                </CardContent>
              </Card>
            </div>

            {/* Voting Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-governance-primary">Current Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-success">Yes: {proposal.votes.yes.toLocaleString()}</span>
                    <span className="text-destructive">No: {proposal.votes.no.toLocaleString()}</span>
                  </div>
                  <Progress value={yesPercentage} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    {yesPercentage.toFixed(1)}% in favor • Quorum: 75% reached
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-governance-primary">Proposal Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{proposal.description}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-governance-primary flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskFactors.map((risk, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                      <Badge 
                        variant="outline"
                        className={`${
                          risk.level === "Medium" ? "text-warning border-warning" : "text-muted-foreground"
                        }`}
                      >
                        {risk.level}
                      </Badge>
                      <div>
                        <p className="font-medium text-governance-primary">{risk.factor}</p>
                        <p className="text-sm text-muted-foreground">{risk.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-governance-primary">Historical Context</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    <strong>Similar Proposals:</strong> 3 previous commission cap adjustments (2021-2023)
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Average Approval Rate:</strong> 72% for validator-related proposals
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Implementation Timeline:</strong> Typically 2-4 weeks post-approval
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discussion" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-governance-primary flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Community Discussion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {discussionPoints.map((point, index) => (
                    <div key={index} className="border-l-4 border-accent pl-4 py-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-governance-primary">{point.user}</span>
                        <span className="text-xs text-muted-foreground">{point.time}</span>
                        <Badge 
                          variant="outline"
                          className={`text-xs ${
                            point.sentiment === "positive" ? "text-success border-success" :
                            point.sentiment === "negative" ? "text-destructive border-destructive" :
                            "text-muted-foreground"
                          }`}
                        >
                          {point.sentiment}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{point.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-governance-primary flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Technical Specifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-medium text-governance-primary mb-2">Implementation Details</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Update validator commission cap from 10% to 15%</li>
                      <li>Apply to all new validator registrations immediately</li>
                      <li>Existing validators can update commission within 30 days</li>
                      <li>No retroactive changes to existing delegations</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-governance-primary mb-2">Network Impact</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Estimated to improve validator profitability by 12-18%</li>
                      <li>May reduce delegator rewards by 0.5-1% on average</li>
                      <li>Expected to increase validator participation by 8-12%</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Realms
              </Button>
              <Button variant="outline" className="flex-1">
                <FileText className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-3 pt-4 border-t">
          <Button onClick={onClose} variant="outline" className="flex-1">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};