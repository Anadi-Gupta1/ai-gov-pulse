import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingUp, Wallet, Info, ArrowRight, RefreshCw } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TokenHolding {
  symbol: string;
  amount: number;
  multiplier: number;
  votingPower: number;
}

interface VotingPowerBreakdown {
  baseTokens: number;
  stakingMultiplier: number;
  delegationBonus: number;
  participationBonus: number;
  totalVotingPower: number;
}

export const VotingPowerCalculator = () => {
  const [tokenAmount, setTokenAmount] = useState<string>('');
  const [stakingPeriod, setStakingPeriod] = useState<number>(0);
  const [isDelegating, setIsDelegating] = useState<boolean>(false);
  const [participationRate, setParticipationRate] = useState<number>(75);
  const [votingPowerData, setVotingPowerData] = useState<VotingPowerBreakdown | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const tokenHoldings: TokenHolding[] = [
    { symbol: 'SOL', amount: 1000, multiplier: 1.0, votingPower: 1000 },
    { symbol: 'MNGO', amount: 50000, multiplier: 0.8, votingPower: 40000 },
    { symbol: 'SRM', amount: 25000, multiplier: 0.9, votingPower: 22500 },
    { symbol: 'RAY', amount: 15000, multiplier: 0.85, votingPower: 12750 }
  ];

  const calculateVotingPower = async () => {
    if (!tokenAmount || isNaN(parseFloat(tokenAmount))) return;

    setIsCalculating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const baseAmount = parseFloat(tokenAmount);
    
    // Staking multiplier calculation
    const stakingMultiplier = stakingPeriod >= 12 ? 2.0 : 
                             stakingPeriod >= 6 ? 1.5 : 
                             stakingPeriod >= 3 ? 1.2 : 1.0;
    
    // Delegation bonus (5% if delegating)
    const delegationBonus = isDelegating ? baseAmount * 0.05 : 0;
    
    // Participation bonus (up to 20% based on participation rate)
    const participationBonus = baseAmount * (participationRate / 100) * 0.2;
    
    const totalVotingPower = (baseAmount * stakingMultiplier) + delegationBonus + participationBonus;
    
    setVotingPowerData({
      baseTokens: baseAmount,
      stakingMultiplier: stakingMultiplier,
      delegationBonus: delegationBonus,
      participationBonus: participationBonus,
      totalVotingPower: totalVotingPower
    });
    
    setIsCalculating(false);
  };

  const resetCalculator = () => {
    setTokenAmount('');
    setStakingPeriod(0);
    setIsDelegating(false);
    setParticipationRate(75);
    setVotingPowerData(null);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Card className="shadow-governance">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Voting Power Calculator
            </CardTitle>
            <p className="text-muted-foreground">
              Calculate your governance voting power across Solana DAOs
            </p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="calculator" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="calculator">Calculator</TabsTrigger>
                <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
              </TabsList>

              <TabsContent value="calculator" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Input Section */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="token-amount">Token Amount</Label>
                      <div className="flex gap-2">
                        <Input
                          id="token-amount"
                          type="number"
                          placeholder="Enter token amount"
                          value={tokenAmount}
                          onChange={(e) => setTokenAmount(e.target.value)}
                        />
                        <Badge variant="outline">SOL</Badge>
                      </div>
                    </div>

                    <div>
                      <Label>Staking Period (months)</Label>
                      <div className="grid grid-cols-4 gap-2 mt-2">
                        {[0, 3, 6, 12].map((period) => (
                          <Button
                            key={period}
                            variant={stakingPeriod === period ? "default" : "outline"}
                            size="sm"
                            onClick={() => setStakingPeriod(period)}
                            className="text-xs"
                          >
                            {period === 0 ? 'None' : `${period}m`}
                          </Button>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Multiplier: {stakingPeriod >= 12 ? '2.0x' : 
                                   stakingPeriod >= 6 ? '1.5x' : 
                                   stakingPeriod >= 3 ? '1.2x' : '1.0x'}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="delegation"
                        checked={isDelegating}
                        onChange={(e) => setIsDelegating(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="delegation" className="text-sm">
                        Delegating votes (+5% bonus)
                      </Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delegating votes to active participants gives bonus voting power</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    <div>
                      <Label>Historical Participation Rate: {participationRate}%</Label>
                      <Progress value={participationRate} className="mt-2" />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={participationRate}
                        onChange={(e) => setParticipationRate(parseInt(e.target.value))}
                        className="w-full mt-2"
                      />
                      <div className="text-xs text-muted-foreground">
                        Affects participation bonus (up to 20%)
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={calculateVotingPower}
                        disabled={!tokenAmount || isCalculating}
                        className="flex-1"
                      >
                        {isCalculating ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Calculating...
                          </>
                        ) : (
                          <>
                            <Calculator className="w-4 h-4 mr-2" />
                            Calculate Power
                          </>
                        )}
                      </Button>
                      <Button variant="outline" onClick={resetCalculator}>
                        Reset
                      </Button>
                    </div>
                  </div>

                  {/* Results Section */}
                  <div className="space-y-4">
                    {votingPowerData ? (
                      <Card className="bg-gradient-to-br from-governance-primary/5 to-accent/5">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-accent" />
                            Your Voting Power
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-governance-primary">
                              {votingPowerData.totalVotingPower.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">Total Voting Power</div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Base Tokens</span>
                              <Badge variant="outline">
                                {votingPowerData.baseTokens.toLocaleString()}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Staking Multiplier</span>
                              <Badge variant="outline">
                                {votingPowerData.stakingMultiplier.toFixed(1)}x
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Delegation Bonus</span>
                              <Badge variant="outline" className="text-success">
                                +{votingPowerData.delegationBonus.toLocaleString()}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Participation Bonus</span>
                              <Badge variant="outline" className="text-accent">
                                +{votingPowerData.participationBonus.toLocaleString()}
                              </Badge>
                            </div>
                          </div>

                          <div className="pt-4 border-t">
                            <div className="grid grid-cols-2 gap-4 text-center">
                              <div>
                                <div className="text-lg font-bold text-governance-primary">
                                  {((votingPowerData.totalVotingPower / 1000000) * 100).toFixed(3)}%
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Network Power
                                </div>
                              </div>
                              <div>
                                <div className="text-lg font-bold text-accent">
                                  Rank #47
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Global Ranking
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="border-dashed">
                        <CardContent className="flex items-center justify-center py-8">
                          <div className="text-center text-muted-foreground">
                            <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>Enter token amount and settings to calculate voting power</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Power Optimization Tips */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Power Optimization Tips</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <ArrowRight className="w-3 h-3 mt-0.5 text-accent" />
                          <span>Stake for 12+ months to get 2x multiplier</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ArrowRight className="w-3 h-3 mt-0.5 text-accent" />
                          <span>Delegate votes for 5% bonus</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ArrowRight className="w-3 h-3 mt-0.5 text-accent" />
                          <span>Maintain 90%+ participation for max bonus</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ArrowRight className="w-3 h-3 mt-0.5 text-accent" />
                          <span>Consider diversifying across multiple DAOs</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="portfolio" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wallet className="w-5 h-5" />
                      Token Portfolio
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tokenHoldings.map((token, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-governance-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                              {token.symbol.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium">{token.symbol}</div>
                              <div className="text-sm text-muted-foreground">
                                {token.amount.toLocaleString()} tokens
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-governance-primary">
                              {token.votingPower.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {token.multiplier}x multiplier
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total Portfolio Power</span>
                        <span className="text-xl font-bold text-governance-primary">
                          {tokenHoldings.reduce((sum, token) => sum + token.votingPower, 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};