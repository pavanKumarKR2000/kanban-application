import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useKanbanStore } from "@/lib/store/useKanbanStore";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";
function SearchFilter() {
  const [query, setQuery] = useState("");
  const { getTasksBySearch, setSearchQuery } = useKanbanStore();

  function onQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;
    setQuery(query);
    setSearchQuery(query);
    getTasksBySearch(query);
  }

  return (
    <Card className="w-fit p-1! focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] focus-within:ring-offset-0 focus-within:outline-none">
      <CardHeader hidden></CardHeader>
      <CardContent className="flex items-center gap-1 px-1!">
        <Search className="size-5 text-gray-500" />
        <Input
          type="search"
          placeholder="Search by task or tag"
          className="shadow-none! border-none! w-56 py-0! ring-0!"
          value={query}
          onChange={onQueryChange}
        />
      </CardContent>
      <CardFooter hidden></CardFooter>
    </Card>
  );
}

export default SearchFilter;
