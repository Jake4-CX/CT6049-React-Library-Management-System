import { BsPeopleFill } from "react-icons/bs";
import DefaultLayout from "../../layouts/defaultLayout";
import { PiBooksFill } from "react-icons/pi";
import { FaBookOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminDashboardPage: React.FC = () => {

  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <div className="w-full md:w-[44rem] xl:w-[56rem] space-y-3 bg-gray-200 p-4 rounded-lg">
        <div className="">
          <h1 className="text-lg font-bold">Dashboard</h1>
          <p className="text-sm font-light tracking-tight">Some subheading text</p>
        </div>

        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 xl:gap-4">

            {/* Books */}
            <div className="w-full flex flex-row space-x-3 bg-[#8395fb] text-white rounded-lg p-4">
              <PiBooksFill className="w-8 h-8 opacity-80 my-auto" />
              <div className="flex flex-col">
                <h1 className="text-xl font-bold line-clamp-1">Books</h1>
                <div className="flex flex-row space-x-1">
                  <span className="opacity-90 text-sm font-medium tracking-tight">Total: 100</span>
                </div>
              </div>
            </div>

            {/* Members */}
            <div className="w-full flex flex-row space-x-3 bg-[#7fd81e] text-white rounded-lg p-4">
              <BsPeopleFill className="w-8 h-8 opacity-80 my-auto" />
              <div className="flex flex-col">
                <h1 className="text-xl font-bold line-clamp-1">Members</h1>
                <div className="flex flex-row space-x-1">
                  <span className="opacity-90 text-sm font-medium tracking-tight">Total: 36</span>
                </div>
              </div>
            </div>

            {/* Issued Books */}
            <div className="w-full flex flex-row space-x-3 bg-[#00c6ff] text-white rounded-lg p-4">
              <FaBookOpen className="w-8 h-8 opacity-80 my-auto" />
              <div className="flex flex-col">
                <h1 className="text-xl font-bold line-clamp-1">Issued Books</h1>
                <div className="flex flex-row space-x-1">
                  <span className="opacity-90 text-sm font-medium tracking-tight">Total: 17</span>
                </div>
              </div>
            </div>

            {/* Overdue Books */}
            <div className="w-full flex flex-row space-x-3 bg-[#ff0000] text-white rounded-lg p-4">
              <FaBookOpen className="w-8 h-8 opacity-80 my-auto" />
              <div className="flex flex-col">
                <h1 className="text-xl font-bold line-clamp-1">Overdue Books</h1>
                <div className="flex flex-row space-x-1">
                  <span className="opacity-90 text-sm font-medium tracking-tight">Total: 2</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Buttons for "Add Book", "Add Category" */}
        <div className="flex flex-row space-x-3">
          <button onClick={() => navigate("/books/add")} className="w-full bg-[#353535] text-white rounded-lg p-4">Add Book</button>
          <button className="w-full bg-[#353535] text-white rounded-lg p-4">Add Category</button>
        </div>

        <div className="flex flex-col sm:flex-row w-full space-y-3 sm:space-y-0 sm:space-x-3">
          {/* Book Circulation */}
          <div className="w-full bg-white rounded-lg p-4">
            <h1 className="text-xl font-bold">Book Circulation</h1>
            <p className="text-sm font-light tracking-tight">Some subheading text</p>
            <div className="relative w-full h-[20rem] bg-gray-200 rounded-lg">
              <p className="absolute bottom-2 right-2">Graph (Total Books, Reserved Books, Overdue Books)</p>
            </div>
          </div>

          {/* Books by Category */}
          <div className="w-full bg-white rounded-lg p-4">
            <h1 className="text-xl font-bold">Books by Category</h1>
            <p className="text-sm font-light tracking-tight">Some subheading text</p>
            <div className="relative w-full h-[20rem] bg-gray-200 rounded-lg">
              <p className="absolute bottom-2 right-2">Piechart showing categories</p>
            </div>
          </div>

        </div>
      </div>
    </DefaultLayout>
  )
}

export default AdminDashboardPage;