'use client';

import { useState } from "react";

export default function FileUpload() {
  const [fileData, setFileData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (!Array.isArray(json)) throw new Error("JSON musí být pole objektů");
        setFileData(json);
      } catch (err) {
        alert("Neplatný JSON soubor!");
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
      alert(`Nahráno ${result.count} záznamů`);
      setFileData([]);
    } catch (err) {
      console.error(err);
      alert("Chyba při odesílání souboru");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <input type="file" accept=".json" onChange={handleFileChange} className="mb-4" />

      {fileData.length > 0 && (
        <div className="max-h-96 overflow-auto border rounded w-full bg-white dark:bg-neutral-800">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
            <thead className="bg-gray-50 dark:bg-neutral-900 sticky top-0">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tracking</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Provider</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Mode</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Weight</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Company</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
              {fileData.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-100 dark:hover:bg-neutral-700">
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">{item.shipment.trackingNumber}</td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">{item.shipment.provider}</td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">{item.shipment.mode}</td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">{item.invoicedWeight}</td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">{item.invoicedPrice}</td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">{item.shipment.company.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading || !fileData.length}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Nahrávám..." : "Nahrát JSON"}
      </button>
    </div>
  );
}
