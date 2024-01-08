import { useEffect, useState } from "react";
import "./css/TripMap.css";

function TripMap() {
  useEffect(() => {
    const mapcontainer = document.getElementById("map");
    const map = new window.naver.maps.Map(mapcontainer, {
      center: new window.naver.maps.LatLng(37.56368589, 126.9755844),
      zoom: 15,
    });
    // const map = new window.naver.maps.Map(mapcontainer);
    const marker = [
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(37.56368589, 126.9755844),
        map: map,
      }),
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(37.56604319, 126.98230708),
        map: map,
      }),
    ];
  }, []);
  /*const [UserPosition, setUserPosition] = useState({
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
  }, []);*/

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
