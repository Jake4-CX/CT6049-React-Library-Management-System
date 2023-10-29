import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";


const BookCirculationGraph: React.FC = () => {

  return (
    <div className="chart w-full h-full p-4">
      <Doughnut data={data} options={options} />
    </div>
  )
}

ChartJS.register(ArcElement, Tooltip, Legend);

// Doughnut chart data

const data = {
  labels: ["Total", "Borrowed", "Returned"],
  datasets: [
    {
      label: "Book Circulation",
      data: [56, 12, 19],
      backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 205, 86)", "rgb(255, 99, 132)"],
      hoverBackgroundColor: ["rgb(54, 162, 235)", "rgb(255, 205, 86)", "rgb(255, 99, 132)"],
    },
  ],
};

// Doughnut chart options

const options = {
  responsive: true,
  maintainAspectRatio: false
};


export default BookCirculationGraph;