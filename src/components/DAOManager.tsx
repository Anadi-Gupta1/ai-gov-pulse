import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, Vote, TrendingUp, Calendar, ExternalLink } from "lucide-react";
import { useState } from "react";

interface DAO {
  id: string;
  name: string;
  description: string;
  totalMembers: number;
  activeProposals: number;
  treasuryValue: number;
  governanceToken: string;
  established: string;
  category: string;
  website: string;
  participationRate: number;
}

const mockDAOs: DAO[] = [
  {
    id: "1",
    name: "Solana Foundation",
    description: "Core protocol development and ecosystem growth",
    totalMembers: 15420,
    activeProposals: 8,
    treasuryValue: 2500000,
    governanceToken: "SOL",
    established: "2020-03-16",
    category: "Protocol",
    website: "https://solana.org",
    participationRate: 78
  },
  {
    id: "2",
    name: "Serum DAO",
    description: "Decentralized exchange protocol governance",
    totalMembers: 8932,
    activeProposals: 5,
    treasuryValue: 1200000,
    governanceToken: "SRM",
    established: "2020-08-11",
    category: "DeFi",
    website: "https://projectserum.com",
    participationRate: 65
  },
  {
    id: "3",
    name: "Mango DAO",
    description: "Decentralized trading platform governance",
    totalMembers: 12750,
    activeProposals: 12,
    treasuryValue: 800000,
    governanceToken: "MNGO",
    established: "2021-10-03",
    category: "DeFi",
    website: "https://mango.markets",
    participationRate: 82
  },
  {
    id: "4",
    name: "Metaplex DAO",
    description: "NFT infrastructure and marketplace governance",
    totalMembers: 6540,
    activeProposals: 3,
    treasuryValue: 650000,
    governanceToken: "MPLX",
    established: "2021-06-21",
    category: "NFT",
    website: "https://metaplex.com",
    participationRate: 71
  }
];

export const DAOManager = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", "Protocol", "DeFi", "NFT", "Gaming"];
  const filteredDAOs = selectedCategory === "all" 
    ? mockDAOs 
    : mockDAOs.filter(dao => dao.category === selectedCategory);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-governance-primary">DAO Explorer</h2>
          <p className="text-muted-foreground">Discover and participate in Solana DAOs</p>
        </div>
        <Button className="bg-gradient-to-r from-governance-primary to-accent">
          <Building2 className="w-4 h-4 mr-2" />
          Create DAO
        </Button>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-5">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category === "all" ? "All DAOs" : category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDAOs.map((dao) => (
              <Card key={dao.id} className="shadow-governance hover:shadow-glow transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-governance-primary">{dao.name}</CardTitle>
                    <Badge variant="outline" className="text-accent border-accent">
                      {dao.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {dao.description}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Users className="w-3 h-3 text-muted-foreground" />
                        <span className="text-lg font-bold text-governance-primary">
                          {dao.totalMembers.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Members</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Vote className="w-3 h-3 text-muted-foreground" />
                        <span className="text-lg font-bold text-accent">
                          {dao.activeProposals}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Active Proposals</p>
                    </div>
                  </div>

                  {/* Treasury Value */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Treasury</span>
                      <span className="text-sm font-medium text-success">
                        {formatCurrency(dao.treasuryValue)}
                      </span>
                    </div>
                  </div>

                  {/* Participation Rate */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Participation Rate</span>
                      <span className="text-sm font-medium">
                        {dao.participationRate}%
                      </span>
                    </div>
                    <Progress value={dao.participationRate} className="h-2" />
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(dao.established)}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {dao.governanceToken}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Join DAO
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
