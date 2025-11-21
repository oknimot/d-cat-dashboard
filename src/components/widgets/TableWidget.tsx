import React, { useMemo, useState } from "react";

import { TableWidgetProps } from "../../core/types/widget.types";
import { SortConfig, SortDirection } from "../../core/types/table.types";

const TableWidget: React.FC<{ widget: TableWidgetProps }> = ({ widget }) => {
  const { rowCount, colCount } = widget.config;
  const [filterText, setFilterText] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const rawData = useMemo(() => {
    return Array.from({ length: rowCount }, (_, r) => {
      const rowId = r + 1;
      const rowData: Record<string, string | number> = { id: rowId };
      for (let c = 1; c <= colCount; c++) {
        const suffix = String.fromCharCode(65 + ((r + c) % 26));
        rowData[`col${c}`] = `Data ${rowId}-${c} (${suffix})`;
      }
      return rowData;
    });
  }, [rowCount, colCount]);

  const columns = useMemo(() => {
    return Array.from({ length: colCount }, (_, i) => `col${i + 1}`);
  }, [colCount]);

  const requestSort = (key: string) => {
    let direction: SortDirection = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const processedData = useMemo(() => {
    let data = [...rawData];

    if (filterText) {
      const lowerFilter = filterText.toLowerCase();
      data = data.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(lowerFilter)
        )
      );
    }

    if (sortConfig) {
      data.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];

        if (valA < valB) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (valA > valB) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return data;
  }, [rawData, filterText, sortConfig]);

  if (colCount < 1 || rowCount < 1) {
    return (
      <div className="text-gray-400 text-sm text-center mt-4">
        Please set rows and columns count.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="mb-3">
        <input
          type="text"
          placeholder="Filter data..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full bg-gray-200/50 text-gray-700 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-500"
        />
      </div>

      <div className="overflow-auto flex-grow scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-gray-700 sticky top-0 z-10">
            <tr>
              {columns.map((col, index) => {
                const isSorted = sortConfig?.key === col;
                return (
                  <th
                    key={col}
                    scope="col"
                    className="px-4 py-3 cursor-pointer hover:bg-gray-600 hover:text-white transition-colors select-none"
                    onClick={() => requestSort(col)}
                  >
                    <div className="flex items-center space-x-1">
                      <span className={isSorted ? "text-yellow-400" : ""}>
                        Header {index + 1}
                      </span>
                      {isSorted ? (
                        <span className="text-yellow-400">
                          {sortConfig.direction === "asc" ? "▲" : "▼"}
                        </span>
                      ) : (
                        <span className="text-gray-600 opacity-0 group-hover:opacity-100">
                          ▼
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {processedData.length > 0 ? (
              processedData.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-700 hover:bg-gray-200/50 transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={`${row.id}-${col}`}
                      className="px-4 py-2 whitespace-nowrap"
                    >
                      {row[col]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={colCount}
                  className="px-4 py-4 text-center text-gray-500"
                >
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableWidget;
