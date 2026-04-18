"use client";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  type TableProps,
  TableRow,
} from "@heroui/react";
import { useMemo, useState } from "react";

type Column<T> = {
  key: string;
  label: string;
  render?: (item: T, index: number) => React.ReactNode;
};

interface PaginatedTableProps<T> extends TableProps {
  items: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string | number;
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  onRowClick?: (item: T) => void;
  header?: string;
  emptyMessage?: string;
  isLoading?: boolean;
  isSection?: (item: T) => boolean;
}

export default function PaginatedTable<T>({
  items,
  columns,
  keyExtractor,
  rowsPerPage: initialRowsPerPage = 50,
  onRowClick,
  header,
  emptyMessage = "Brak danych",
  isLoading = false,
  isSection,
  ...tableProps
}: Readonly<PaginatedTableProps<T>>) {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(initialRowsPerPage);

  const pages = Math.ceil(items.length / rowsPerPage);

  const itemsOnPageMap = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageItems = items.slice(start, end);
    const map = new Map<string, { item: T; globalIndex: number }>();
    pageItems.forEach((item, idx) => {
      map.set(String(keyExtractor(item)), { item, globalIndex: start + idx });
    });
    return map;
  }, [items, page, rowsPerPage, keyExtractor]);

  const start = (page - 1) * rowsPerPage + 1;
  const end = Math.min(page * rowsPerPage, items.length);

  return (
    <div className="min-w-115">
      {header && <div className="mb-4 text-lg font-semibold">{header}</div>}
      <Table
        {...tableProps}
        aria-label={header || "Tabela"}
        onRowAction={
          onRowClick
            ? (key) => {
                const entry = itemsOnPageMap.get(String(key));
                if (entry) {
                  const isNotSection = isSection
                    ? !isSection(entry.item)
                    : true;
                  if (isNotSection) {
                    setTimeout(() => onRowClick(entry.item), 300);
                  }
                }
              }
            : undefined
        }
        classNames={{
          tr: onRowClick ? "cursor-pointer" : "",
          td: "data-[selected=true]:before:border-b-heroui-primary data-[selected=true]:after:bg-heroui-primary",
        }}
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={String(column.key)}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent={emptyMessage} isLoading={isLoading}>
          {Array.from(itemsOnPageMap.values()).map(({ item, globalIndex }) => (
            <TableRow
              key={keyExtractor(item)}
              className={isSection?.(item) ? "bg-gray-50 font-semibold" : ""}
            >
              {columns.map((column) => (
                <TableCell
                  key={String(column.key)}
                  className={isSection?.(item) ? "py-3" : ""}
                >
                  {column.render
                    ? column.render(item, globalIndex)
                    : ((item as Record<string, unknown>)[
                        String(column.key)
                      ] as React.ReactNode)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {items.length > rowsPerPage && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            {start} do {end} z {items.length}
          </div>
          <Pagination
            total={pages}
            page={page}
            onChange={setPage}
            showControls
          />
        </div>
      )}
    </div>
  );
}
