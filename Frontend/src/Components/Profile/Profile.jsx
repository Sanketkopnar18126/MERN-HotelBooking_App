import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOutSuccess } from "../../Slice/user.slice";

export const Profile = () => {
    let { currentUser } = useSelector((state) => state.userdata);
    // console.log("currentUser",currentUser)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const OnHandleSignOut = async () => {
        try {
          const res = await fetch('/users/logout', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!res.ok) {
            toast.error("Fill all details", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
              });
            throw new Error(`Failed to log out. Status: ${res.status}`);

          }
          toast.success("SignOut Successfully...", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
          });
          const data = await res.json();
          console.log("dataProfile", data);
          dispatch(signOutSuccess(data))
      navigate('/signin')
          // Additional logic if needed after successful logout
      
        } catch (error) {
          console.log("Error occurred during sign out:", error);
        }
      };
      
  return (
    <>
      <div className=" max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 absolute top-[65px] right-[13px] w-[301px] ">
        <div className="flex justify-end px-4 pt-4">
          <button
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
          ></button>
        </div>

        <div className="flex flex-col items-center pb-10">
          <input type="file" hidden accept="image/*" />
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg "
            alt="Bonnie image"
          />

          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {currentUser?.data?.user?.firstname}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {currentUser?.data?.user?.email}
          </span>
          <div className="flex mt-4 md:mt-6">
            <button onClick={OnHandleSignOut} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              SignOut
            </button>
            <NavLink
              to={"/updateprofile"}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
            >
              Update Profile
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
