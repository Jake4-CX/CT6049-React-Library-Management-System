import { useDispatch } from "react-redux";
import DefaultLayout from "../../layouts/defaultLayout";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { removeLocalStoredTokens, removeLocalStoredUser } from "../../api/authentication";
import { setTokens, setUser } from "../../redux/features/user-slice";
import MyLoansTable from "../../components/dashboard/tables/myLoansTable";
import MyCurrentLoansTable from "../../components/dashboard/tables/myCurrentLoansTable";
import MonthlyFineCard from "../../components/dashboard/cards/monthlyFineCard";
import MyFinesTable from "../../components/dashboard/tables/myFinesTable";



const UserDashboardPage: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  return (
    <DefaultLayout className="mt-3">
      <div className="w-full md:w-[44rem] xl:w-[56rem] space-y-3 bg-gray-200 p-4 rounded-lg">
        <div className="flex flex-row justify-between">
          <div className="">
            <h1 className="text-lg font-bold">User Dashboard</h1>
            <p className="text-sm font-light tracking-tight">Some subheading text</p>
          </div>
          <div className="flex items-center justify-center">
            {/* Logout button */}
            <button onClick={handleLogout} className="w-full bg-[#353535] text-white rounded-lg py-2 px-6">Logout</button>
          </div>
        </div>

        <MonthlyFineCard />

        {/* Table of my Fines */}
        <div className="flex flex-col items-center justify-center w-full bg-white rounded-lg p-4">
          <div className="w-full">
            <h1 className="text-xl font-bold">My Fines</h1>
            <p className="text-sm font-light tracking-tight">Some subheading text</p>
          </div>
          <MyFinesTable />
        </div>

        {/* Table of my current Loans */}
        {/* Table of Overdue Books */}
        <div className="flex flex-col items-center justify-center w-full bg-white rounded-lg p-4">
          <div className="w-full">
            <h1 className="text-xl font-bold">My Current Loans</h1>
            <p className="text-sm font-light tracking-tight">Some subheading text</p>
          </div>
          <MyCurrentLoansTable />
        </div>

        {/* Table of all my Loans */}
        <div className="flex flex-col items-center justify-center w-full bg-white rounded-lg p-4">
          <div className="w-full">
            <h1 className="text-xl font-bold">My Loan History</h1>
            <p className="text-sm font-light tracking-tight">Some subheading text</p>
          </div>
          <MyLoansTable />
        </div>

      </div>
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

export default UserDashboardPage;