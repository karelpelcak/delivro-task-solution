'use client';

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import Button from "./Button/Button";
import { IInvoice } from "@/app/[locale]/page";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

interface IFileUpload {
  onClose?: () => void
}

const FileUpload = ({ onClose }: IFileUpload) => {
  const [fileData, setFileData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const t = useTranslations('FileUpload')

  const columnHelper = createColumnHelper<IInvoice>();

  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row.id, {
        id: "Id",
        header: "Id",
      }),
      columnHelper.accessor((row) => row.shipment.id, {
        id: "Shipment Id",
        header: "Shipment Id",
      }),
      columnHelper.accessor((row) => row.shipment.createdAt, {
        id: "Shipment Created At",
        header: "Shipment Created At",
      }),
      columnHelper.accessor((row) => row.shipment.trackingNumber, {
        id: "Shipment Tracking Number",
        header: "Shipment Tracking Number",
      }),
      columnHelper.accessor((row) => row.shipment.company.id, {
        id: "Company Id",
        header: "Company Id",
      }),
      columnHelper.accessor((row) => row.shipment.company.name, {
        id: "Company Name",
        header: "Company Name",
      }),
      columnHelper.accessor((row) => row.shipment.provider, {
        id: "Shipment Provider",
        header: "Shipment Provider",
      }),
      columnHelper.accessor((row) => row.shipment.mode, {
        id: "Shipment Mode",
        header: "Shipment Mode",
      }),
      columnHelper.accessor((row) => row.shipment.originCountry, {
        id: "Shipment Origin Country",
        header: "Shipment Origin Country",
      }),
      columnHelper.accessor((row) => row.shipment.destinationCountry, {
        id: "Shipment Destination Country",
        header: "Shipment Destination Country",
      }),
      columnHelper.accessor((row) => row.invoicedPrice, {
        id: "Invoiced Price",
        header: "Invoiced Price",
      }),
      columnHelper.accessor((row) => row.invoicedWeight, {
        id: "Invoiced Weight",
        header: "Invoiced Weight",
      }),
    ],
    []
  );

  const table = useReactTable({
    data: fileData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (!Array.isArray(json)) throw new Error(t('errors.invalidArray'));
        setFileData(json);
      } catch (err) {
        alert(t('errors.invalidJson'));
      }
    };
    reader.readAsText(file);
  };

  const handleUpload = async () => {
    if (!fileData.length) return;
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fileData),
      });

      const result = await res.json();
      toast.success(t('messages.uploaded', { count: result.count }))
      setFileData([]);
      onClose?.();
    } catch (err) {
      console.error(err);
      toast.error(t('errors.uploadFailed'))
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
      {fileData.length > 0 ? (
        <div
          className="
    max-h-[450px] overflow-auto w-full border-2 rounded-xl bg-white 
    [&::-webkit-scrollbar]:w-3
    [&::-webkit-scrollbar-track]:bg-gray-200
    [&::-webkit-scrollbar-track]:rounded-full
    [&::-webkit-scrollbar-track]:m-1
    [&::-webkit-scrollbar-thumb]:bg-gray-400
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:border-2
    [&::-webkit-scrollbar-thumb]:border-solid
    [&::-webkit-scrollbar-thumb]:border-transparent
    [&::-webkit-scrollbar-thumb]:bg-clip-padding"
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      <button
                        onClick={header.column.getToggleSortingHandler()}
                        className="flex items-center gap-1"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: "↑",
                          desc: "↓",
                        }[header.column.getIsSorted() as string] ?? null}
                      </button>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="divide-y divide-gray-200">
              {table.getRowModel().rows.map(row => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-100"
                >
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="px-4 py-2 text-sm text-gray-700"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-full h-[450px] bg-gray-600 rounded-xl" />
      )}

      <div className="flex gap-4 items-center justify-center">
        <div>
          <label htmlFor="file" className="mb-4 px-4 py-2 rounded-lg border-2">
            {t('UploadFile')}
          </label>
          <input
            id="file"
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <Button
          onClick={handleUpload}
          disabled={loading || !fileData.length}
          label={loading ? t('buttons.uploading') : t('buttons.upload')}
        />
      </div>
    </div >
  );
}

export default FileUpload;