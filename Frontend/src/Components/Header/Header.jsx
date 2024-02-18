import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Profile } from "../Profile/Profile";
export const Header = () => {
  const [userData, setuserData] = useState(null);
  const [showdropProfile, setshowdropProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { currentUser } = useSelector((state) => state.userdata);

  useEffect(() => {
    setuserData(currentUser);
  }, [currentUser]);

  const onHndleShowPofile = () => {
    setshowdropProfile(!showdropProfile);
  };
  // const onHandleHideProfile =()=>{
  //   setshowdropProfile(false)
  // }
  // console.log("data in header", userData);
  // console.log("currentUser in header",currentUser)
const navigate=useNavigate()

  const onHandleSubmitSerch = (e) => {
    e.preventDefault();
    const urlParms = new URLSearchParams(window.location.search);
    urlParms.set("searchTerm", searchTerm);

    const searchQuery = urlParms.toString();
    navigate(`/search?${searchQuery}`);

  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermForm = urlParams.get("searchTerm");
    // console.log("searchTermForm",searchTermForm)
    if (searchTermForm) {
      setSearchTerm(searchTermForm);
    }
  }, [location.search]);
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <Link
              to={"/"}
              className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >
              Tavalo
            </Link>
          </a>

          {currentUser?.data?.user ? (
            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <button
                onClick={onHndleShowPofile}
                // onMouseLeave={onHandleHideProfile }
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <img className="w-8 h-8 rounded-full" alt="user photo" />
              </button>
              {showdropProfile && <Profile />}
            </div>
          ) : null}

          <div className="bg-white flex h-[43px] rounded-[20px] p-[11px]">
            <input
              onClick={onHandleSubmitSerch}
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-24 sm:w-64"
            />
            <button>
              <FaSearch className="text-slate-600" />
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to={"/"}
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"/myhotels"}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  MyHotels
                </NavLink>
              </li>

              {currentUser?.data?.user ? null : (
                <li>
                  <NavLink
                    to={"/signin"}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    LogIn
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
