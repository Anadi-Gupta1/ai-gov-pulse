import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, Users } from "lucide-react";

const votingTrendData = [
  { month: "Jan", participation: 65, proposals: 12 },
  { month: "Feb", participation: 72, proposals: 15 },
  { month: "Mar", participation: 68, proposals: 18 },
  { month: "Apr", participation: 81, proposals: 14 },
  { month: "May", participation: 79, proposals: 22 },
  { month: "Jun", participation: 85, proposals: 19 },
  { month: "Jul", participation: 88, proposals: 25 }
];

export const VotingTrendsChart = () => {
  return (
    <Card className="shadow-governance">
      <CardHeader>
        <CardTitle className="text-governance-primary flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Voting Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Participation Rate Chart */}
          <div>
            <h4 className="text-sm font-medium text-governance-primary mb-4 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Participation Rate
            </h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={votingTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="participation" 
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "hsl(var(--chart-1))", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Proposals Per Month */}
          <div>
            <h4 className="text-sm font-medium text-governance-primary mb-4">
              Monthly Proposals
            </h4>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={votingTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Bar 
                  dataKey="proposals" 
                  fill="hsl(var(--chart-2))"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};