import { useEffect, useState } from "react";
import "../css/TripMap.css";

function TripMap() {
  useEffect(() => {
    const mapcontainer = document.getElementById("map");
    new window.naver.maps.Map(mapcontainer);
    // const map = new window.naver.maps.Map(mapcontainer);
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(126.97558440, 37.56368589),
      map: map
    })
  }, []);
  const [UserPosition, setUserPosition] = useState({
    latitude: "",
    longitude: "",
  });
  useEffect(() => {
    const getUserLocation = async () => {
      await navigator.geolocation.getCurrentPosition((success) => {
        // UserPosition = {
        //   latitude: success.coords.latitude,
        //   longitude: success.coords.longitude,
        // };
        setUserPosition({
          latitude: success.coords.latitude,
          longitude: success.coords.longitude,
        });
      });
    };
    getUserLocation();
  }, []);

  return (
    <div id="map" className="Map">
      {/* {UserPosition.latitude === ""
        ? "loading"
        : `${Math.floor(UserPosition.latitude)}+${Math.floor(
            UserPosition.longitude
          )}`} */}
    </div>
  );
}

export default TripMap;
