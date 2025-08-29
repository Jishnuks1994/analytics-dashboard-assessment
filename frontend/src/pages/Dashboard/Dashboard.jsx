import React, { useEffect, useState } from "react";
import Card from '../../components/Card'

function Dashboard() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("/Electric_Vehicle_Population_Data.csv")
            .then((response) => response.text())
            .then((csvText) => {
                const rows = csvText.split("\n").map((row) => row.split(","));
                setData(rows);
            });
    }, []);

    const totalVehicles = data.length - 1;

    // average vehicle range
    const ranges = data
        .slice(1) // skip header row
        .map(row => parseInt(row[10]))
        .filter(val => !isNaN(val) && val > 0);
    const electricRanges =
        (ranges.reduce((sum, val) => sum + val, 0) / ranges.length).toFixed(2);


    // bev percentage
    const typeIndex = 8;
    const types = data.slice(1).map(row => row[typeIndex]).filter(val => val);
    const total = types.length;
    const bevCount = types.filter(t => t.includes("Battery Electric Vehicle (BEV)")).length;
    const bevPercent = ((bevCount / total) * 100).toFixed(2);

    //average MSRP
    const msrpIndex = 11
    const msrp = data.slice(1).map(row => Number(row[msrpIndex])).filter(val => val > 0);
    const msrpSum = msrp.reduce((a, b) => a + b, 0)
    const msrpAverage = (msrpSum / msrp.length).toFixed(2)


    return (

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 p-2 gap-2">
            <Card title={"Total Vehicles"} value={totalVehicles} />
            <Card title={"% BEV vs PHEV"} value={`${bevPercent}%`} />
            <Card title={"Avg Electric Range"} value={electricRanges} />
            <Card title={"Avg MSRP"} value={`$ ${msrpAverage}`} />
        </div>
    )
}

export default Dashboard