import DefaultLayout from "../../layouts/defaultLayout";
import { useState } from "react";
import CreateBookModal from "../../components/dashboard/modals/createBook";
import CreateCategoryModal from "../../components/dashboard/modals/createCategory";
import CreateAuthorModal from "../../components/dashboard/modals/createAuthor";
import BookCirculationGraph from "../../components/dashboard/graphs/bookCirculation";
import BooksByCategoryGraph from "../../components/dashboard/graphs/booksByCategory";
import OverdueTable from "../../components/dashboard/tables/overdueTable";
import MyLoansTable from "../../components/dashboard/tables/myLoansTable";
import { useNavigate } from "react-router-dom";
import { removeLocalStoredTokens, removeLocalStoredUser } from "../../api/authentication";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setTokens, setUser } from "../../redux/features/user-slice";
import AdminStatisticsOverviewCards from "../../components/dashboard/cards/adminStatisticsCards";

const AdminDashboardPage: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  
  const navigate = useNavigate();

  const [showCreateBookModal, setShowCreateBookModal] = useState(false);
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [showCreateAuthorModal, setShowCreateAuthorModal] = useState(false);

  return (
    <DefaultLayout className="mt-3">
      <div className="w-full md:w-[44rem] xl:w-[56rem] space-y-3 bg-gray-200 p-4 rounded-lg">
        <div className="flex flex-row justify-between">
          <div className="">
            <h1 className="text-lg font-bold">Admin Dashboard</h1>
            <p className="text-sm font-light tracking-tight">Some subheading text</p>
          </div>
          <div className="flex items-center justify-center">
            {/* Logout button */}
            <button onClick={handleLogout} className="w-full bg-[#353535] text-white rounded-lg py-2 px-6">Logout</button>
          </div>
        </div>

        <AdminStatisticsOverviewCards />

        {/* Buttons for "Add Book", "Add Category" */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-x-3 sm:space-y-0">
          <button onClick={() => setShowCreateBookModal(true)} className="w-full bg-[#353535] text-white rounded-lg p-4">Add Book</button>
          <button onClick={() => setShowCreateCategoryModal(true)} className="w-full bg-[#353535] text-white rounded-lg p-4">Add Category</button>
          <button onClick={() => setShowCreateAuthorModal(true)} className="w-full bg-[#353535] text-white rounded-lg p-4">Add Author</button>
        </div>

        <div className="flex flex-col sm:flex-row w-full space-y-3 sm:space-y-0 sm:space-x-3">
          {/* Book Circulation */}
          <div className="w-full bg-white rounded-lg p-4">
            <h1 className="text-xl font-bold">Book Circulation</h1>
            <p className="text-sm font-light tracking-tight">Some subheading text</p>
            <div className="relative w-full h-[20rem] bg-gray-200 rounded-lg">
              <BookCirculationGraph />
            </div>
          </div>

          {/* Books by Category */}
          <div className="w-full bg-white rounded-lg p-4">
            <h1 className="text-xl font-bold">Books by Category</h1>
            <p className="text-sm font-light tracking-tight">Some subheading text</p>
            <div className="relative w-full h-[20rem] bg-gray-200 rounded-lg">
              <BooksByCategoryGraph />
            </div>
          </div>

        </div>

        {/* Table of Overdue Books */}
        <div className="flex flex-col items-center justify-center w-full bg-white rounded-lg p-4">
          <div className="w-full">
            <h1 className="text-xl font-bold">Current Overdue loans</h1>
            <p className="text-sm font-light tracking-tight">Some subheading text</p>
          </div>
          <OverdueTable />
        </div>

        {/* My Loans table */}
        <div className="flex flex-col items-center justify-center w-full bg-white rounded-lg p-4">
          <div className="w-full">
            <h1 className="text-xl font-bold">My Loans</h1>
            <p className="text-sm font-light tracking-tight">Some subheading text</p>
          </div>
          <MyLoansTable />
        </div>

      </div>
      <CreateBookModal isOpen={showCreateBookModal} closeCallback={setShowCreateBookModal} />
      <CreateCategoryModal isOpen={showCreateCategoryModal} closeCallback={setShowCreateCategoryModal} />
      <CreateAuthorModal isOpen={showCreateAuthorModal} closeCallback={setShowCreateAuthorModal} />
    </DefaultLayout>
  )

  function handleLogout() {
    removeLocalStoredUser();
    removeLocalStoredTokens();

    dispatch(setUser(undefined));
    dispatch(setTokens(undefined));

    navigate("/login");
  }
}

export default AdminDashboardPage;