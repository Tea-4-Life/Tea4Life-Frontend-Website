import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-end gap-4 bg-white p-4 rounded-3xl border border-emerald-50 shadow-sm">
      <div className="flex items-center gap-2 w-full md:w-auto">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Tìm theo tên hoặc nhóm quyền..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-slate-100 focus-visible:ring-emerald-500 rounded-2xl bg-slate-50 border-none shadow-inner h-10"
          />
        </div>
        <Button
          variant="outline"
          className="rounded-2xl border-slate-200 bg-white shadow-sm gap-2 text-slate-600 h-10 px-4"
        >
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Bộ lọc</span>
        </Button>
      </div>
    </div>
  );
};

export default SearchSection;
