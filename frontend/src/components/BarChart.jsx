import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function getRandomColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const hue = Math.floor(Math.random() * 360);  
        const saturation = Math.floor(Math.random() * 30 + 70); 
        const lightness = Math.floor(Math.random() * 20 + 50); 
        colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }
    return colors;
}

export default function BarChart({ labels, sales, horizontal = false }) {
    const barColors = horizontal ? getRandomColors(sales.length) : 'rgba(75,192,192,0.7)';
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'EVs Sold',
                data: sales,
                backgroundColor: barColors,
            },
        ],
    };

    const options = {
        indexAxis: horizontal ? 'y' : 'x',
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'EV Sales by City' },
        },
        scales: {
            x: {
                grid: { color: '#e0e0e0' },
                ticks: { autoSkip: false } // show all city labels
            },
            y: {
                grid: { color: '#e0e0e0' },
                beginAtZero: true
            },
        },
    };

    return (
        <div className='rounded-2xl bg-white  p-4 shadow '>
            <Bar data={data} options={options} height={300}/>
        </div>
    );
}
