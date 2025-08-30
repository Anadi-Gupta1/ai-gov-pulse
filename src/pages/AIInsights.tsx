import { Header } from "@/components/Header";
import { AIInsightsPanel } from "@/components/AIInsightsPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, Zap, TrendingUp, AlertTriangle, Target, Lightbulb } from "lucide-react";

const AIInsights = () => {
  const aiMetrics = [
    { label: "Prediction Accuracy", value: 87, color: "text-success" },
    { label: "Risk Detection", value: 92, color: "text-warning" },
    { label: "Sentiment Analysis", value: 84, color: "text-accent" },
    { label: "Community Engagement", value: 78, color: "text-governance-primary" },
  ];

  const recentPredictions = [
    {
      proposal: "Validator Commission Increase",
      prediction: "PASS",
      confidence: 89,
      actual: "PASSED",
      accuracy: "✓"
    },
    {
      proposal: "Treasury Diversification",
      prediction: "PASS",
      confidence: 76,
      actual: "PASSED",
      accuracy: "✓"
    },
    {
      proposal: "Fee Structure Update",
      prediction: "FAIL",
      confidence: 82,
      actual: "FAILED",
      accuracy: "✓"
    },
    {
      proposal: "Grant Program Expansion",
      prediction: "PASS",
      confidence: 71,
      actual: "PENDING",
      accuracy: "?"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-governance-muted">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-governance-primary flex items-center gap-3">
              <Brain className="w-8 h-8 text-accent" />
              AI Insights Hub
            </h1>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-success border-success">
                <Zap className="w-3 h-3 mr-1" />
                AI Active
              </Badge>
              <Button variant="outline">
                Retrain Models
              </Button>
            </div>
          </div>
          
          <p className="text-muted-foreground max-w-2xl">
            Advanced AI analysis of governance patterns, proposal outcomes, and community sentiment across the Solana ecosystem.
          </p>
        </div>

        {/* AI Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {aiMetrics.map((metric, index) => (
            <Card key={index} className="shadow-governance">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <span className={`text-2xl font-bold ${metric.color}`}>{metric.value}%</span>
                  </div>
                  <Progress 
                    value={metric.value} 
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* AI Insights Panel */}
          <div className="lg:col-span-1">
            <AIInsightsPanel />
          </div>

          {/* Prediction Tracking */}
          <div className="lg:col-span-2">
            <Card className="shadow-governance">
              <CardHeader>
                <CardTitle className="text-governance-primary flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Prediction Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPredictions.map((pred, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-governance-primary">{pred.proposal}</h4>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={pred.prediction === "PASS" ? "default" : "destructive"}
                            className={pred.prediction === "PASS" ? "bg-success" : ""}
                          >
                            {pred.prediction}
                          </Badge>
                          <span className="text-2xl">{pred.accuracy}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Confidence: {pred.confidence}%
                        </span>
                        <span className="text-muted-foreground">
                          Actual: {pred.actual}
                        </span>
                      </div>
                      <Progress 
                        value={pred.confidence} 
                        className="h-1 mt-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional AI Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-governance">
            <CardHeader>
              <CardTitle className="text-governance-primary flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Risk Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    level: "High",
                    title: "Unusual Voting Pattern Detected",
                    desc: "MetaDAO proposal #234 shows irregular voting distribution",
                    time: "2 hours ago"
                  },
                  {
                    level: "Medium", 
                    title: "Low Participation Warning",
                    desc: "Treasury proposal may fail quorum requirements",
                    time: "6 hours ago"
                  },
                  {
                    level: "Low",
                    title: "Sentiment Shift",
                    desc: "Community sentiment for DeFi grants turning negative",
                    time: "1 day ago"
                  }
                ].map((alert, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      alert.level === "High" ? "bg-destructive" :
                      alert.level === "Medium" ? "bg-warning" : "bg-muted-foreground"
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-governance-primary">{alert.title}</p>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            alert.level === "High" ? "text-destructive border-destructive" :
                            alert.level === "Medium" ? "text-warning border-warning" : "text-muted-foreground"
                          }`}
                        >
                          {alert.level}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.desc}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-governance">
            <CardHeader>
              <CardTitle className="text-governance-primary flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Optimal Voting Time",
                    desc: "Post proposals on Tuesday-Thursday for 23% higher engagement",
                    impact: "High"
                  },
                  {
                    title: "Proposal Formatting",
                    desc: "Add executive summary to increase approval rate by 15%",
                    impact: "Medium"
                  },
                  {
                    title: "Community Engagement",
                    desc: "Increase Discord discussion period before voting",
                    impact: "Medium"
                  },
                  {
                    title: "Risk Mitigation",
                    desc: "Add progressive implementation phases for large changes",
                    impact: "High"
                  }
                ].map((rec, index) => (
                  <div key={index} className="p-3 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-governance-primary">{rec.title}</p>
                      <Badge 
                        variant="outline"
                        className={`text-xs ${
                          rec.impact === "High" ? "text-success border-success" : "text-accent border-accent"
                        }`}
                      >
                        {rec.impact} Impact
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AIInsights;