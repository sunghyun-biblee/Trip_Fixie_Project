import { useEffect, useState } from "react";
import "./css/TripMap.css";
import axios from "axios";

function TripMap({
  selectedAreaName,
  mygeolocation,
  setMygeolocation,
  saveTourList,
}) {
  useEffect(() => {
    const mapcontainer = document.getElementById("map");
    const map = new window.naver.maps.Map(mapcontainer, {
      center: new window.naver.maps.LatLng(
        mygeolocation.lat,
        mygeolocation.long
      ),
      zoom: 14,
    });

    saveTourList.map((list) => {
      const marker = [
        new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(
            list.clatitude,
            list.clongitude
          ),
          map: map,
        }),
      ];
    });
  }, [mygeolocation, saveTourList]);

  useEffect(() => {
    if (selectedAreaName.mainAreaCode === "") {
      return;
    } else {
      axios
        .post("/test/getLongLat", selectedAreaName.mainAreaCode)
        .then((response) => {
          setMygeolocation({
            lat: response.data.arealatitude,
            long: response.data.arealongitude,
          });
        })
        .catch((error) => {
          console.error("위경오류", error);
        });
    }
  }, [selectedAreaName]);

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
