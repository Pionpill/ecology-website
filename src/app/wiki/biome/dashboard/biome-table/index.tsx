import { BiomeModel } from '@ecology-mc/data'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { FC } from 'react'
import useBiomeColumns from './useBiomeColumns'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useTranslation } from 'react-i18next'

export type BiomeTableProps = {
  data: BiomeModel[]
}

const BiomeTable: FC<BiomeTableProps> = (props) => {
  const { data } = props
  const { t } = useTranslation()
  const columns = useBiomeColumns()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const rows = table.getRowModel().rows

  return (
    <Table>
      <TableHeader className="bg-muted sticky top-0 rounded-lg">
        {table.getHeaderGroups().map((group) => (
          <TableRow key={group.id}>
            {group.headers.map((header) => (
              <TableHead className="uppercase" id={header.id} key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody className="h-full">
        {rows?.length ? (
          rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
              className="cursor-pointer"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              {t('common.noResults')}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default BiomeTable
