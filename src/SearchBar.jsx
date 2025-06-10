import React from "react";
import { useTask } from "./TaskContext";

function SearchBar() {
  const { search, setSearch, active, setActive, status } = useTask();

  return (
    <div className="flex gap-4 items-center">
      <input
        type="text"
        placeholder="Search Task"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <select
        value={active}
        onChange={(e) => setActive(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {status.map((stat, id) => (
          <option key={id} value={stat}>
            {stat}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchBar;
