import React, { useState, useMemo } from "react";

const DataTable = ({ data, rowsPerPage = 10}) => {
    if (!data || data.length === 0) return <p>No data available</p>;

    const headers = data[0]; // first row = headers
    const rows = data.slice(1); // rest = rows

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    // 🔎 filter rows by search
    const filteredRows = useMemo(() => {
        if (!search) return rows;
        return rows.filter((row) =>
            row.some((cell) =>
                cell.toString().toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [rows, search]);

    // pagination logic
    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
    const startIndex = (page - 1) * rowsPerPage;
    const paginatedRows = filteredRows.slice(
        startIndex,
        startIndex + rowsPerPage
    );

    const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
    const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));

    return (
        <div className="rounded-2xl bg-white  p-4 shadow ">
            {/* Search Input */}
            <div className="mb-4 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search..."
                    className="border px-3 py-2 rounded-lg w-1/3"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1); // reset to page 1 on new search
                    }}
                />
                <span className="text-sm text-gray-600">
                    Showing {paginatedRows.length} of {filteredRows.length} results
                </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border rounded-lg shadow">
                <table className="min-w-full border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            {headers.map((header, i) => (
                                <th
                                    key={i}
                                    className="px-4 py-2 border text-left text-sm font-semibold"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedRows.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                            >
                                {row.map((cell, cellIndex) => (
                                    <td
                                        key={cellIndex}
                                        className="px-4 py-2 border text-sm whitespace-nowrap"
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <button
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    onClick={handlePrev}
                    disabled={page === 1}
                >
                    Prev
                </button>
                <span className="text-sm">
                    Page {page} of {totalPages}
                </span>
                <button
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    onClick={handleNext}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default DataTable;
