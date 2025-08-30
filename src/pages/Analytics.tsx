import { Header } from "@/components/Header";
import { VotingTrendsChart } from "@/components/VotingTrendsChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, LineChart, Calendar, Download, TrendingUp, Users, Vote, Clock } from "lucide-react";

const Analytics = () => {
  const stats = [
    { label: "Total Proposals", value: "1,247", change: "+12%", icon: Vote },
    { label: "Active Voters", value: "85,432", change: "+8%", icon: Users },
    { label: "Avg Turnout", value: "73.2%", change: "+5%", icon: TrendingUp },
    { label: "Avg Decision Time", value: "4.2 days", change: "-15%", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-governance-muted">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-governance-primary">Analytics Dashboard</h1>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Last 30 days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="shadow-governance">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold text-governance-primary">{stat.value}</p>
                      <Badge 
                        variant="outline" 
                        className="mt-2 text-success border-success"
                      >
                        {stat.change}
                      </Badge>
                    </div>
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <VotingTrendsChart />
          
          <Card className="shadow-governance">
            <CardHeader>
              <CardTitle className="text-governance-primary flex items-center gap-2">
                <BarChart className="w-5 h-5" />
                Proposal Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { category: "Treasury Management", count: 45, percentage: 32 },
                  { category: "Protocol Upgrades", count: 38, percentage: 27 },
                  { category: "Grant Funding", count: 29, percentage: 21 },
                  { category: "Parameter Changes", count: 18, percentage: 13 },
                  { category: "Other", count: 10, percentage: 7 },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-governance-primary">{item.category}</span>
                      <span className="text-muted-foreground">{item.count} proposals</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-accent to-governance-primary h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="shadow-governance">
            <CardHeader>
              <CardTitle className="text-governance-primary">Top DAOs by Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Solana Foundation", proposals: 89, votes: "245K" },
                  { name: "MetaDAO", proposals: 67, votes: "189K" },
                  { name: "Solana DeFi Collective", proposals: 54, votes: "156K" },
                  { name: "Mango DAO", proposals: 43, votes: "98K" },
                ].map((dao, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium text-governance-primary">{dao.name}</p>
                      <p className="text-sm text-muted-foreground">{dao.proposals} proposals</p>
                    </div>
                    <Badge variant="outline" className="text-accent border-accent">
                      {dao.votes} votes
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-governance">
            <CardHeader>
              <CardTitle className="text-governance-primary">Voting Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-success mb-2">68%</div>
                  <p className="text-sm text-muted-foreground">Average Yes Vote Rate</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Unanimous (90%+)</span>
                    <span className="text-sm font-medium">23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Strong Majority (70-90%)</span>
                    <span className="text-sm font-medium">41%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Simple Majority (50-70%)</span>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Close Vote (45-55%)</span>
                    <span className="text-sm font-medium">8%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-governance">
            <CardHeader>
              <CardTitle className="text-governance-primary">Recent Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    title: "Highest Turnout", 
                    desc: "92% participation in Treasury Proposal #445",
                    date: "2 days ago"
                  },
                  { 
                    title: "Fastest Decision", 
                    desc: "Protocol upgrade approved in 18 hours",
                    date: "1 week ago"
                  },
                  { 
                    title: "Largest Grant", 
                    desc: "2M SOL allocated to DeFi innovation",
                    date: "2 weeks ago"
                  },
                  { 
                    title: "New DAO Record", 
                    desc: "MetaDAO crossed 50K active voters",
                    date: "3 weeks ago"
                  },
                ].map((milestone, index) => (
                  <div key={index} className="border-l-4 border-accent pl-4">
                    <p className="font-medium text-governance-primary">{milestone.title}</p>
                    <p className="text-sm text-muted-foreground">{milestone.desc}</p>
                    <p className="text-xs text-muted-foreground mt-1">{milestone.date}</p>
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

export default Analytics;