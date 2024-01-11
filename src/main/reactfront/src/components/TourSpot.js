import { useEffect, useState } from "react";
import axios from "axios";
import {
  FestivalSpot,
  FestivalSpotList,
  SelectTourMode,
  TourSpotList,
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
}) {
  const [listpage, setListpage] = useState(1);
  const [tourList, setTourList] = useState([]);
  const [festivalList, SetFestivalList] = useState([]);
  const [tourMode, setTourMode] = useState("tour");
  const [baseurl, setBaseurl] = useState();
  const [params, setParams] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchComplete, setFetchComplete] = useState(false);
  //축제조회

  const viewFestival = () => {
    setBaseurl("http://apis.data.go.kr/B551011/KorService1/searchFestival1");
    setParams({
      serviceKey:
        "cHlc2k2XcgjG10dgBDyoxMaS6KxKLHiHN4xtTP6q86EBe+UO09zOLEg6ZTpX9TWrdJPSJcFQYCZ+6fqhkD2ZVA==",
      numOfRows: "5",
      pageNo: listpage,
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
      numOfRows: "5",
      pageNo: listpage,
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

  const addList = (index) => {
    setIsSlideMode(true);
    if (tourMode) {
      if (tourList[index]) {
        setSaveTourList(tourList[index]);
      }
    } else {
      if (festivalList[index]) {
        setSaveTourList(festivalList[index]);
      }
    }
  };

  useEffect(() => {
    if (tourMode === "tour") {
      viewTour();
    } else if (tourMode === "festivals") {
      viewFestival();
    }
  }, [listpage]);

  useEffect(() => {
    setIsLoading(true);
    setFetchComplete(false);
    if (baseurl && Object.keys(params).length > 0) {
      const queryString = new URLSearchParams(params).toString();
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
              }));
              SetFestivalList((prev) => [...prev, ...festivals]);
              setIsLoading(false);
            } catch (error) {
              console.log("축제없음");
              setIsLoading(false);
              setFetchComplete(true);
            }
            setFetchComplete(true);
            // setTourMode("festivals");
          } else {
            // 관광지일때
            try {
              console.log("adfasfdaf");
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
              }));
              console.log(isLoading);
              setTourList((prev) => [...prev, ...tours]);
              setIsLoading(false);

              console.log("성공성공서공");
            } catch (error) {
              console.log("관광지 없슴 깡촌임");
              console.log(tourList);
              setIsLoading(false);
              setFetchComplete(true);
            }
            setFetchComplete(true);
            // setTourMode("tour");
          }
        })
        .catch((error) => {
          console.error("Fetch Error:", error);
          setIsLoading(false);
          setFetchComplete(true);
        });
    }
  }, [baseurl, params]);
  console.log(tourList);
  return (
    <>
      <div>
        {/* <AreaWeather></AreaWeather> */}
        <SelectTourMode
          viewTour={viewTour}
          viewFestival={viewFestival}
          tourMode={tourMode}
        ></SelectTourMode>
        <button onClick={() => setListpage((prev) => prev + 1)}>123</button>
        {/* tourMode 상태에 따라 다른 목록을 출력 */}
        {tourMode === "tour" ? (
          isLoading ? (
            fetchComplete ? (
              <TourSpotList
                tourList={tourList}
                addList={addList}
              ></TourSpotList>
            ) : (
              <TourLoadingWrapper className="ABC">
                <Loading />
              </TourLoadingWrapper>
            )
          ) : (
            <TourSpotList tourList={tourList} addList={addList}></TourSpotList>
          )
        ) : tourMode === "festivals" ? (
          isLoading ? (
            fetchComplete ? (
              <FestivalSpotList
                festivalList={festivalList}
                addList={addList}
              ></FestivalSpotList>
            ) : (
              <TourLoadingWrapper className="ABC">
                <Loading />
              </TourLoadingWrapper>
            )
          ) : (
            <FestivalSpotList
              festivalList={festivalList}
              addList={addList}
            ></FestivalSpotList>
          )
        ) : null}
      </div>
    </>
  );
}

export default TourSpot;
