import { useEffect, useRef, useState } from "react";
import "./css/TripMap.css";
import axios from "axios";
import styled from "styled-components";

const ShowPlaceInfo = styled.div`
  background-color: black;
  color: white;
  position: absolute;
  top: 40%;
  left: 10%;
`;

function TripMap({
  selectedAreaName,
  mygeolocation,
  setMygeolocation,
  saveTourList,
  detailData,
  setDetailData,
}) {
  const [marker, setMarker] = useState([]);

  const [selectedPlaceInfo, setSelectedPlaceInfo] = useState(null);
  useEffect(() => {
    const mapcontainer = document.getElementById("map");
    const map = new window.naver.maps.Map(mapcontainer, {
      center: new window.naver.maps.LatLng(
        mygeolocation.lat,
        mygeolocation.long
      ),
      zoom: 14,
    });

    saveTourList.map((list, index) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(list.clatitude, list.clongitude),
        map: map,
      });
      marker.addListener("click", () => {
        showInfo(saveTourList[index]);
      });
      setMarker((prev) => [...prev, marker]);
      // window.naver.maps.Event.addListener(marker[index], "click", () => {
      //   showInfo(index);
      //   // console.log(saveTourList[index]);
      // });
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

  const showInfo = (data) => {
    // setSelectedPlaceInfo((prev) => {
    //   console.log(prev);

    //   if (prev !== null) {
    //     setSelectedPlaceInfo(null);
    //   } else {
    //     setSelectedPlaceInfo(data);
    //   }
    // });

    if (data) {
      const savelistDataId = data.contentid;
      const url = `http://apis.data.go.kr/B551011/KorService1/detailCommon1?MobileOS=ETC&MobileApp=APPTest&serviceKey=cHlc2k2XcgjG10dgBDyoxMaS6KxKLHiHN4xtTP6q86EBe%2BUO09zOLEg6ZTpX9TWrdJPSJcFQYCZ%2B6fqhkD2ZVA%3D%3D&contentId=${savelistDataId}&overviewYN=Y&_type=json`;
      try {
        axios.get(url).then((response) => {
          const overview = response.data.response.body.items.item[0].overview;
          setSelectedPlaceInfo({ ...data, overview });
        });
      } catch (error) {
      } finally {
        setMygeolocation({ lat: data.clatitude, long: data.clongitude });
      }
    }
  };
  useEffect(() => {
    showInfo(detailData);
    console.log(detailData);
  }, [detailData]);
  console.log(selectedPlaceInfo);
  return (
    <div style={{ position: "relative", width: "100%" }} className="TLQkf">
      <div id="map" className="Map">
        {/* {UserPosition.latitude === ""
          ? "loading"
          : `${Math.floor(UserPosition.latitude)}+${Math.floor(
              UserPosition.longitude
            )}`} */}
      </div>
      {selectedPlaceInfo ? (
        <ShowPlaceInfo>
          <p>{selectedPlaceInfo.ctitle}</p>
          <p>{selectedPlaceInfo.caddr1}</p>
          <p>{selectedPlaceInfo.caddr2}</p>
          <p>{selectedPlaceInfo.contenttypeid}</p>
          <p>{selectedPlaceInfo.overview}</p>
          <div
            style={{ width: "30px", height: "30px", backgroundColor: "red" }}
            onClick={() => {
              setDetailData(null);
              setSelectedPlaceInfo(null);
            }}
          ></div>
        </ShowPlaceInfo>
      ) : null}
    </div>
  );
}

export default TripMap;
