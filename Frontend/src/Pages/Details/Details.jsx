import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { useSelector } from "react-redux";
export const Details = () => {
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState();
  // const[isLoggedIn,setisLoggedIn]=useState()
  const [bookinForm, setbookingForm] = useState({
    checkIn: "",
    checkOut: "",
    adultCount: "",
    childCount: "",
  });

  const { currentUser } = useSelector((state) => state.userdata);
  console.log("currentUser", currentUser);

  const minDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const res = await fetch(`/users/hotels/get_hotel/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setdata(data);
          setloading(false);
        }
      } catch (error) {
        console.log("error at fetch data in detail page", error);
        setloading(false);
      }
    };
    fetchData();
  }, []);

  const onHandleBookNow=()=>{

  }
  console.log("data", data);
  return (
    <>
      <div className="flex justify-center items-center flex-col gap-3">
        {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
        <div>
          <span className="flex">
            {Array.from({ length: data?.data?.starRating }).map(() => (
              <AiFillStar className="fill-yellow-400" />
            ))}
          </span>
          <h1 className="text-3xl font-bold">{data?.data?.name}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {data?.data?.imageUrls.map((image, index) => (
            <div key={index} className="h-[300px]">
              <img
                src={image}
                alt={data?.data?.name}
                className="rounded-md w-full h-full object-cover object-center"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          {data?.data?.facilities.map((facility, index) => (
            <div key={index} className="border border-slate-300 rounded-sm p-3">
              {facility}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
          <div className="whitespace-pre-line">{data?.data?.description}</div>
          <div className="h-fit">
            {/* Guest form */}
            <div className="flex flex-col  p-4 bg-blue-200 gap-4">
              <h3 className="text-md font-bold">
                £{data?.data?.pricePerNight}
              </h3>

              {/* onSubmit={isLoggedIn ? onSubmit : onSignInClick} */}
                <div className="grid grid-cols-1 gap-4 items-center">
                  <div>
                    <label htmlFor="checkIn" className="sr-only">
                      Check-in Date:
                    </label>
                    <input
                      type="date"
                      id="checkIn"
                      required
                      value={bookinForm.checkIn}
                      onChange={(e) =>
                        setbookingForm({
                          ...bookinForm,
                          checkIn: e.target.value,
                        })
                      }
                      min={minDate}
                      max={maxDate.toISOString().split("T")[0]}
                      className="min-w-full bg-white p-2 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkOut" className="sr-only">
                      Check-out Date:
                    </label>
                    <input
                      type="date"
                      id="checkOut"
                      required
                      value={bookinForm.checkOut}
                      onChange={(e) =>
                        setbookingForm({
                          ...bookinForm,
                          checkOut: e.target.value,
                        })
                      }
                      min={bookinForm.checkIn}
                      max={maxDate.toISOString().split("T")[0]}
                      className="min-w-full bg-white p-2 focus:outline-none"
                    />
                  </div>
                  <div className="flex bg-white px-2 py-1 gap-2">
                    <label className="items-center flex">
                      Adults:
                      <input
                        className="w-full p-1 focus:outline-none font-bold"
                        type="number"
                        min={1}
                        max={20}
                        value={data?.data?.adultCount}
                        onChange={(e) =>
                          setbookingForm({
                            ...bookinForm,
                            adultCount: e.target.value,
                          })
                        }
                      />
                    </label>
                    <label className="items-center flex">
                      Children:
                      <input
                        className="w-full p-1 focus:outline-none font-bold"
                        type="number"
                        min={0}
                        max={20}
                        value={data?.data?.childCount}
                        onChange={(e) =>
                          setbookingForm({
                            ...bookinForm,
                            childCount: e.target.value,
                          })
                        }
                      />
                    </label>
                  </div>
                  {currentUser?.data?.user ? (
                    <button onClick={onHandleBookNow} className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
                      Book Now
                    </button>
                  ) : (
                    <Link className="flex justify-center" to={"/signin"}>
                    <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
                      Sign in to Book
                    </button>
                    </Link>
                  )}
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
