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
  ...tableProps
}: PaginatedTableProps<T>) {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(initialRowsPerPage);

  const pages = Math.ceil(items.length / rowsPerPage);

  const itemsOnPage = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return items
      .slice(start, end)
      .map((item, idx) => ({ item, globalIndex: start + idx }));
  }, [items, page, rowsPerPage]);

  const start = (page - 1) * rowsPerPage + 1;
  const end = Math.min(page * rowsPerPage, items.length);

  return (
    <div className="min-w-[450px]">
      {header && <div className="mb-4 text-lg font-semibold">{header}</div>}
      <Table
        {...tableProps}
        aria-label={header || "Tabela"}
        onRowAction={
          onRowClick
            ? (key) => {
                const item = itemsOnPage.find(
                  ({ item }) => String(keyExtractor(item)) === String(key),
                );
                if (item?.item) {
                  setTimeout(() => onRowClick(item.item), 300);
                }
              }
            : undefined
        }
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={String(column.key)}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent={emptyMessage} isLoading={isLoading}>
          {itemsOnPage.map(({ item, globalIndex }) => (
            <TableRow key={keyExtractor(item)}>
              {columns.map((column) => (
                <TableCell key={String(column.key)}>
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
