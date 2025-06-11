import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../utils/cn'

const tableVariants = cva(
  'w-full caption-bottom text-sm',
  {
    variants: {
      variant: {
        default: '',
        striped: '[&_tbody_tr:nth-child(odd)]:bg-neutral-50',
        bordered: 'border border-neutral-200',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {}

const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn(tableVariants({ variant, size }), className)}
        {...props}
      />
    </div>
  )
)
Table.displayName = 'Table'

const TableHeader = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
))
TableHeader.displayName = 'TableHeader'

const TableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
))
TableBody.displayName = 'TableBody'

const TableFooter = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('bg-neutral-900 font-medium text-neutral-50 [&>tr]:last:border-b-0', className)}
    {...props}
  />
))
TableFooter.displayName = 'TableFooter'

const TableRow = forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b border-neutral-200 transition-colors hover:bg-neutral-50 data-[state=selected]:bg-neutral-100',
      className
    )}
    {...props}
  />
))
TableRow.displayName = 'TableRow'

const TableHead = forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-12 px-4 text-left align-middle font-medium text-neutral-500 [&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  />
))
TableHead.displayName = 'TableHead'

const TableCell = forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
    {...props}
  />
))
TableCell.displayName = 'TableCell'

const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-neutral-500', className)}
    {...props}
  />
))
TableCaption.displayName = 'TableCaption'

// Advanced Table with sorting and selection
export interface Column<T = any> {
  key: string
  title: string
  dataIndex?: keyof T
  render?: (value: any, record: T, index: number) => React.ReactNode
  sortable?: boolean
  width?: string | number
  align?: 'left' | 'center' | 'right'
  fixed?: 'left' | 'right'
}

export interface DataTableProps<T = any> {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  rowKey?: keyof T | ((record: T) => string)
  selectedRowKeys?: string[]
  onSelectChange?: (selectedRowKeys: string[]) => void
  onSort?: (key: string, direction: 'asc' | 'desc' | null) => void
  sortKey?: string
  sortDirection?: 'asc' | 'desc' | null
  pagination?: {
    current: number
    pageSize: number
    total: number
    onChange: (page: number, pageSize: number) => void
  }
  className?: string
}

const DataTable = <T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  rowKey = 'id',
  selectedRowKeys = [],
  onSelectChange,
  onSort,
  sortKey,
  sortDirection,
  pagination,
  className,
}: DataTableProps<T>) => {
  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record)
    }
    return String(record[rowKey] || index)
  }

  const handleSort = (key: string) => {
    if (!onSort) return
    
    let newDirection: 'asc' | 'desc' | null = 'asc'
    if (sortKey === key) {
      if (sortDirection === 'asc') {
        newDirection = 'desc'
      } else if (sortDirection === 'desc') {
        newDirection = null
      }
    }
    onSort(key, newDirection)
  }

  const handleSelectAll = (checked: boolean) => {
    if (!onSelectChange) return
    
    if (checked) {
      const allKeys = data.map((record, index) => getRowKey(record, index))
      onSelectChange(allKeys)
    } else {
      onSelectChange([])
    }
  }

  const handleSelectRow = (key: string, checked: boolean) => {
    if (!onSelectChange) return
    
    if (checked) {
      onSelectChange([...selectedRowKeys, key])
    } else {
      onSelectChange(selectedRowKeys.filter(k => k !== key))
    }
  }

  const isAllSelected = data.length > 0 && selectedRowKeys.length === data.length
  const isIndeterminate = selectedRowKeys.length > 0 && selectedRowKeys.length < data.length

  return (
    <div className={cn('space-y-4', className)}>
      <Table variant="bordered">
        <TableHeader>
          <TableRow>
            {onSelectChange && (
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-neutral-300"
                />
              </TableHead>
            )}
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={cn(
                  column.sortable && 'cursor-pointer select-none hover:bg-neutral-100',
                  column.align === 'center' && 'text-center',
                  column.align === 'right' && 'text-right'
                )}
                style={{ width: column.width }}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center gap-2">
                  {column.title}
                  {column.sortable && (
                    <div className="flex flex-col">
                      <svg
                        className={cn(
                          'h-3 w-3',
                          sortKey === column.key && sortDirection === 'asc'
                            ? 'text-primary-600'
                            : 'text-neutral-400'
                        )}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length + (onSelectChange ? 1 : 0)}>
                <div className="flex items-center justify-center py-8">
                  <div className="text-neutral-500">Loading...</div>
                </div>
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + (onSelectChange ? 1 : 0)}>
                <div className="flex items-center justify-center py-8">
                  <div className="text-neutral-500">No data</div>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data.map((record, index) => {
              const key = getRowKey(record, index)
              const isSelected = selectedRowKeys.includes(key)
              
              return (
                <TableRow
                  key={key}
                  data-state={isSelected ? 'selected' : undefined}
                >
                  {onSelectChange && (
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => handleSelectRow(key, e.target.checked)}
                        className="rounded border-neutral-300"
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => {
                    const value = column.dataIndex ? record[column.dataIndex] : record[column.key]
                    const content = column.render 
                      ? column.render(value, record, index)
                      : value
                    
                    return (
                      <TableCell
                        key={column.key}
                        className={cn(
                          column.align === 'center' && 'text-center',
                          column.align === 'right' && 'text-right'
                        )}
                      >
                        {content}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
      
      {pagination && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-neutral-500">
            Showing {((pagination.current - 1) * pagination.pageSize) + 1} to{' '}
            {Math.min(pagination.current * pagination.pageSize, pagination.total)} of{' '}
            {pagination.total} results
          </div>
          {/* Pagination controls would go here */}
        </div>
      )}
    </div>
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  DataTable,
  tableVariants,
} 