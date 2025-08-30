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

export default function BarChart({ labels, sales,title, horizontal = false }) {
    const barColors = horizontal ? getRandomColors(sales.length) : 'rgba(75,192,192,1)';
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
            title: { display: true, text: title, color: '#ffffff' }
        },
        scales: {
            x: {
                grid: { color: '#e0e0e0' },
                ticks: { autoSkip: false },
            },
            y: {
                grid: { color: '#e0e0e0' },
                beginAtZero: true
            },
        },
    };

    return (
        <div className='rounded-2xl bg-zinc-900  p-4 shadow '>
            <Bar data={data} options={options} height={300}/>
        </div>
    );
}
