import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';

const BooksByCategoryGraph: React.FC = () => {

  return (
    <div className="chart w-full h-full p-4">
      <Pie data={data} options={options} />
    </div>
  )
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement
);

// Bar chart data

const data = {
  labels: ["Fiction", "Non-Fiction", "Science", "History", "Biography", "Poetry"],
  datasets: [
    {
      label: "Books by Category",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 205, 86)", "rgb(255, 99, 132)", "rgb(75, 192, 192)", "rgb(153, 102, 255)", "rgb(255, 159, 64)"],
      hoverBackgroundColor: ["rgb(54, 162, 235)", "rgb(255, 205, 86)", "rgb(255, 99, 132)", "rgb(75, 192, 192)", "rgb(153, 102, 255)", "rgb(255, 159, 64)"],
    },
  ],
};

// Bar chart options

const options = {
  responsive: true,
  maintainAspectRatio: false
};

export default BooksByCategoryGraph;