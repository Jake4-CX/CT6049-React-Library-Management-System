import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { useQuery } from '@tanstack/react-query';
import { getAdminBookCategoryStatistics } from '../../../api/statistics';
import { useEffect, useState } from 'react';

const BooksByCategoryGraph: React.FC = () => {

  const bookCategories = useQuery({
    queryKey: ["bookCategoryStatistics"],
    cacheTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {

      return ((await getAdminBookCategoryStatistics()).data).stats as { categoryName: string, bookCount: number }[];
    }
  });

  useEffect(() => {
    if ((!(bookCategories.isLoading)) && bookCategories.data && bookCategories.data.length > 0) {
      setChartData({
        labels: bookCategories.data.map(category => category.categoryName),
        datasets: [
          {
            label: "Books by Category",
            data: bookCategories.data.map(category => category.bookCount),
            backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 205, 86)", "rgb(255, 99, 132)", "rgb(75, 192, 192)", "rgb(153, 102, 255)", "rgb(255, 159, 64)"],
            hoverBackgroundColor: ["rgb(54, 162, 235)", "rgb(255, 205, 86)", "rgb(255, 99, 132)", "rgb(75, 192, 192)", "rgb(153, 102, 255)", "rgb(255, 159, 64)"],
          },
        ],
      });
    }
  }, [bookCategories.data, bookCategories.isLoading]);

  const [chartData, setChartData] = useState(data);

  return (
    <div className="chart w-full h-full p-4">
      {
        bookCategories.isLoading ? (
          <>
            {/* Loading spinner */}
            <div className="flex justify-center items-center w-full h-full">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
          </>
        ) : (
          <Pie data={chartData} options={options} />
        )
      }
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