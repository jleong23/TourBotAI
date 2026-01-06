import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useGoogleMapsLoader from "@/components/google-maps-API";

function Hotels({ trip, apiKey }) {
  const hotelOptions =
    trip?.tripData?.travelPlan?.hotelOptions ||
    trip?.tripData?.hotelOptions ||
    trip?.tripData?.hotels ||
    [];

  const [hotelPhotos, setHotelPhotos] = useState({});
  const placeholderImage = "/placeholder-hotel.jpeg";

  // Load Google Maps JS API
  useGoogleMapsLoader(apiKey);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (!hotelOptions.length) return;

      if (!window.google?.maps) {
        setTimeout(fetchPhotos, 500);
        return;
      }

      const { PlacesService, PlacesServiceStatus } =
        await window.google.maps.importLibrary("places");
      const service = new PlacesService(document.createElement("div"));

      hotelOptions.forEach((hotel) => {
        const request = {
          query: `${hotel.hotelName}, ${hotel.hotelAddress}`,
          fields: ["photos"],
        };

        service.findPlaceFromQuery(request, (results, status) => {
          if (
            status === PlacesServiceStatus.OK &&
            results?.[0]?.photos?.length
          ) {
            setHotelPhotos((prev) => ({
              ...prev,
              [hotel.hotelName]: results[0].photos[0].getUrl(),
            }));
          }
        });
      });
    };

    fetchPhotos();
  }, [hotelOptions]);

  // Framer Motion variants
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div>
      <motion.h2
        className="font-bold text-xl mt-5 mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Hotel Recommendations
      </motion.h2>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {hotelOptions.map((hotel, index) => {
          const photoUrl =
            hotelPhotos[hotel.hotelName] ||
            hotel.hotelImageURL ||
            placeholderImage;

          return (
            <motion.a
              key={index}
              href={
                "https://www.google.com/maps/search/?api=1&query=" +
                encodeURIComponent(hotel.hotelName + ", " + hotel.hotelAddress)
              }
              target="_blank"
              rel="noreferrer"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer block rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
            >
              <div className="relative h-[180px] w-full bg-gray-200 animate-pulse">
                <img
                  src={photoUrl}
                  alt={hotel.hotelName || "Hotel"}
                  className="rounded-xl h-full w-full object-cover"
                  loading="lazy"
                  onLoad={(e) =>
                    e.currentTarget.classList.remove("animate-pulse")
                  }
                />
              </div>

              <div className="my-2 flex flex-col gap-1 p-2">
                <h2 className="font-medium text-md">
                  {hotel.hotelName || "Unnamed Hotel"}
                </h2>
                {hotel.hotelAddress && (
                  <h2 className="text-xs text-gray-500">
                    📍 {hotel.hotelAddress}
                  </h2>
                )}
                {(hotel.pricePerNight_RM || hotel.priceRange) && (
                  <h2 className="text-sm">
                    💰{" "}
                    {hotel.pricePerNight_RM
                      ? `${hotel.pricePerNight_RM} RM`
                      : hotel.priceRange}
                  </h2>
                )}
                {hotel.rating && <h2 className="text-sm">⭐ {hotel.rating}</h2>}
              </div>
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
}

export default Hotels;
