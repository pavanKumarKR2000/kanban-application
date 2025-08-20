import React from "react";
import { LogoutButton } from "../logout-button";

function Header() {
  return (
    <div className="flex items-center justify-between p-4">
      <h2 className="font-bold text-3xl">Project1</h2>
      <div>
        <LogoutButton />
      </div>
    </div>
  );
}

export default Header;
