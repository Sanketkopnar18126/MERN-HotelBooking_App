import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Booking = () => {
  const [bookingData, setBookingData] = useState();
  const userData = useSelector((state) => state.hoteldata);

  const { currentUser } = useSelector((state) => state.userdata);
  // console.log("cu",currentUser)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/users/me/${currentUser?.data?.user?._id}`);

        if (res.ok) {
          const data = await res.json();
          setBookingData(data);
        }
      } catch (error) {
        console.log("error at booking react component", error);
      }
    };
    fetchData();
  }, []);
  // console.log("bookingData", bookingData);
  return (
    <>
      <div className="flex justify-center gap-6 mt-[35px]">
        {/* Booking Details */}
        <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
          <h2 className="text-xl font-bold">Your Booking Details</h2>
          <div className="border-b py-2">
            Location:
            <div className="font-bold">{userData?.data?.city} ,{userData?.data?.country}</div>
            <div className="font-bold"></div>

          </div>
          <div className="flex justify-between">
            <div>
              Check-in
              <div className="font-bold">{userData?.data?.checkIn} </div>
            </div>
            <div>
              Check-out
              <div className="font-bold">{userData?.data?.checkOut} </div>
            </div>
          </div>
          <div className="border-t border-b py-2">
            Total length of stay:
            <div className="font-bold"> nights</div>
          </div>

          <div>
            Guests{" "}
            <div className="font-bold">
              adults {userData?.data?.adultCount} & children{" "}
              {userData?.data?.childCount}
            </div>
          </div>
        </div>

        {/* Booking Form */}

        <form className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
          <span className="text-3xl font-bold">Confirm Your Details</span>
          <div className="grid grid-cols-2 gap-6">
            <label className="text-gray-700 text-sm font-bold flex-1">
              First Name
              <input
                className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                type="text"
                readOnly
                disabled
              value={bookingData?.data?.firstname}
              />
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
              Last Name
              <input
                className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                type="text"
                readOnly
                disabled
              value={bookingData?.data?.lastname}
              />
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
              Email
              <input
                className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                type="text"
                readOnly
                disabled
             value={bookingData?.data?.email}
              />
            </label>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Your Price Summary</h2>

            <div className="bg-blue-200 p-4 rounded-md">
              <div className="font-semibold text-lg">
                Total Cost: £{userData?.data?.price.toFixed(2)}
              </div>
              <div className="text-xs">Includes taxes and charges</div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold"> Payment Details</h3>
            {/* <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm"
        /> */}
          </div>

          <div className="flex justify-end">
            <button
              // disabled={isLoading}
              type="submit"
              className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-md disabled:bg-gray-500"
            >
              {/* {isLoading ? "Saving..." : "Confirm Booking"} */}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
