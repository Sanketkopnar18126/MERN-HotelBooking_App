import { useEffect, useState } from "react";
import { hotelFacilities, hotelTypes } from "../../HotelData/hotel.config";
import { HotelCard } from "../../Components/HotelCard/HotelCard";

export const Search = () => {
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [hotels, setHotels] = useState();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    facilities: "all",
    sort: "createdAt",
    order: "desc",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const facilitiesFromUrl = urlParams.get("facilities");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      facilitiesFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        facilities: facilitiesFromUrl || "all",
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
      });
    }

    const fetchHotels = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/users/hotels/get?${searchQuery}`);
      console.log("res", res);
      const data = await res.json();
      console.log("data in searchFun", data);

      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setHotels(data);
      setLoading(false);
    };
    fetchHotels();
  }, [location.search]);

  const handleSubmit = () => {};
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="p-7  border-b-2 md:border-r-2 md:min-h-screen">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-[444px]">
            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap font-semibold">Filter:</label>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-semibold">Type:</label>
              {hotelTypes.map((type) => (
            <div key={type} className="flex gap-2">
              <input
                type="checkbox"
                id={type}
                className="w-5"
                checked={sidebardata.type === type}
              />
              <span>{type}</span>
            </div>
          ))}
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-semibold">Facilities:</label>
              {hotelFacilities.map((type) => (
            <div key={type} className="flex gap-2">
              <input
                type="checkbox"
                id={type}
                className="w-5"
                checked={sidebardata.type === type}
              />
              <span>{type}</span>
            </div>
          ))}
            </div>
            <div className="flex items-center gap-2">
              <label className="font-semibold">Sort:</label>
              <select
                defaultValue={"created_at_desc"}
                id="sort_order"
                className="border rounded-lg p-3"
              >
                <option value="regularPrice_desc">Price high to low</option>
                <option value="regularPrice_asc">Price low to hight</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
              </select>
            </div>
            <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
              Search
            </button>
          </form>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
       Hotels results:
          </h1>
          <div className="p-7 flex flex-wrap gap-4">
            {!loading && hotels?.data.length === 0 && (
              <p className="text-xl text-slate-700">No listing found!</p>
            )}
            {loading && (
              <p className="text-xl text-slate-700 text-center w-full">
                Loading...
              </p>
            )}

            {!loading &&
              hotels &&
              hotels?.data?.map((data) => (
                <HotelCard key={hotels?.data?._id} hotelData={data} />
                // console.log("listin in map",listing)
              ))}

            {showMore && (
              <button
                //  onClick={onShowMoreClick}
                className="text-green-700 hover:underline p-7 text-center w-full"
              >
                Show more
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
