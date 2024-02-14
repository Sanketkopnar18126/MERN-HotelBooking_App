import { useEffect, useState } from "react";
import { hotelFacilities, hotelTypes } from "../../HotelData/hotel.config.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export const AddHotel = () => {
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    city: "",
    country: "",
    description: "",
    pricePerNight: "",
    starRating: "",
    type: "",
    facilities: "",
    adultCount: "",
    childCount: "",
    userRef:""
  });
  const [submited, setsubmiteddata] = useState(false);
  // const [imgFiles, setimgFiles] = useState([]);
  const { currentUser } = useSelector((state) => state.userdata);
  // console.log("currentUser", currentUser);

  const navigate = useNavigate();
  const handleFacilityChange = (facility) => {
    // const isChecked = formData.facilities.includes(facility);
    // let updatedFacilities;
    // if (isChecked) {
    //   updatedFacilities = formData.facilities.filter((f) => f !== facility);
    // } else {
    //   updatedFacilities = [...formData.facilities, facility];
    // }
    // setFormData({ ...formData, facilities: updatedFacilities });

    const checked = formData.facilities.includes(facility);
    let updateFacility;
    if (checked) {
      updateFacility = formData.facilities.filter((item) => item !== facility);
    } else {
      updateFacility = [...formData.facilities, facility];
    }
    setFormData({ ...formData, facilities: updateFacility });
  };

  // Update radio button change handler for type
  const handleTypeChange = (type) => {
    // console.log("type",type)
    setFormData({ ...formData, type: type });
  };

  // const onUploadImg=()=>{
  // if(imgFiles.length>0 && imgFiles.length+formData.imageUrls.length<5){
  //   setupload(true)
  //   const store=[]
  // for(let i=0 ;i<imgFiles.length;i++){
  //   store.push(storeimgFiles[i])
  // }

  // }
  // }
