import { Header } from "@/components/Header";
import { ProposalExplorer } from "@/components/ProposalExplorer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, TrendingUp } from "lucide-react";

const Proposals = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-governance-muted">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-governance-primary">All Proposals</h1>
            <Badge variant="outline" className="text-accent border-accent">
              <TrendingUp className="w-4 h-4 mr-1" />
              Real-time Updates
            </Badge>
          </div>
          
          {/* Filters */}
          <Card className="shadow-governance">
            <CardHeader>
              <CardTitle className="text-lg">Filter & Search</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 flex-wrap">
                <div className="flex-1 min-w-[300px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search proposals..." 
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="DAO" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All DAOs</SelectItem>
                    <SelectItem value="solana">Solana Foundation</SelectItem>
                    <SelectItem value="defi">Solana DeFi Collective</SelectItem>
                    <SelectItem value="meta">MetaDAO</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Proposals List */}
        <ProposalExplorer />
      </main>
    </div>
  );
};

export default Proposals;