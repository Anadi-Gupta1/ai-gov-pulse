import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, ExternalLink, TrendingUp, TrendingDown } from "lucide-react";

interface ProposalStatsCardProps {
  title: string;
  value: string | number;
  change: number;
  description: string;
  icon: React.ReactNode;
  variant?: "default" | "success" | "warning" | "destructive";
}

export const ProposalStatsCard = ({ 
  title, 
  value, 
  change, 
  description, 
  icon, 
  variant = "default" 
}: ProposalStatsCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "border-success/20 bg-success/5";
      case "warning":
        return "border-warning/20 bg-warning/5";
      case "destructive":
        return "border-destructive/20 bg-destructive/5";
      default:
        return "border-governance-primary/20 bg-governance-primary/5";
    }
  };

  const isPositiveChange = change > 0;

  return (
    <Card className={`shadow-governance transition-all duration-200 hover:shadow-governance hover:scale-105 ${getVariantStyles()}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-governance-primary">
          {title}
        </CardTitle>
        <div className="text-governance-accent">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-governance-primary mb-1">
          {value}
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <div className={`flex items-center ${isPositiveChange ? 'text-success' : 'text-destructive'}`}>
            {isPositiveChange ? (
              <TrendingUp className="w-3 h-3 mr-1" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-1" />
            )}
            <span>{Math.abs(change)}%</span>
          </div>
          <span className="text-muted-foreground">{description}</span>
        </div>
      </CardContent>
    </Card>
  );
};

interface MetricsOverviewProps {
  className?: string;
}

export const MetricsOverview = ({ className = "" }: MetricsOverviewProps) => {
  const metrics = [
    {
      title: "Active Proposals",
      value: 47,
      change: 12.5,
      description: "from last month",
      icon: <Clock className="w-4 h-4" />,
      variant: "success" as const
    },
    {
      title: "Total Votes Cast",
      value: "128.5K",
      change: 8.3,
      description: "from last month",
      icon: <Users className="w-4 h-4" />,
      variant: "default" as const
    },
    {
      title: "Average Participation",
      value: "85%",
      change: -2.1,
      description: "from last month",
      icon: <TrendingUp className="w-4 h-4" />,
      variant: "warning" as const
    },
    {
      title: "DAOs Tracked",
      value: 24,
      change: 15.8,
      description: "from last month",
      icon: <ExternalLink className="w-4 h-4" />,
      variant: "success" as const
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {metrics.map((metric, index) => (
        <ProposalStatsCard
          key={index}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          description={metric.description}
          icon={metric.icon}
          variant={metric.variant}
        />
      ))}
    </div>
  );
};
