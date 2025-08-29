import React, { useEffect, useState } from "react";
import Card from '../../components/Card'
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";

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

    // ev registration by year
    // Assuming `data` is your CSV array
    const regRows = data.slice(1); // skip header

    // Aggregate registrations by year
    const registrationsByYear = {};

    regRows.forEach(row => {
        const year = row[5]; // Model Year
        if (!registrationsByYear[year]) registrationsByYear[year] = 0;
        registrationsByYear[year] += 1; // count each EV as 1 registration
    });

    // Convert to arrays for Chart.js
    const regLabels = Object.keys(registrationsByYear).sort(); // ['2013', '2014', ...]
    const registrations = regLabels.map(year => registrationsByYear[year]);


    // top cities
    const CityRows = data.slice(1);

    const salesByCity = {};

    // Count EVs sold per city
    CityRows.forEach(row => {
        const city = row[2]; // City column
        if (!salesByCity[city]) salesByCity[city] = 0;
        salesByCity[city] += 1;
    });

    // Sort cities by sales descending (optional)
    const sortedCities = Object.entries(salesByCity)
        .sort((a, b) => b[1] - a[1]).slice(0, 5);

    const cityLabels = sortedCities.map(([city]) => city);
    const citySales = sortedCities.map(([_, count]) => count);

    return (

        <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 p-2 gap-2">
                <Card title={"Total Vehicles"} value={totalVehicles} />
                <Card title={"% BEV vs PHEV"} value={`${bevPercent}%`} />
                <Card title={"Avg Electric Range"} value={`${electricRanges} mi`} />
                <Card title={"Avg MSRP"} value={`$ ${msrpAverage}`} />
            </div>

            <div className="grid sm:grid-cols-2 p-2 gap-2">
                <div>
                    <LineChart labels={regLabels} registrations={registrations} />
                    <div className="grid grid-cols-2 py-2 gap-2">
                        <BarChart labels={cityLabels} sales={citySales}/>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard