import React from "react";
import { Bell, User } from "lucide-react";

export default function Topbar() {
  return (
    <div className="flex justify-between items-center bg-gray-800 px-6 py-3 border-b border-gray-700">
      <h2 className="text-lg text-cyan-300 font-semibold tracking-wide">
        Infrastructure Overview
      </h2>
      <div className="flex items-center gap-4 text-gray-300">
        <Bell className="cursor-pointer hover:text-white" />
        <div className="flex items-center gap-2">
          <User />
          <span className="text-sm">Admin</span>
        </div>
      </div>
    </div>
  );
}
