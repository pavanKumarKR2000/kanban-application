import { Search, X } from "lucide-react";
import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useKanbanStore } from "@/lib/store/useKanbanStore";
function SearchFilter() {
  const [query, setQuery] = useState("");
  const getTasksBySearch = useKanbanStore((state) => state.getTasksBySearch);

  function onQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;
    setQuery(query);
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
        {/* <Button variant="ghost" onClick={() => setQuery("")}>
          <X className="size-5 text-gray-500" />
        </Button> */}
      </CardContent>
      <CardFooter hidden></CardFooter>
    </Card>
  );
}

export default SearchFilter;
