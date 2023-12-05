import { useQuery } from "@tanstack/react-query";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getAdminBookCirculationStatistics } from "../../../api/statistics";
import { useEffect, useState } from "react";


const BookCirculationGraph: React.FC = () => {

  const bookCirculation = useQuery({
    queryKey: ["bookCirculation"],
    cacheTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {

      const data = (await getAdminBookCirculationStatistics()).data;
      console.log(data);
      return (data).stats as { totalIssuedBooks: number, totalOverdueBooks: number, totalNotOverdueBooks: number };
    }
  });

  useEffect(() => {
    if ((!(bookCirculation.isLoading)) && bookCirculation.data) {
      console.log(bookCirculation.data.totalOverdueBooks);
      setChartData({
        labels: ["Loaned Books", "Overdue books"],
        datasets: [
          {
            label: "Book Circulation",
            data: [bookCirculation.data.totalNotOverdueBooks, bookCirculation.data.totalOverdueBooks],
            backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 205, 86)", "rgb(255, 99, 132)"],
            hoverBackgroundColor: ["rgb(54, 162, 235)", "rgb(255, 205, 86)", "rgb(255, 99, 132)"],
          },
        ],
      });
    }
  }, [bookCirculation.data, bookCirculation.isLoading]);

  const [chartData, setChartData] = useState(data);

  return (
    <div className="chart w-full h-full p-4">
      <Doughnut data={chartData} options={options} />
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