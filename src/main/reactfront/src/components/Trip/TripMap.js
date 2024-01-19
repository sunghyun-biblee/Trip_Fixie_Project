import { useEffect, useRef, useState } from "react";
import "./css/TripMap.css";
import axios from "axios";
import styled from "styled-components";

const ShowPlaceInfo = styled.div`
  border: 1px solide black;
  background-color: white;
  position: absolute;
  top: 5%;
  left: 1%;
  width: 40%;
  height: 90%;
  padding-top: 2%;
`;
const DetailImg = styled.img`
  height: 25%;
  width: 100%;
`
const DetailTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
`

function TripMap({
  selectedAreaName,
  mygeolocation,
  setMygeolocation,
  saveTourList,
  detailData,
  setDetailData,
}) {
  const [marker, setMarker] = useState([]);
 
  const modalBackground = useRef();

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
      const url = `http://apis.data.go.kr/B551011/KorService1/detailCommon1?MobileOS=ETC&MobileApp=APPTest&serviceKey=cHlc2k2XcgjG10dgBDyoxMaS6KxKLHiHN4xtTP6q86EBe%2BUO09zOLEg6ZTpX9TWrdJPSJcFQYCZ%2B6fqhkD2ZVA%3D%3D&contentId=${savelistDataId}&overviewYN=Y&_type=json&defaultYN=Y`;
      try {
        axios.get(url).then((response) => {
          const overview = response.data.response.body.items.item[0].overview;
          let homepage = "";
          if(response.data.response.body.items.item[0].homepage){
            const url = response.data.response.body.items.item[0].homepage;
            const pattern = /<a\s[^>]*?href\s*=\s*['"]([^'"]*?)['"][^>]*?>/g;
            const matches = [...url.matchAll(pattern)];
            homepage = matches.map(match => match[1]);
            console.log(homepage);
          }
          setSelectedPlaceInfo({ ...data, overview, homepage });
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
      <div id="map" className="Map" 
      style={{position: "absolute",
              width: "100%",
              height: "100%"}}>
        {/* {UserPosition.latitude === ""
          ? "loading"
          : `${Math.floor(UserPosition.latitude)}+${Math.floor(
              UserPosition.longitude
            )}`} */}
      </div>
      {selectedPlaceInfo ? (
        <div
        className="sexxxxx"
        ref={modalBackground}
        style={{position: "absolute",
                width: "100%",
                height: "100%",
              zIndex:"1000"}}
        onClick={(e) => {
          if (e.target === modalBackground.current) {
            setDetailData(null);
            setSelectedPlaceInfo(null);
          }
        }}
        >
        <ShowPlaceInfo>
          
          {selectedPlaceInfo.cfirstimage ?
          <DetailImg src={selectedPlaceInfo.cfirstimage} alt=""></DetailImg>
          :<DetailImg src="/img/TourSpot_No_IMG.svg" alt=""></DetailImg>
          }
          
          <DetailTitle>{selectedPlaceInfo.ctitle}</DetailTitle>

          <p style={{fontSize:"15px"}}><img src="/img/location.png" alt=""
            style={{width: "20px" , height:"20px"}}
          ></img>{selectedPlaceInfo.caddr1} {selectedPlaceInfo.caddr2} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {selectedPlaceInfo.contenttypeid === "12" ?
          <b style={{width:"20px", height:"20px"}}>관광지</b>
          :<b style={{width:"20px", height:"20px"}}>축제</b>
          }</p>

          {selectedPlaceInfo.ctel ?
            <p style={{fontSize:"15px"}}><img src="/img/tel.png" alt=""
            style={{width: "20px" , height:"20px"}} />{selectedPlaceInfo.ctel}</p>
            : null
          }
          {selectedPlaceInfo.homepage[0] ? 
            <a href= {selectedPlaceInfo.homepage[0]}>{selectedPlaceInfo.homepage[0]}</a>
            : null
          }

          {selectedPlaceInfo.ceventstartdate ? 
          <div>
            <p style={{fontSize:"15px"}}>축제기간</p>
            <p style={{fontSize:"15px"}}>{selectedPlaceInfo.ceventstartdate} ~ {selectedPlaceInfo.ceventenddate}</p>  
          </div>
          : null
          }

          <p style={{fontSize:"15px"}}>{selectedPlaceInfo.overview}</p>
          <div
            style={{ width: "30px", height: "30px", backgroundColor: "red" }}
            onClick={() => {
              setDetailData(null);
              setSelectedPlaceInfo(null);
            }}
          ></div>
        </ShowPlaceInfo>
        </div>
      ) : null}
    </div>
  );
}

export default TripMap;