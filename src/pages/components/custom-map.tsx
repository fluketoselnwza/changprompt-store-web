import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const center = {
  lat: -3.745,
  lng: -38.523,
};

const CustomMap = () => {
  const { innerWidth: width } = window;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "YOUR_API_KEY",
  });

  //   const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    // setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    // setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        height: "350px",
        width: width,
      }}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default CustomMap;
