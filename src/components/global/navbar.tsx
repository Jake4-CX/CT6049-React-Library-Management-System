import { XMarkIcon, Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchComponent from "./search";

type PageType = {
  title: string,
  url: string,
  icon?: React.ReactNode,
  subPages?: PageType[]
}

const pageRoutes: PageType[] = [
  {
    title: "Home",
    url: "/example",
  },
  {
    title: "Example 2",
    url: "/example2",
  }
]


const NavbarComponent: React.FC = () => {

  const navigate = useNavigate();

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  return (
    <>
      <section id="navbar" className="sticky flex items-center justify-center top-0 w-full bg-[#17181c]/95 backdrop-blur-sm py-4 z-10 min-h-[4.688rem]" aria-label="Site Header">
        <div className="flex flex-wrap items-center justify-between w-full max-w-full lg:w-5/6 xl:max-w-7xl px-[4%] mx-auto">

          <div className="flex overflow-hidden cursor-pointer select-none">
            <h2 className="font-extrabold tracking-tight text-white text-xl">
              Library Management System
            </h2>
          </div>

          {
            isBurgerOpen && (
              <XMarkIcon className="lg:hidden block text-[#f8f8f9] hover:text-[#6d6f71] h-8 w-8 cursor-pointer transition-colors duration-300" onClick={() => setIsBurgerOpen(false)} />
            )
          }

          {/* Navbar Content */}
          <nav className={`${isBurgerOpen ? "block" : "hidden"} lg:flex lg:items-center lg:w-auto w-full lg:space-x-3`}>

            {/* Search bar */}
            <SearchComponent />

            {/* User Profile / Login */}
            <div className="max-w-full flex items-center justify-center space-x-6 lg:space-y-0 h-10">
              <button
                className={`${isBurgerOpen ? "w-[100vw] lg:w-auto" : "hidden lg:block"} h-full flex items-center justify-center bg-[#353535] hover:bg-[#3f3f3f] text-white duration-300 rounded-lg space-x-3 px-4 py-2 lg:px-6`}
                onClick={() => navigate("/login")}
              >
                <h3 className="text-sm font-semibold line-clamp-1">Login</h3>
              </button>
            </div>

          </nav>

          {
            !isBurgerOpen && (
              <Bars3Icon className="lg:hidden block text-[#f8f8f9] hover:text-[#6d6f71] h-8 w-8 cursor-pointer transition-colors duration-300" onClick={() => setIsBurgerOpen(true)} />
            )
          }

        </div>
      </section>
    </>
  )
}

export default NavbarComponent;