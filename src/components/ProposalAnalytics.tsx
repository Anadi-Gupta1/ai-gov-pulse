import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Users, Clock, Award } from "lucide-react";

const votingData = [
  { name: 'Jan', proposals: 12, passed: 8, failed: 4 },
  { name: 'Feb', proposals: 15, passed: 11, failed: 4 },
  { name: 'Mar', proposals: 18, passed: 14, failed: 4 },
  { name: 'Apr', proposals: 22, passed: 16, failed: 6 },
  { name: 'May', proposals: 19, passed: 13, failed: 6 },
  { name: 'Jun', proposals: 25, passed: 19, failed: 6 }
];

const categoryData = [
  { name: 'Protocol', value: 35, color: '#8b5cf6' },
  { name: 'Treasury', value: 28, color: '#06b6d4' }, 
  { name: 'Governance', value: 22, color: '#10b981' },
  { name: 'Other', value: 15, color: '#f59e0b' }
];

const participationData = [
  { name: 'Week 1', participation: 78 },
  { name: 'Week 2', participation: 82 },
  { name: 'Week 3', participation: 75 },
  { name: 'Week 4', participation: 85 },
  { name: 'Week 5', participation: 88 },
  { name: 'Week 6', participation: 83 }
];

export const ProposalAnalytics = () => {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">111</p>
                <p className="text-sm text-muted-foreground">Total Proposals</p>
              </div>
              <TrendingUp className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">82%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
              <Award className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">12.5K</p>
                <p className="text-sm text-muted-foreground">Active Voters</p>
              </div>
              <Users className="w-8 h-8 text-governance-accent" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">3.2d</p>
                <p className="text-sm text-muted-foreground">Avg Duration</p>
              </div>
              <Clock className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Proposal Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Proposal Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={votingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="passed" fill="#10b981" />
                <Bar dataKey="failed" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Proposal Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Participation Rate */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Voter Participation Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={participationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="participation" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  dot={{ fill: '#8b5cf6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing DAOs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { dao: 'Solana Foundation', proposals: 25, success: 92, participation: 88 },
              { dao: 'DeFi Collective', proposals: 18, success: 89, participation: 85 },
              { dao: 'MetaDAO', proposals: 15, success: 87, participation: 82 },
              { dao: 'Validator Alliance', proposals: 12, success: 83, participation: 79 }
            ].map((dao, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-governance-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
                    #{index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold">{dao.dao}</h4>
                    <p className="text-sm text-muted-foreground">{dao.proposals} proposals</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-success">{dao.success}%</div>
                    <div className="text-xs text-muted-foreground">Success</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-accent">{dao.participation}%</div>
                    <div className="text-xs text-muted-foreground">Participation</div>
                  </div>
                  <Badge variant="outline">Top Performer</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};