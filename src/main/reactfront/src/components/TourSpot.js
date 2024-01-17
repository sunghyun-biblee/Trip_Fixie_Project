import { useEffect, useState } from "react";
import axios from "axios";
import {
  FestivalSpot,
  FestivalSpotList,
  SelectTourMode,
  TourLoading,
  TourSpotList,
  Weather,
} from "./tour_spot_components";
import { Loading } from "./atoms/Loading";
import styled from "styled-components";

export const TourLoadingWrapper = styled.div`
  width: 600px;
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function TourSpot({
  selectedAreaName,
  setSaveTourList,
  dateinfo,
  setIsSlideMode,
  saveTourList,
  handleDeleteList,
  setMode,
  dateArray,
}) {
  const [tourList, setTourList] = useState([]);
  const [festivalList, SetFestivalList] = useState([]);
  const [tourMode, setTourMode] = useState("tour");
  const [baseurl, setBaseurl] = useState();
  const [params, setParams] = useState();
  const [isMainLoading, setIsMainLoading] = useState();
  const [arealonglat, setArealonglat] = useState();
  //축제조회

  const viewFestival = () => {
    setBaseurl("http://apis.data.go.kr/B551011/KorService1/searchFestival1");
    setParams({
      serviceKey:
        "cHlc2k2XcgjG10dgBDyoxMaS6KxKLHiHN4xtTP6q86EBe+UO09zOLEg6ZTpX9TWrdJPSJcFQYCZ+6fqhkD2ZVA==",
      numOfRows: "50",
      pageNo: "1",
      MobileOS: "ETC",
      MobileApp: "APPTest",
      _type: "json",
      eventStartDate: dateinfo.startDay,
      areaCode: selectedAreaName.mainAreaCode,
    });
    setTourMode("festivals");
    setTourList([]);
  };

  const viewTour = () => {
    setBaseurl("http://apis.data.go.kr/B551011/KorService1/areaBasedList1");
    setParams({
      serviceKey:
        "cHlc2k2XcgjG10dgBDyoxMaS6KxKLHiHN4xtTP6q86EBe+UO09zOLEg6ZTpX9TWrdJPSJcFQYCZ+6fqhkD2ZVA==",
      numOfRows: "50",
      pageNo: "1",
      MobileOS: "ETC",
      MobileApp: "APPTest",
      areaCode: selectedAreaName.mainAreaCode,
      sigunguCode: selectedAreaName.subAreaCode,
      contentTypeId: "12",
      _type: "json",
    });
    setTourMode("tour");
    SetFestivalList([]);
  };

  useEffect(() => {
    if (selectedAreaName.subAreaCode) {
      if (tourMode === "tour") {
        viewTour();
      } else if (tourMode === "festivals") {
        viewFestival();
      }
    } else {
      setMode("date");
      alert("먼저 날짜와 장소를 선택해 주세요!!!");
    }
  }, []);
  useEffect(() => {
    setIsMainLoading(true);

    if (baseurl && Object.keys(params).length > 0) {
      const queryString = new URLSearchParams(params).toString();
      console.log(queryString);
      const url = `${baseurl}?${queryString}`;

      fetch(url, {
        method: "GET",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (Object.keys(params)[6] === "eventStartDate") {
            console.log(data);
            try {
              const festivalData = data.response.body.items.item;

              const festivals = festivalData.map((fd) => ({
                contentid: fd.contentid,
                ctitle: fd.title,
                caddr1: fd.addr1,
                caddr2: fd.addr2,
                cfirstimage: fd.firstimage,
                csecondimage: fd.firstimage2,
                clatitude: fd.mapy,
                clongitude: fd.mapx,
                ceventstartdate: fd.eventstartdate,
                ceventenddate: fd.eventenddate,
                ctel: fd.tel,
                contenttypeid: fd.contenttypeid,
              }));
              for (let i = 0; i < festivals.length; i += 5) {
                const slicedArray = festivals.slice(i, i + 5);
                SetFestivalList((prev) => [...prev, slicedArray]);
              }
              setIsMainLoading(false);
            } catch (error) {
              console.log("축제없음");
              setIsMainLoading(false);
            }
            setIsMainLoading(false);
            // setTourMode("festivals");
          } else {
            // 관광지일때
            try {
              console.log(data);
              const tourData = data.response.body.items.item;

              const tours = tourData.map((td) => ({
                contentid: td.contentid,
                ctitle: td.title,
                caddr1: td.addr1,
                caddr2: td.addr2,
                cfirstimage: td.firstimage,
                csecondimage: td.firstimage2,
                clatitude: td.mapy,
                clongitude: td.mapx,
                contenttypeid: td.contenttypeid,
              }));

              for (let i = 0; i < tours.length; i += 5) {
                const slicedArray = tours.slice(i, i + 5);
                setTourList((prev) => [...prev, slicedArray]);
              }
              // setTourList((prev) => [...prev, ...tours]);
              setIsMainLoading(false);

              console.log("성공성공서공");
            } catch (error) {
              console.log("관광지 없슴 깡촌임");
              console.log(tourList);
              setIsMainLoading(false);
            }
            setIsMainLoading(false);
            // setTourMode("tour");
          }
        })
        .catch((error) => {
          console.error("Fetch Error:", error);
          setIsMainLoading(false);
        });
    }
  }, [baseurl, params]);

  // 날씨 정보를 조회하기위해 선택한 지역의 위도,경도를 가져옴
  useEffect(() => {
    if (selectedAreaName.subAreaCode) {
      const getWeather = () => {
        const areaCode = selectedAreaName.mainAreaCode;
        try {
          axios.post("/test/getLongLat", areaCode).then((response) => {
            setArealonglat({ ...response.data });
          });
        } catch (error) {
          console.error(error + "!!");
        }
      };
      getWeather();
    }
  }, []);
  console.log(arealonglat);
  return (
    <>
      <Weather
        dateinfo={dateinfo}
        arealonglat={arealonglat}
        dateArray={dateArray}
      />
      <div style={{ overflow: "hidden" }}>
        {/* <AreaWeather></AreaWeather> */}
        <SelectTourMode
          viewTour={viewTour}
          viewFestival={viewFestival}
          tourMode={tourMode}
        ></SelectTourMode>

        {/* tourMode 상태에 따라 다른 목록을 출력 */}
        {tourMode === "tour" ? (
          isMainLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "600px",
                height: "800px",
              }}
            >
              <Loading></Loading>
            </div>
          ) : (
            <TourSpotList
              isMainLoading={isMainLoading}
              tourList={tourList}
              setSaveTourList={setSaveTourList}
              setIsSlideMode={setIsSlideMode}
              handleDeleteList={handleDeleteList}
              saveTourList={saveTourList}
            ></TourSpotList>
          )
        ) : tourMode === "festivals" ? (
          <>
            {isMainLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "600px",
                  height: "800px",
                }}
              >
                <Loading></Loading>
              </div>
            ) : (
              <FestivalSpotList
                festivalList={festivalList}
                isMainLoading={isMainLoading}
                setSaveTourList={setSaveTourList}
                setIsSlideMode={setIsSlideMode}
                handleDeleteList={handleDeleteList}
                saveTourList={saveTourList}
              ></FestivalSpotList>
            )}
          </>
        ) : null}
      </div>
    </>
  );
}

export default TourSpot;
