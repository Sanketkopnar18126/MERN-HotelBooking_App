import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
export const HotelCard = ({ hotelData }) => {
  return (
   //  <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
   //    <Link to={`/listing-page/${hotelDataData?._id}`}>
   //      <img
   //        src={
   //          hotelDataData?.image[0] ||
   //          "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
   //        }
   //        alt="listing cover"
   //        className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
   //      />
   //      <div className="p-3 flex flex-col gap-2 w-full">
   //        <p className="truncate text-lg font-semibold text-slate-700">
   //          {hotelDataData?.name}
   //        </p>
   //        <div className="flex items-center gap-1">
   //          <MdLocationOn className="h-4 w-4 text-green-700" />
   //          <p className="text-sm text-gray-600 truncate w-full">
   //            {hotelDataData?.address}
   //          </p>
   //        </div>
   //        <p className="text-sm text-gray-600 line-clamp-2">
   //          {hotelDataData?.description}
   //        </p>
   //        <p className="text-slate-500 mt-2 font-semibold ">
   //          ${hotelDataData?.regularPrice.toLocaleString("en-US")}
   //          {hotelDataData?.type === "rent" && " / month"}
   //        </p>
   //        <div className="text-slate-700 flex gap-4">
   //          <div className="font-bold text-xs">
   //            {hotelDataData?.bedrooms > 1
   //              ? `${hotelDataData?.bedrooms} beds `
   //              : `${hotelDataData?.bedrooms} bed `}
   //          </div>
   //          <div className="font-bold text-xs">
   //            {hotelDataData?.bathrooms > 1
   //              ? `${hotelDataData?.bathrooms} baths `
   //              : `${hotelDataData?.bathrooms} bath `}
   //          </div>
   //        </div>
   //      </div>
   //    </Link>
   //  </div>
   <>
   {/* {console.log("hotelDataData",hotelDataData)} */}
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
      <div className="w-full h-[300px]">
        <img
          src={hotelData.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotelData.starRating }).map(() => (
                <AiFillStar className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-1 text-sm">{hotelData.type}</span>
          </div>
          <Link
            to={`/detail/${hotelData._id}`}
            className="text-2xl font-bold cursor-pointer"
          >
            {hotelData.name}
          </Link>
        </div>

        <div>
          <div className="line-clamp-4">{hotelData.description}</div>
        </div>

        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <div className="flex gap-1 items-center">
            {hotelData.facilities.slice(0, 3).map((facility,index) => (
              <span key={index} className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotelData.facilities.length > 3 &&
                `+${hotelData.facilities.length - 3} more`}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-bold">£{hotelData.pricePerNight} per night</span>
            <Link
              to={`/details/${hotelData._id}`}
              className="bg-blue-600 text-white h-full p-2 font-bold text-xl max-w-fit hover:bg-blue-500"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div> 
   </>
  );
};
