import { Header } from "@/components/Header";
import { ProposalExplorer } from "@/components/ProposalExplorer";
import { AIInsightsPanel } from "@/components/AIInsightsPanel";
import { VotingTrendsChart } from "@/components/VotingTrendsChart";
import { WalletConnect } from "@/components/WalletConnect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import governanceHero from "@/assets/governance-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-governance-muted">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 relative">
          <div 
            className="absolute inset-0 rounded-2xl bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url(${governanceHero})` }}
          />
          <div className="relative z-10 py-12">
            <h1 className="text-4xl font-bold text-governance-primary mb-4">
              AI Governance Pulse
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Analyze DAO proposals with AI-powered insights and make informed governance decisions on Solana
            </p>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Proposal Explorer - Takes 2/3 of space */}
          <div className="lg:col-span-2">
            <ProposalExplorer />
          </div>
          
          {/* AI Insights Panel - Takes 1/3 of space */}
          <div className="lg:col-span-1">
            <AIInsightsPanel />
          </div>
        </div>

        {/* Secondary Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Voting Trends Chart */}
          <VotingTrendsChart />
          
          {/* Quick Stats */}
          <Card className="shadow-governance">
            <CardHeader>
              <CardTitle className="text-governance-primary">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">47</div>
                  <div className="text-sm text-muted-foreground">Active Proposals</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success">128K</div>
                  <div className="text-sm text-muted-foreground">Total Votes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-warning">85%</div>
                  <div className="text-sm text-muted-foreground">Avg Turnout</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-chart-2">24</div>
                  <div className="text-sm text-muted-foreground">DAOs Tracked</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;