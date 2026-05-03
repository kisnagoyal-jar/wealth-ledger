'use client'
// Prev / next / numbered page controls. Dumb component — all state comes via props.
// Inserts "…" ellipsis for large page-number gaps.

import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious,
} from '../ui/pagination'

interface Props {
  currentPage: number
  totalPages: number
  totalCount: number
  onPageChange: (page: number) => void
}

export function TablePagination({ currentPage, totalPages, totalCount, onPageChange }: Props) {
  // Build page list: always include first, last, and neighbours of currentPage.
  // Insert 'ellipsis' string where pages are skipped.
  const pageItems = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
    .reduce<(number | 'ellipsis')[]>((acc, p, idx, arr) => {
      if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push('ellipsis')
      acc.push(p)
      return acc
    }, [])

  return (
    <div className="border-t border-border px-4 py-3 flex items-center justify-between">
      <p className="text-xs text-muted-foreground">
        Page {currentPage} of {totalPages} · {totalCount} transactions
      </p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#"
              onClick={(e) => { e.preventDefault(); onPageChange(Math.max(1, currentPage - 1)) }}
              aria-disabled={currentPage === 1}
              className={currentPage === 1 ? 'pointer-events-none opacity-40' : ''}
            />
          </PaginationItem>

          {pageItems.map((item, idx) =>
            item === 'ellipsis' ? (
              <PaginationItem key={`ell-${idx}`}>
                <span className="px-2 text-muted-foreground text-sm">…</span>
              </PaginationItem>
            ) : (
              <PaginationItem key={item}>
                <PaginationLink href="#" isActive={item === currentPage}
                  onClick={(e) => { e.preventDefault(); onPageChange(item) }}
                >{item}</PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext href="#"
              onClick={(e) => { e.preventDefault(); onPageChange(Math.min(totalPages, currentPage + 1)) }}
              aria-disabled={currentPage === totalPages}
              className={currentPage === totalPages ? 'pointer-events-none opacity-40' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
