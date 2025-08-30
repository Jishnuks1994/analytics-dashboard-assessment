import React, { useEffect, useState } from "react";
import Card from '../../components/Card'
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import DataTable from "../../components/DataTable";
import SkeletonLoader from "../../components/SkeletonLoader";

function Dashboard() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/Electric_Vehicle_Population_Data.csv")
            .then((response) => response.text())
            .then((csvText) => {
                const rows = csvText.split("\n").map((row) => row.split(","));
                setData(rows);
                setLoading(false);
            });
    }, []);

    if (loading || data.length === 0) {
        return <SkeletonLoader />;
    }

    // ================== derived values ==================
    const totalVehicles = data.length - 1;

    // average vehicle range
    const ranges = data.slice(1).map(row => parseInt(row[10])).filter(val => !isNaN(val) && val > 0);
    const electricRanges =
        (ranges.reduce((sum, val) => sum + val, 0) / ranges.length).toFixed(2);

    // bev percentage
    const typeIndex = 8;
    const types = data.slice(1).map(row => row[typeIndex]).filter(val => val);
    const total = types.length;
    const bevCount = types.filter(t => t.includes("Battery Electric Vehicle (BEV)")).length;
    const bevPercent = ((bevCount / total) * 100).toFixed(2);

    // average MSRP
    const msrpIndex = 11;
    const msrp = data.slice(1).map(row => Number(row[msrpIndex])).filter(val => val > 0);
    const msrpSum = msrp.reduce((a, b) => a + b, 0)
    const msrpAverage = (msrpSum / msrp.length).toFixed(2)

    // registrations by year
    const regRows = data.slice(1);
    const registrationsByYear = {};
    regRows.forEach(row => {
        const year = row[5];
        if (!registrationsByYear[year]) registrationsByYear[year] = 0;
        registrationsByYear[year] += 1;
    });
    const regLabels = Object.keys(registrationsByYear).sort();
    const registrations = regLabels.map(year => registrationsByYear[year]);

    // top cities
    const salesByCity = {};
    regRows.forEach(row => {
        const city = row[2];
        if (!salesByCity[city]) salesByCity[city] = 0;
        salesByCity[city] += 1;
    });
    const sortedCities = Object.entries(salesByCity).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const cityLabels = sortedCities.map(([city]) => city);
    const citySales = sortedCities.map(([_, count]) => count);

    // top makers
    const makerSales = {};
    regRows.forEach(row => {
        const maker = row[6];
        if (!makerSales[maker]) makerSales[maker] = 0;
        makerSales[maker] += 1;
    });
    const topMakers = Object.entries(makerSales).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const makerLabels = topMakers.map(([maker]) => maker);
    const makerCounts = topMakers.map(([_, count]) => count);

    // ================== render ==================
    return (
        <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 p-2 gap-2">
                <Card title={"Total Vehicles"} value={totalVehicles} />
                <Card title={"% BEV vs PHEV"} value={`${bevPercent}%`} />
                <Card title={"Avg Electric Range"} value={`${electricRanges} mi`} />
                <Card title={"Avg MSRP"} value={`$${msrpAverage}`} />
            </div>

            <div className="grid sm:grid-cols-2 p-2 gap-2">
                <div>
                    {regLabels.length > 0 && (
                        <LineChart labels={regLabels} registrations={registrations} />
                    )}
                    <div className="grid grid-cols-2 py-2 gap-2">
                        {cityLabels.length > 0 && (
                            <BarChart title={'EV Sales by City'} labels={cityLabels} sales={citySales} />
                        )}
                        {makerLabels.length > 0 && (
                            <BarChart title={'Top Sellers'} labels={makerLabels} sales={makerCounts} horizontal />
                        )}
                    </div>
                </div>
                {data.length > 1 && (
                    <div className="w-full overflow-hidden">
                        <DataTable data={data} rowsPerPage={10} />
                    </div>
                )}
            </div>
        </>
    )
}

export default Dashboard;
