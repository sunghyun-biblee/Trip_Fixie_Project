import { useEffect, useRef, useState } from "react";
import "./css/TripMap.css";
import axios from "axios";
import styled from "styled-components";
import { FontSizemd, FontSizesm } from "./trip_save_components";
import { motion } from "framer-motion";

const ShowPlaceInfo = styled.div`
  background-color: #fefefe;
  position: absolute;
  top: 5%;
  left: 1%;
  width: 40rem;
  height: 90%;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
`;
const CloseBtn = styled.button`
  height: 30px;
  width: 100px;
  background-color: #e5edf4;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  font-size: 1.3rem;
  font-weight: 600;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  cursor: pointer;
  margin-top: 1rem;
`;
const DetailImg = styled.img`
  height: 30%;
  width: 100%;
  object-fit: cover;
`;
const PlaceInfoText = styled.div`
  display: flex;
  padding: 1rem 1rem;
`;
const PlaceIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 0.7rem;
`;
const PlaceHomepage = styled.a`
  font-size: 1.5rem;
  text-decoration: none;
  color: black;
  word-break: break-all; //텍스트가 div 밖으로 나가는 현상을 해결
  font-weight: 600;
`;
const motionInfo = {
  in: { scale: 0.5 },
  out: { scale: 1 },
};
const MotionInfo = motion(ShowPlaceInfo);
function TripMap({
  selectedAreaName,
  mygeolocation,
  setMygeolocation,
  saveTourList,
  detailData,
  setDetailData,
}) {
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
      if (list.contenttypeid === "12") {
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(
            list.clatitude,
            list.clongitude
          ),
          icon: {
            content: [
              `<div style="display: flex; flex-direction: column; align-items: center; width: 50px; height: 50px;">`,
              ` <div style="display: flex; justify-content: center; align-items: center; width: 50px; height: 50px;">`,
              ` <img src="/img/tour.png" style="width: 50px; background-color: white; height: 50px; border-radius: 50%;"/>`,
              ` </div>`,
              `</div>`,
            ].join(""),
            size: new window.naver.maps.Size(50, 50),
            scaledSize: new window.naver.maps.Size(50, 50),
            origin: new window.naver.maps.Point(0, 0),
          },
          map: map,
        });
        marker.addListener("click", () => {
          showInfo(saveTourList[index]);
        });
      } else if (list.contenttypeid === "32") {
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(
            list.clatitude,
            list.clongitude
          ),
          icon: {
            content: [
              `<div style="display: flex; flex-direction: column; align-items: center; width: 50px; height: 50px;">`,
              ` <div style="display: flex; justify-content: center; align-items: center; width: 50px; height: 50px;">`,
              ` <img src="/img/hotel.png" style="width: 50px; background-color: white; height: 50px; border-radius: 50%;"/>`,
              ` </div>`,
              `</div>`,
            ].join(""),
            size: new window.naver.maps.Size(50, 50),
            scaledSize: new window.naver.maps.Size(50, 50),
            origin: new window.naver.maps.Point(0, 0),
          },
          map: map,
        });
        marker.addListener("click", () => {
          showInfo(saveTourList[index]);
        });
      } else {
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(
            list.clatitude,
            list.clongitude
          ),
          icon: {
            content: [
              `<div style="display: flex; flex-direction: column; align-items: center; width: 50px; height: 50px;">`,
              ` <div style="display: flex; justify-content: center; align-items: center; width: 50px; height: 50px;">`,
              ` <img src="/img/festival.png" style="width: 50px; background-color: white; height: 50px; border-radius: 50%;"/>`,
              ` </div>`,
              `</div>`,
            ].join(""),
            size: new window.naver.maps.Size(50, 50),
            scaledSize: new window.naver.maps.Size(50, 50),
            origin: new window.naver.maps.Point(0, 0),
          },
          map: map,
        });
        marker.addListener("click", () => {
          showInfo(saveTourList[index]);
        });
      }
      return null;
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
          if (response.data.response.body.items.item[0].homepage) {
            const url = response.data.response.body.items.item[0].homepage;
            const pattern = /<a\s[^>]*?href\s*=\s*['"]([^'"]*?)['"][^>]*?>/g;
            const matches = [...url.matchAll(pattern)];
            homepage = matches.map((match) => match[1]);
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
      <div
        id="map"
        className="Map"
        style={{ position: "absolute", width: "100%", height: "100%" }}
      >
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
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: "1000",
          }}
          onClick={(e) => {
            if (e.target === modalBackground.current) {
              setDetailData(null);
              setSelectedPlaceInfo(null);
            }
          }}
        >
          <MotionInfo
            className="heelo"
            initial="in"
            animate="out"
            variants={motionInfo}
          >
            <div style={{ height: "100%" }}>
              <DetailImg
                src={
                  selectedPlaceInfo.cfirstimage
                    ? selectedPlaceInfo.cfirstimage
                    : "/img/TourSpot_No_IMG.svg"
                }
                alt=""
              />
              <PlaceInfoText>
                <FontSizemd style={{ fontWeight: 500 }}>
                  {selectedPlaceInfo.ctitle}
                  {selectedPlaceInfo.contenttypeid === "12" ? (
                    <span
                      style={{
                        fontSize: "1.5rem",
                        marginLeft: "1rem",
                        color: "gray",
                      }}
                    >
                      관광지
                    </span>
                  ) : (
                    <span
                      style={{
                        fontSize: "1.5rem",
                        marginLeft: "1rem",
                        color: "gray",
                      }}
                    >
                      축제
                    </span>
                  )}
                </FontSizemd>
              </PlaceInfoText>
              <PlaceInfoText>
                <PlaceIcon src="/img/location.png" alt=""></PlaceIcon>
                <FontSizesm>
                  {selectedPlaceInfo.caddr1} {selectedPlaceInfo.caddr2}
                </FontSizesm>
              </PlaceInfoText>
              {selectedPlaceInfo.ctel && (
                <PlaceInfoText>
                  <PlaceIcon src="/img/tel.png" alt="" />
                  <FontSizesm>{selectedPlaceInfo.ctel}</FontSizesm>
                </PlaceInfoText>
              )}
              {selectedPlaceInfo.homepage[0] && (
                <PlaceInfoText>
                  <PlaceIcon src="/img/Homepage.png" alt=""></PlaceIcon>

                  <PlaceHomepage
                    href={selectedPlaceInfo.homepage[0]}
                    target="_blank"
                  >
                    {selectedPlaceInfo.homepage[0]}
                  </PlaceHomepage>
                </PlaceInfoText>
              )}
              <div
                style={{
                  width: "100%",
                  height: "1rem",
                  backgroundColor: "#eaeaea",
                  borderRadius: "2px",
                  margin: "1rem 0",
                }}
              ></div>
              {selectedPlaceInfo.ceventstartdate && (
                <PlaceInfoText>
                  <FontSizesm>축제기간</FontSizesm>
                  <FontSizesm style={{ marginLeft: "2rem" }}>
                    {selectedPlaceInfo.ceventstartdate} ~{" "}
                    {selectedPlaceInfo.ceventenddate}
                  </FontSizesm>
                </PlaceInfoText>
              )}

              <PlaceInfoText
                style={{ flexDirection: "column", marginTop: "2rem" }}
              >
                <p style={{ fontSize: "1.8rem", paddingBottom: "1rem" }}>
                  개요
                </p>
                <div style={{ overflow: "scrollY" }}>
                  <FontSizesm>{selectedPlaceInfo.overview}</FontSizesm>
                </div>
              </PlaceInfoText>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CloseBtn
                  onClick={() => {
                    setDetailData(null);
                    setSelectedPlaceInfo(null);
                  }}
                >
                  닫기
                </CloseBtn>
              </div>
            </div>
          </MotionInfo>
        </div>
      ) : null}
    </div>
  );
}

export default TripMap;
