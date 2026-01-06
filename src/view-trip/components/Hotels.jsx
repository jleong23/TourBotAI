import React from "react";

function Hotels({ trip }) {
  const hotelOptions =
    trip?.tripData?.travelPlan?.hotelOptions ||
    trip?.tripData?.hotelOptions ||
    [];

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {hotelOptions.map((hotel, index) => (
          <a
            key={index}
            href={
              "https://www.google.com/maps/search/?api=1&query=" +
              hotel?.hotelName +
              "," +
              hotel?.hotelAddress
            }
            target="_blank"
            rel="noreferrer"
            className="hover:scale-105 transition-all cursor-pointer block"
          >
            <img
              src={hotel?.hotelImageURL}
              className="rounded-xl h-[180px] w-full object-cover"
              alt={hotel?.hotelName}
            />
            <div className="my-2 flex flex-col gap-2">
              <h2 className="font-medium">{hotel?.hotelName}</h2>
              <h2 className="text-xs text-gray-500">
                📍 {hotel?.hotelAddress}
              </h2>
              <h2 className="text-sm">💰 {hotel?.pricePerNight_RM} RM</h2>
              <h2 className="text-sm">⭐ {hotel?.rating}</h2>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
