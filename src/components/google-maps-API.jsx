import { useEffect } from "react";

export default function useGoogleMapsLoader(apiKey) {
  useEffect(() => {
    // If Google Maps already loaded, do nothing
    if (window.google?.maps) return;

    const scriptId = "google-maps-api";
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&v=weekly`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log("Google Maps API loaded.");
    };

    script.onerror = () => {
      console.error("Failed to load Google Maps JavaScript API.");
    };

    document.head.appendChild(script);
  }, [apiKey]);
}
