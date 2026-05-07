"use client";
import { Pagination, Table, type TableProps } from "@heroui/react";
import { useCallback, useMemo, useState } from "react";

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
  rowsPerPageOptions: _rowsPerPageOptions,
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

  const getPageNumbers = useCallback((): (number | "ellipsis")[] => {
    if (pages <= 7) {
      return Array.from({ length: pages }, (_, i) => i + 1);
    }
    const numbers: (number | "ellipsis")[] = [1];
    if (page > 3) numbers.push("ellipsis");
    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(pages - 1, page + 1);
      i++
    ) {
      numbers.push(i);
    }
    if (page < pages - 2) numbers.push("ellipsis");
    numbers.push(pages);
    return numbers;
  }, [page, pages]);

  return (
    <div className="min-w-115">
      {header && <div className="mb-4 text-lg font-semibold">{header}</div>}
      <Table {...tableProps}>
        <Table.ScrollContainer>
          <Table.Content
            aria-label={header || "Tabela"}
            onRowAction={
              onRowClick
                ? (key: React.Key) => {
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
          >
            <Table.Header>
              {columns.map((column) => (
                <Table.Column id={String(column.key)} key={String(column.key)}>
                  {column.label}
                </Table.Column>
              ))}
            </Table.Header>
            <Table.Body
              renderEmptyState={() => (
                <p className="py-4 text-center">
                  {isLoading ? "Ładowanie..." : emptyMessage}
                </p>
              )}
            >
              {Array.from(itemsOnPageMap.values()).map(
                ({ item, globalIndex }) => {
                  const isSectionRow = isSection?.(item) ?? false;

                  return (
                    <Table.Row
                      id={String(keyExtractor(item))}
                      key={keyExtractor(item)}
                      className={`${onRowClick ? "cursor-pointer" : ""} ${
                        isSectionRow ? "bg-gray-50 font-semibold" : ""
                      }`.trim()}
                    >
                      {columns.map((column) => (
                        <Table.Cell
                          key={String(column.key)}
                          className={`data-[selected=true]:before:border-b-heroui-primary data-[selected=true]:after:bg-heroui-primary ${
                            isSectionRow ? "py-3" : ""
                          }`.trim()}
                        >
                          {column.render
                            ? column.render(item, globalIndex)
                            : ((item as Record<string, unknown>)[
                                String(column.key)
                              ] as React.ReactNode)}
                        </Table.Cell>
                      ))}
                    </Table.Row>
                  );
                },
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
      {items.length > rowsPerPage && (
        <Pagination className="w-full">
          <Pagination.Summary>
            {start}-{end} z {items.length}
          </Pagination.Summary>
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous
                isDisabled={page === 1}
                onPress={() => setPage((current) => Math.max(1, current - 1))}
              >
                <Pagination.PreviousIcon />
              </Pagination.Previous>
            </Pagination.Item>
            {getPageNumbers().map((p, i) =>
              p === "ellipsis" ? (
                <Pagination.Item key={`ellipsis-${i}`}>
                  <Pagination.Ellipsis />
                </Pagination.Item>
              ) : (
                <Pagination.Item key={p}>
                  <Pagination.Link
                    isActive={page === p}
                    onPress={() => setPage(p)}
                  >
                    {p}
                  </Pagination.Link>
                </Pagination.Item>
              ),
            )}
            <Pagination.Item>
              <Pagination.Next
                isDisabled={page === pages}
                onPress={() =>
                  setPage((current) => Math.min(pages, current + 1))
                }
              >
                <Pagination.NextIcon />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      )}
    </div>
  );
}
