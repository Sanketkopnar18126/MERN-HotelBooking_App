
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {

  const [offerHotels, setofferHotels] = useState([]);
  const [topRatingHotels, settopRatingHotels] = useState([]);
  const [faciletiesHotels, setfaciletiesHotels] = useState([]);



  useEffect(() => {
    const fetchOfferHotels = async () => {
      try {
        const res = await fetch('/users/listing/get?offer=true&limit=4');
        const data = await res.json();
        setofferHotels(data);
        fetchtopRating();
      } catch (error) {
        console.log("error at home at offer",error);
      }
    };
    const fetchtopRating = async () => {
      try {
        const res = await fetch('/users/listing/get?type=rent&limit=4');
        const data = await res.json();
        settopRatingHotels(data);
        fetchtopFacilities();
      } catch (error) {
        console.log("error at home at type :",error);
      }
    };

    const fetchtopFacilities = async () => {
      try {
        const res = await fetch('/users/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log("error at home at facilities",error);
      }
    };
    fetchOfferHotels();
    fetchtopRating()
    fetchtopFacilities()
  }, []);

  // console.log("offer list",offerListings)
  // console.log("sale list",saleListings)
  // console.log("rent list",rentListings)



  return (
    <div>
    {/* top */}
    <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
      <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
        Find your next <span className='text-slate-500'>perfect</span>
        <br />
        place with ease
      </h1>
      <div className='text-gray-400 text-xs sm:text-sm'>
        Sahand Estate is the best place to find your next perfect place to
        live.
        <br />
        We have a wide range of properties for you to choose from.
      </div>
      <Link
        to={'/search'}
        className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
      >
        Let s get started...
      </Link>
    </div>

    {/* swiper */}
 

    {/* listing results for offer, sale and rent */}

    {/* <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
      {offerListings && offerListings?.data?.length > 0 && (
        <div className=''>
          <div className='my-3'>
            <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
            <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
          </div>
          <div className='flex flex-wrap gap-4'>
            {offerListings?.data.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}
      {rentListings && rentListings?.data?.length > 0 && (
        <div className=''>
          <div className='my-3'>
            <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
            <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
          </div>
          <div className='flex flex-wrap gap-4'>
            {rentListings?.data.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}
      {saleListings && saleListings?.data?.length > 0 && (
        <div className=''>
          <div className='my-3'>
            <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
            <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
          </div>
          <div className='flex flex-wrap gap-4'>
            {saleListings?.data.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}
    </div> */}
  </div>
  )
}
