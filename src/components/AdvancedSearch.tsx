import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, X, SortAsc, SortDesc } from "lucide-react";

interface SearchFilters {
  query: string;
  dao: string;
  status: string;
  category: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export const AdvancedSearch = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    dao: 'all',
    status: 'all', 
    category: 'all',
    sortBy: 'created',
    sortOrder: 'desc'
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    
    if (value !== 'all' && value !== '' && !activeFilters.includes(key)) {
      setActiveFilters(prev => [...prev, key]);
    }
  };

  const clearFilter = (filterKey: string) => {
    const defaultValue = filterKey === 'query' ? '' : 'all';
    setFilters(prev => ({ ...prev, [filterKey]: defaultValue }));
    setActiveFilters(prev => prev.filter(f => f !== filterKey));
  };

  const clearAllFilters = () => {
    setFilters({
      query: '',
      dao: 'all',
      status: 'all',
      category: 'all', 
      sortBy: 'created',
      sortOrder: 'desc'
    });
    setActiveFilters([]);
  };

  return (
    <Card className="shadow-governance mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Advanced Search & Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search proposals, DAOs, or keywords..."
            value={filters.query}
            onChange={(e) => updateFilter('query', e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select value={filters.dao} onValueChange={(value) => updateFilter('dao', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select DAO" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All DAOs</SelectItem>
              <SelectItem value="solana-foundation">Solana Foundation</SelectItem>
              <SelectItem value="defi-collective">DeFi Collective</SelectItem>
              <SelectItem value="metadao">MetaDAO</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="protocol">Protocol</SelectItem>
              <SelectItem value="treasury">Treasury</SelectItem>
              <SelectItem value="governance">Governance</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created">Created Date</SelectItem>
                <SelectItem value="votes">Vote Count</SelectItem>
                <SelectItem value="ai-score">AI Score</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateFilter('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {filters.sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {activeFilters.map(filterKey => (
              <Badge key={filterKey} variant="secondary" className="flex items-center gap-1">
                {filterKey}: {filters[filterKey as keyof SearchFilters]}
                <X 
                  className="w-3 h-3 cursor-pointer hover:text-destructive"
                  onClick={() => clearFilter(filterKey)}
                />
              </Badge>
            ))}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={clearAllFilters}
              className="text-xs"
            >
              Clear All
            </Button>
          </div>
        )}

        {/* Search Actions */}
        <div className="flex justify-between items-center pt-2">
          <span className="text-sm text-muted-foreground">
            Found 47 proposals matching your criteria
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Save Search
            </Button>
            <Button size="sm">
              Apply Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};