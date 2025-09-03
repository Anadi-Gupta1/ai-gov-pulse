import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GitBranch, Users, Vote, TrendingUp, Award, Shield, ArrowUpDown } from "lucide-react";

interface DAO {
  id: string;
  name: string;
  logo: string;
  totalMembers: number;
  activeProposals: number;
  successRate: number;
  treasuryValue: number;
  governanceToken: string;
  category: string;
  votingPower: number;
  participationRate: number;
  avgProposalDuration: number;
  recentActivity: number;
}

const mockDAOs: DAO[] = [
  {
    id: '1',
    name: 'Solana Foundation',
    logo: '🌟',
    totalMembers: 15420,
    activeProposals: 8,
    successRate: 92,
    treasuryValue: 2500000,
    governanceToken: 'SOL',
    category: 'Protocol',
    votingPower: 850000,
    participationRate: 78,
    avgProposalDuration: 7,
    recentActivity: 12
  },
  {
    id: '2',
    name: 'Mango DAO',
    logo: '🥭',
    totalMembers: 12750,
    activeProposals: 12,
    successRate: 89,
    treasuryValue: 800000,
    governanceToken: 'MNGO',
    category: 'DeFi',
    votingPower: 620000,
    participationRate: 82,
    avgProposalDuration: 5,
    recentActivity: 18
  },
  {
    id: '3',
    name: 'Serum DAO',
    logo: '⚡',
    totalMembers: 8932,
    activeProposals: 5,
    successRate: 87,
    treasuryValue: 1200000,
    governanceToken: 'SRM',
    category: 'DeFi',
    votingPower: 450000,
    participationRate: 65,
    avgProposalDuration: 6,
    recentActivity: 8
  },
  {
    id: '4',
    name: 'Metaplex DAO',
    logo: '🎨',
    totalMembers: 6540,
    activeProposals: 3,
    successRate: 94,
    treasuryValue: 650000,
    governanceToken: 'MPLX',
    category: 'NFT',
    votingPower: 380000,
    participationRate: 71,
    avgProposalDuration: 8,
    recentActivity: 6
  }
];

type SortField = 'name' | 'totalMembers' | 'successRate' | 'treasuryValue' | 'participationRate';
type SortDirection = 'asc' | 'desc';

