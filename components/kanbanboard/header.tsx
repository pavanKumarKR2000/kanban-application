import React from "react";
import { LogoutButton } from "../logout-button";
import SearchFilter from "./search-filter";

function Header() {
  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-3xl">Project1</h2>
        <div>
          <LogoutButton />
        </div>
      </div>
      <SearchFilter />
    </div>
  );
}

export default Header;
