import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, AlertTriangle, TrendingUp, Download } from "lucide-react";

const mockInsights = {
  selectedProposal: "Increase Validator Commission Cap to 15%",
  summary: "This proposal aims to increase validator commission caps to improve network security. Historical data suggests moderate community support with 78% approval likelihood.",
  sentiment: {
    score: 0.72,
    label: "Positive",
    sources: ["Discord: 234 messages", "Twitter: 89 mentions", "Forums: 45 discussions"]
  },
  risks: [
    { level: "Medium", text: "Potential validator centralization" },
    { level: "Low", text: "Short-term fee impact on delegators" }
  ],
  recommendation: {
    action: "Support",
    confidence: 85,
    reasoning: "Strong technical merit with broad validator support. Risk mitigation measures are adequate."
  }
};

export const AIInsightsPanel = () => {
  return (
    <Card className="shadow-governance h-fit">
      <CardHeader>
        <CardTitle className="text-governance-primary flex items-center gap-2">
          <Brain className="w-5 h-5 text-accent" />
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Selected Proposal */}
        <div>
          <h4 className="font-medium text-sm text-muted-foreground mb-2">Analyzing</h4>
          <p className="text-sm font-medium text-governance-primary">{mockInsights.selectedProposal}</p>
        </div>

        {/* AI Summary */}
        <div>
          <h4 className="font-medium text-sm text-governance-primary mb-2">AI Summary</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{mockInsights.summary}</p>
        </div>

        {/* Sentiment Analysis */}
        <div>
          <h4 className="font-medium text-sm text-governance-primary mb-3">Community Sentiment</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Overall Sentiment</span>
              <Badge 
                variant="outline"
                className="text-success border-success"
              >
                {mockInsights.sentiment.label}
              </Badge>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-success to-accent h-2 rounded-full"
                style={{ width: `${mockInsights.sentiment.score * 100}%` }}
              ></div>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              {mockInsights.sentiment.sources.map((source, index) => (
                <div key={index}>{source}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Assessment */}
        <div>
          <h4 className="font-medium text-sm text-governance-primary mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Risk Assessment
          </h4>
          <div className="space-y-2">
            {mockInsights.risks.map((risk, index) => (
              <div key={index} className="flex items-start gap-2">
                <Badge 
                  variant="outline"
                  className={`text-xs ${risk.level === "Medium" ? "text-warning border-warning" : "text-muted-foreground"}`}
                >
                  {risk.level}
                </Badge>
                <span className="text-xs text-muted-foreground flex-1">{risk.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendation */}
        <div>
          <h4 className="font-medium text-sm text-governance-primary mb-3">AI Recommendation</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge 
                variant="outline"
                className="text-success border-success"
              >
                {mockInsights.recommendation.action}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {mockInsights.recommendation.confidence}% confidence
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {mockInsights.recommendation.reasoning}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button size="sm" className="w-full">
            <TrendingUp className="w-4 h-4 mr-2" />
            View Full Analysis
          </Button>
          <Button size="sm" variant="outline" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};