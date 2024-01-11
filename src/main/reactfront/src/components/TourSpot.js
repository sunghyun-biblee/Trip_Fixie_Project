import { useEffect, useState } from "react";
import axios from "axios";



function TourSpot({selectedAreaName, setSaveTourList, dateinfo, setIsSlideMode}){
   const [baseurl, setBaseurl] = useState("");
   const [params, setParams] = useState({
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

   const [tourList, setTourList] = useState([]);
   const [festivalList, SetFestivalList] = useState([]);
   const [isTour, setIsTour] = useState(true);

   
    useEffect(() => {
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
              if(Object.keys(params)[6] === "eventStartDate")  {
                console.log(data);
                const festivalData = data.response.body.items.item;
                const festivals = festivalData.map(fd =>({
                  contentid: fd.contentid,
                  ctitle: fd.title,
                  caddr: fd.addr1,
                  cfirstimage: fd.firstimage,
                  csecondimage: fd.firstimage2,
                  clatitude: fd.mapy,
                  clongitude: fd.mapx,
                  ceventstartdate: fd.eventstartdate,
                  ceventenddate: fd.eventenddate,
                  ctel: fd.tel,
                }));
                SetFestivalList(festivals);
                setIsTour(false);
              }else{
                // 관광지일때
                console.log("adfasfdaf");
                console.log(data);
                const tourData = data.response.body.items.item;
                const tours = tourData.map(td => ({
                  contentid: td.contentid,
                  ctitle: td.title,
                  caddr: td.addr1,
                  cfirstimage: td.firstimage,
                  csecondimage: td.firstimage2,
                  clatitude: td.mapy,
                  clongitude: td.mapx,
                }));
                  setTourList(tours);
                  setIsTour(true);
              }                    
            })
            .catch((error) => {
              console.error("Fetch Error:", error);
            });
        }
      }, [baseurl, params]);

      //축제조회
    const viewFestival = ()=>{
      console.log(dateinfo.startDay);
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
    };

    const viewTour = ()=>{
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
    }
   

    const addList = (index) =>{
      setIsSlideMode(true);
      if(isTour){
        if(tourList[index]){
          setSaveTourList(tourList[index]);
        }
      }else{
        if(festivalList[index]){
          setSaveTourList(festivalList[index]);
        }
      }
    }
    return (
      <>
        <div>
          <button onClick={viewTour}>관광지</button>
          <button onClick={viewFestival}>축제</button>
          <ul>
            {/* isTour 상태에 따라 다른 목록을 출력 */}
            {isTour ? (
              <>
                <h1>관광지 목록</h1>
                {tourList.map((tour, index) => (
                  <li key={index}>
                    <h2>{tour.ctitle}</h2>
                    {/* 주석된 코드는 필요한 경우 사용하시면 됩니다. */}
                    {/* <p>주소: {tour.addr}</p> */}
                    {/* <p>위도: {tour.latitude}</p> */}
                    {/* <p>경도: {tour.longitude}</p> */}
                    <button onClick={() => addList(index)}>추가</button>
                    <p>-----------------------------------</p>
                  </li>
                ))}
              </>
            ) : (
              <>
                <h1>축제 목록</h1>
                {festivalList.map((festival, index) => (
                  <li key={index}>
                    <h2>{festival.ctitle}</h2>
                    {/* 주석된 코드는 필요한 경우 사용하시면 됩니다. */}
                    {/* <p>주소: {festival.addr}</p> */}
                    {/* <p>위도: {festival.latitude}</p> */}
                    {/* <p>경도: {festival.longitude}</p> */}
                    <button onClick={() => addList(index)}>추가</button>
                    <p>-----------------------------------</p>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      </>
    )
}

export default TourSpot;