export const DAOComparison = () => {
  const [selectedDAOs, setSelectedDAOs] = useState<string[]>(['1', '2']);
  const [sortField, setSortField] = useState<SortField>('totalMembers');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredDAOs = mockDAOs.filter(dao => 
    categoryFilter === 'all' || dao.category === categoryFilter
  );

  const sortedDAOs = [...filteredDAOs].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return sortDirection === 'asc' 
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });

  const toggleDAOSelection = (daoId: string) => {
    setSelectedDAOs(prev => {
      if (prev.includes(daoId)) {
        return prev.filter(id => id !== daoId);
      } else if (prev.length < 4) {
        return [...prev, daoId];
      }
      return prev;
    });
  };

  const getComparisonScore = (dao: DAO) => {
    const scores = {
      members: (dao.totalMembers / 20000) * 100,
      success: dao.successRate,
      participation: dao.participationRate,
      activity: Math.min((dao.recentActivity / 20) * 100, 100)
    };
    
    return Math.round((scores.members + scores.success + scores.participation + scores.activity) / 4);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact'
    }).format(value);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-accent';
    if (score >= 70) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBadgeVariant = (score: number): "default" | "destructive" | "outline" | "secondary" => {
    if (score >= 90) return 'default';
    if (score >= 80) return 'secondary';
    if (score >= 70) return 'outline';
    return 'destructive';
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-governance">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            DAO Comparison Tool
          </CardTitle>
          <p className="text-muted-foreground">
            Compare governance metrics across multiple Solana DAOs
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Protocol">Protocol</SelectItem>
                <SelectItem value="DeFi">DeFi</SelectItem>
                <SelectItem value="NFT">NFT</SelectItem>
              </SelectContent>
            </Select>

            <Select value={`${sortField}-${sortDirection}`} onValueChange={(value) => {
              const [field, direction] = value.split('-') as [SortField, SortDirection];
              setSortField(field);
              setSortDirection(direction);
            }}>
              <SelectTrigger className="w-48">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="totalMembers-desc">Members (High-Low)</SelectItem>
                <SelectItem value="totalMembers-asc">Members (Low-High)</SelectItem>
                <SelectItem value="successRate-desc">Success Rate (High-Low)</SelectItem>
                <SelectItem value="treasuryValue-desc">Treasury (High-Low)</SelectItem>
              </SelectContent>
            </Select>

            <Badge variant="outline" className="flex items-center gap-1">
              {selectedDAOs.length} selected (max 4)
            </Badge>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="detailed">Detailed Comparison</TabsTrigger>
              <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {sortedDAOs.map((dao) => {
                  const isSelected = selectedDAOs.includes(dao.id);
                  const score = getComparisonScore(dao);
                  
                  return (
                    <Card 
                      key={dao.id} 
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        isSelected ? 'ring-2 ring-governance-primary' : ''
                      }`}
                      onClick={() => toggleDAOSelection(dao.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{dao.logo}</span>
                            <div>
                              <CardTitle className="text-sm">{dao.name}</CardTitle>
                              <Badge variant="outline" className="text-xs">
                                {dao.category}
                              </Badge>
                            </div>
                          </div>
                          <Badge variant={getScoreBadgeVariant(score)} className="text-xs">
                            {score}%
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Members:</span>
                            <span className="font-medium">{dao.totalMembers.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Success Rate:</span>
                            <span className="font-medium">{dao.successRate}%</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Treasury:</span>
                            <span className="font-medium">{formatCurrency(dao.treasuryValue)}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Active Proposals:</span>
                            <span className="font-medium">{dao.activeProposals}</span>
                          </div>
                          <Progress value={dao.participationRate} className="h-1 mt-2" />
                          <div className="text-xs text-muted-foreground text-center">
                            {dao.participationRate}% participation
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="detailed">
              {selectedDAOs.length > 0 ? (
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>DAO</TableHead>
                          <TableHead className="text-center">Members</TableHead>
                          <TableHead className="text-center">Success Rate</TableHead>
                          <TableHead className="text-center">Treasury</TableHead>
                          <TableHead className="text-center">Participation</TableHead>
                          <TableHead className="text-center">Avg Duration</TableHead>
                          <TableHead className="text-center">Score</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedDAOs.map(daoId => {
                          const dao = mockDAOs.find(d => d.id === daoId)!;
                          const score = getComparisonScore(dao);
                          
                          return (
                            <TableRow key={dao.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                  <span>{dao.logo}</span>
                                  <div>
                                    <div className="font-medium">{dao.name}</div>
                                    <Badge variant="outline" className="text-xs">
                                      {dao.governanceToken}
                                    </Badge>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-center">
                                {dao.totalMembers.toLocaleString()}
                              </TableCell>
                              <TableCell className="text-center">
                                <Badge variant={dao.successRate >= 90 ? 'default' : 'secondary'}>
                                  {dao.successRate}%
                                </Badge>
                              </TableCell>
                              <TableCell className="text-center font-medium">
                                {formatCurrency(dao.treasuryValue)}
                              </TableCell>
                              <TableCell className="text-center">
                                <div className="flex items-center gap-2 justify-center">
                                  <Progress value={dao.participationRate} className="w-12 h-2" />
                                  <span className="text-xs">{dao.participationRate}%</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-center">
                                {dao.avgProposalDuration}d
                              </TableCell>
                              <TableCell className="text-center">
                                <Badge variant={getScoreBadgeVariant(score)} className={getScoreColor(score)}>
                                  {score}%
                                </Badge>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="flex items-center justify-center py-12">
                    <div className="text-center text-muted-foreground">
                      <GitBranch className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Select DAOs from the overview to compare them</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="metrics">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="w-5 h-5 text-accent" />
                      Total Members
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-governance-primary">
                      {filteredDAOs.reduce((sum, dao) => sum + dao.totalMembers, 0).toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Across {filteredDAOs.length} DAOs
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Vote className="w-5 h-5 text-success" />
                      Active Proposals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-governance-primary">
                      {filteredDAOs.reduce((sum, dao) => sum + dao.activeProposals, 0)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Currently voting
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-accent" />
                      Avg Success Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-governance-primary">
                      {Math.round(filteredDAOs.reduce((sum, dao) => sum + dao.successRate, 0) / filteredDAOs.length)}%
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Proposal success
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="w-5 h-5 text-governance-accent" />
                      Total Treasury
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-governance-primary">
                      {formatCurrency(filteredDAOs.reduce((sum, dao) => sum + dao.treasuryValue, 0))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Combined value
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};