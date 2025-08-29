import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function LineChart({ labels, registrations }) {
    const data = {
        labels: labels, // years
        datasets: [
            {
                label: 'EV Registrations',
                data: registrations,
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                tension: 0.3, // smooth curve
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'EV Registrations by Year' },
        },
    };

    return <div className='rounded-2xl bg-white  p-4 shadow'><Line data={data} options={options} /></div>;
}
