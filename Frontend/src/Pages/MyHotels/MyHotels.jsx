import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
export const MyHotels = () => {
  const [hotelData, sethotelData] = useState();

  const { currentUser } = useSelector((state) => state.userdata);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/users/get_hotels/${currentUser?.data?.user?._id}`
        );
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          sethotelData(data);
        }
      } catch (error) {
        console.log("error at fetching userHotelData in react ui", error);
      }
    };
    fetchData();
  }, []);
  console.log("HotelData", hotelData);
  return (
    <>
      <div className="space-y-5">
        <span className="flex justify-between">
          <h1 className="text-3xl font-bold">My Hotels</h1>
          <Link
            to="/add-hotel"
            className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
          >
            Add Hotel
          </Link>
        </span>
        <div className="grid grid-cols-1 gap-8">
          {hotelData?.data.map((hotel) => (
          <div
          key={hotel._id}
            data-testid="hotel-card"
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
          >
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsMap className="mr-1" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiMoney className="mr-1" />£{hotel.pricePerNight} per night
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiHotel className="mr-1" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiStar className="mr-1" />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                // to={`/edit-hotel/${hotel._id}`}
                className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
        </div>
      </div>
    </>
  );
};
