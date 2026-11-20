"use client";

import { useEffect, useMemo, useState } from "react";
import "./rtl.css";
import { fetchData } from "./utils";

export default function DataTable() {
  const [data, setData] = useState([]);
  const [isRTL, setIsRTL] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchData().then((res) => setData(res));
  }, []);

  const handleHeaderClick = (column) => {
    if (column === sortColumn) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleToggleClick = () => {
    setIsRTL((prev) => !prev);
  };

  const filteredData = useMemo(
    () => data.filter((item) => item.name.includes(searchTerm.toLowerCase())),
    [data, searchTerm],
  );

  const sortedData = useMemo(() => {
    const direction = sortOrder === "asc" ? 1 : -1;

    return [...filteredData].sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      if (typeof valueA === "string") {
        return valueA.localeCompare(valueB) * direction;
      }

      return (valueA - valueB) * direction;
    });
  }, [filteredData, sortColumn, sortOrder]);

  return (
    <div>
      <header>
        <button className="secondary" onClick={handleToggleClick}>
          Toggle Columns
        </button>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search items"
        />
      </header>

      <table className={isRTL ? "rtl" : ""}>
        <thead>
          <tr>
            <th>
              <button
                className="link"
                onClick={() => handleHeaderClick("id")}
                aria-label="ID"
              >
                ID {sortColumn === "id" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
            </th>
            <th>
              <button
                className="link"
                onClick={() => handleHeaderClick("name")}
                aria-label="Name"
              >
                Name{" "}
                {sortColumn === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
            </th>
            <th>
              <button
                className="link"
                onClick={() => handleHeaderClick("weight")}
                aria-label="Weight"
              >
                Weight{" "}
                {sortColumn === "weight" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