useEffect(()=>{
  setFormData({...formData,userRef: currentUser?.data?.user?._id})
},[])
  const onHandleSubmitHotelFormData = async (e) => {
    e.preventDefault();

    try {
      setsubmiteddata(true);
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("country", formData.country);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("pricePerNight", formData.pricePerNight);
      formDataToSend.append("starRating", formData.starRating);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("adultCount", formData.adultCount);
      formDataToSend.append("childCount", formData.childCount);
      formDataToSend.append("userRef", formData.userRef)
      for (let i = 0; i < formData.facilities.length; i++) {
        formDataToSend.append("facilities", formData.facilities[i]);
      }

      

      for (let i = 0; i < formData.imageUrls.length; i++) {
        formDataToSend.append("imageUrls", formData.imageUrls[i]);
      }

      const res = await fetch("/users/hotels/create", {
        method: "POST",
        body: formDataToSend ,
      });

      const data = await res.json();
      // console.log("data form", data);
      setsubmiteddata(false);
      // console.log("fomdatato send",formDataToSend)
      navigate("/");
    } catch (error) {
      console.log("error occur at react form data ui", error);
      setsubmiteddata(false);
    }
  };

  console.log("form data", formData);
  // console.log("imgData", imgFiles);
  return (
    <>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {/* Detail section */}

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Name
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="border rounded w-full py-1 px-2 font-normal"
              // {...register("name", { required: "This field is required" })}
            ></input>
            {/* {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )} */}
          </label>

          <div className="flex gap-4">
            <label className="text-gray-700 text-sm font-bold flex-1">
              City
              <input
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="border rounded w-full py-1 px-2 font-normal"
                // {...register("city", { required: "This field is required" })}
              ></input>
              {/* {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )} */}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
              Country
              <input
                type="text"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                className="border rounded w-full py-1 px-2 font-normal"
                // {...register("country", { required: "This field is required" })}
              ></input>
              {/* {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )} */}
            </label>
          </div>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Description
            <textarea
              rows={10}
              className="border rounded w-full py-1 px-2 font-normal"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              // {...register("description", { required: "This field is required" })}
            ></textarea>
            {/* {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )} */}
          </label>
          <label className="text-gray-700 text-sm font-bold max-w-[50%]">
            Price Per Night
            <input
              value={formData.pricePerNight}
              type="number"
              min={1}
              className="border rounded w-full py-1 px-2 font-normal"
              onChange={(e) =>
                setFormData({ ...formData, pricePerNight: e.target.value })
              }
              // {...register("pricePerNight", { required: "This field is required" })}
            ></input>
            <span className="text-red-500"></span>
          </label>
          <label className="text-gray-700 text-sm font-bold max-w-[50%]">
            Star Rating
            <select
              value={formData.starRating}
              onChange={(e) =>
                setFormData({ ...formData, starRating: e.target.value })
              }
              // {...register("starRating", {
              //   required: "This field is required",
              // })}
              className="border rounded w-full p-2 text-gray-700 font-normal"
            >
              <option value="" className="text-sm font-bold">
                Select as Rating
              </option>
              {[1, 2, 3, 4, 5].map((num, index) => (
                <option key={index} value={num}>
                  {num}
                </option>
              ))}
            </select>
            {/* {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )} */}
          </label>
        </div>

        {/* Type section */}

        <div>
          <h2 className="text-2xl font-bold mb-3">Type</h2>
          <div className="grid grid-cols-5 gap-2">
            {hotelTypes.map((type, index) => (
              <label
                key={index}
                className="cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold"
              >
                <input
                  type="radio"
                  value={formData.type}
                  checked={formData.type === type} // Check if the current type is selected
                  onChange={() => handleTypeChange(type)}
                  // {...formData("type", {
                  //   required: "This field is required",
                  // })}
                  className="hidden"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
          {/* {errors.type && (
        <span className="text-red-500 text-sm font-bold">
          {errors.type.message}
        </span>
      )} */}
        </div>

        {/* Facillities */}

        <div>
          <h2 className="text-2xl font-bold mb-3">Facilities</h2>
          <div className="grid grid-cols-5 gap-3">
            {hotelFacilities.map((facility, index) => (
              <label key={index} className="text-sm flex gap-1 text-gray-700">
                <input
                  type="checkbox"
                  value={formData.facilities}
                  checked={formData.facilities.includes(facility)} // Check if the facility is selected
                  onChange={() => handleFacilityChange(facility)}
                />
                {facility}
              </label>
            ))}
          </div>
          {/* {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )} */}
        </div>

        {/* Guest */}

        <div>
          <h2 className="text-2xl font-bold mb-3">Guests</h2>
          <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300">
            <label className="text-gray-700 text-sm font-semibold">
              Adults
              <input
                value={formData.adultCount}
                className="border rounded w-full py-2 px-3 font-normal"
                type="number"
                min={1}
                onChange={(e) =>
                  setFormData({ ...formData, adultCount: e.target.value })
                }
                // {...register("adultCount", {
                //   required: "This field is required",
                // })}
              />
              {/* {errors.adultCount?.message && (
            <span className="text-red-500 text-sm fold-bold">
              {errors.adultCount?.message}
            </span>
          )} */}
            </label>
            <label className="text-gray-700 text-sm font-semibold">
              Children
              <input
                value={formData.childCount}
                onChange={(e) =>
                  setFormData({ ...formData, childCount: e.target.value })
                }
                className="border rounded w-full py-2 px-3 font-normal"
                type="number"
                min={0}
                // {...register("childCount", {
                //   required: "This field is required",
                // })}
              />
              {/* {errors.childCount?.message && (
            <span className="text-red-500 text-sm fold-bold">
              {errors.childCount?.message}
            </span>
          )} */}
            </label>
          </div>
        </div>

        {/* Image */}

        <div>
          <h2 className="text-2xl font-bold mb-3">Images</h2>
          <div className="border rounded p-4 flex  gap-4 w-[38%]">
            {/* {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrls.map((url) => (
              <div className="relative group">
                <img src={url} className="min-h-full object-cover" />
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )} */}

            <input
              type="file"
              multiple
              accept="image/*"
              className="w-full text-gray-700 font-normal"
              onChange={(e) =>
                setFormData({ ...formData, imageUrls: e.target.files })
              }
              // {...register("imageFiles", {
              //   validate: (imageFiles) => {
              //     const totalLength =
              //       imageFiles.length + (existingImageUrls?.length || 0);

              //     if (totalLength === 0) {
              //       return "At least one image should be added";
              //     }

              //     if (totalLength > 6) {
              //       return "Total number of images cannot be more than 6";
              //     }

              //     return true;
              //   },
              // })}
            />
          </div>
          {/* {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )} */}
        </div>

        <div className="flex justify-center items-center mt-1">
          <button
            onClick={onHandleSubmitHotelFormData}
            type="button"
            className="text-white w-[173px] h-[45px] bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4  focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            {submited ? "Submiting...." : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};
