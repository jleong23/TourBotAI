import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useGoogleMapsLoader from "@/components/google-maps-API";
import HotelCardItem from "./HotelCardItem";

function Hotels({ trip, apiKey }) {
  const hotelOptions =
    trip?.tripData?.travelPlan?.hotelOptions ||
    trip?.tripData?.hotelOptions ||
    trip?.tripData?.hotels ||
    [];

  const [hotelPhotos, setHotelPhotos] = useState({});

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
        {hotelOptions.map((hotel, index) => (
          <HotelCardItem
            key={index}
            index={index}
            hotel={hotel}
            photoUrl={hotelPhotos[hotel.hotelName]}
            cardVariants={cardVariants}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default Hotels;
