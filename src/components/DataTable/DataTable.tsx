// src/components/DataTable/DataTable.tsx
import React, { useMemo, useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  /** optional: control single vs multiple selection (defaults to multiple) */
  selectionMode?: "single" | "multiple";
  onRowSelect?: (selectedRows: T[]) => void;
  /** a11y */
  ariaLabel?: string;
  /** key extractor fallback */
  rowKey?: (row: T, index: number) => React.Key;
}

export function DataTable<T>({
  data,
  columns,
  loading = false,
  selectable = false,
  selectionMode = "multiple",
  onRowSelect,
  ariaLabel = "data table",
  rowKey,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [selected, setSelected] = useState<Set<React.Key>>(new Set());

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    const col = columns.find((c) => c.key === sortKey);
    if (!col) return data;
    const idx = col.dataIndex;
    return [...data].sort((a, b) => {
      const va = (a as any)[idx];
      const vb = (b as any)[idx];
      if (va == null && vb == null) return 0;
      if (va == null) return sortDir === "asc" ? -1 : 1;
      if (vb == null) return sortDir === "asc" ? 1 : -1;
      if (typeof va === "number" && typeof vb === "number") {
        return sortDir === "asc" ? va - vb : vb - va;
      }
      return sortDir === "asc"
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });
  }, [data, columns, sortKey, sortDir]);

  const allKeys = sorted.map((row, i) =>
    rowKey ? rowKey(row, i) : (row as any).id ?? i
  );

  const toggleAll = () => {
    if (selectionMode === "single") return;
    const next: Set<React.Key> =
      selected.size === allKeys.length
        ? new Set<React.Key>()
        : new Set<React.Key>(allKeys);
    setSelected(next);
    onRowSelect?.(sorted.filter((_, i) => next.has(allKeys[i])));
  };

  const toggleOne = (key: React.Key, row: T) => {
    let next = new Set<React.Key>(selected);
    if (selectionMode === "single") {
      next = next.has(key) ? new Set<React.Key>() : new Set<React.Key>([key]);
    } else {
      next.has(key) ? next.delete(key) : next.add(key);
    }
    setSelected(next);
    onRowSelect?.(sorted.filter((_, i) => next.has(allKeys[i])));
  };

  const onSort = (col: Column<T>) => {
    if (!col.sortable) return;
    if (sortKey !== col.key) {
      setSortKey(col.key);
      setSortDir("asc");
    } else {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
      <table
        className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900"
        role="table"
        aria-label={ariaLabel}
      >
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {selectable && selectionMode !== "single" && (
              <th scope="col" className="w-10 px-3 py-3">
                <input
                  aria-label="Select all rows"
                  type="checkbox"
                  checked={
                    selected.size > 0 && selected.size === allKeys.length
                  }
                  onChange={toggleAll}
                />
              </th>
            )}
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300 select-none"
              >
                <button
                  type="button"
                  className={`inline-flex items-center gap-1 ${
                    c.sortable ? "hover:underline" : "cursor-default"
                  }`}
                  onClick={() => onSort(c)}
                  aria-live="polite"
                  aria-label={c.sortable ? `Sort by ${c.title}` : undefined}
                >
                  {c.title}
                  {c.sortable &&
                    sortKey === c.key &&
                    (sortDir === "asc" ? "▲" : "▼")}
                </button>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {loading ? (
            <tr>
              <td
                colSpan={
                  (selectable && selectionMode !== "single" ? 1 : 0) +
                  columns.length
                }
                className="px-4 py-10 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                Loading…
              </td>
            </tr>
          ) : sorted.length === 0 ? (
            <tr>
              <td
                colSpan={
                  (selectable && selectionMode !== "single" ? 1 : 0) +
                  columns.length
                }
                className="px-4 py-10 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                No data available
              </td>
            </tr>
          ) : (
            sorted.map((row, i) => {
              const key = allKeys[i];
              const isSelected = selected.has(key);
              return (
                <tr
                  key={key}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    isSelected ? "bg-blue-50 dark:bg-blue-900/30" : ""
                  }`}
                >
                  {selectable && (
                    <td className="px-3 py-2">
                      {selectionMode === "single" ? (
                        <input
                          aria-label={`Select row ${i + 1}`}
                          type="radio"
                          name="dt-select"
                          checked={isSelected}
                          onChange={() => toggleOne(key, row)}
                        />
                      ) : (
                        <input
                          aria-label={`Select row ${i + 1}`}
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleOne(key, row)}
                        />
                      )}
                    </td>
                  )}
                  {columns.map((c) => (
                    <td
                      key={c.key}
                      className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100"
                    >
                      {String((row as any)[c.dataIndex] ?? "")}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
