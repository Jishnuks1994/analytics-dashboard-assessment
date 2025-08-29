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

export default function BarChart({ labels, sales }) {
    const data = {
        labels: labels, // cities
        datasets: [
            {
                label: 'EVs Sold',
                data: sales,
                backgroundColor: 'rgba(75,192,192,0.7)',
            },
        ],
    };

    const options = {
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
