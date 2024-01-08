import { useEffect, useState } from "react";
import axios from "axios";



function TourSpot({selectedArea, setSaveTourList}){
   const [baseurl, setBaseurl] = useState("http://apis.data.go.kr/B551011/KorService1/areaBasedList1");
   const [params, setParams] = useState({
    serviceKey:
        "cHlc2k2XcgjG10dgBDyoxMaS6KxKLHiHN4xtTP6q86EBe+UO09zOLEg6ZTpX9TWrdJPSJcFQYCZ+6fqhkD2ZVA==",
      numOfRows: "50",
      pageNo: "1",
      MobileOS: "ETC",
      MobileApp: "APPTest",
      areaCode: selectedArea.mainAreaCode,
      sigunguCode: selectedArea.subAreaCode,
      contentTypeId: "12",
      _type: "json",
   });

   const [tourList, setTourList] = useState([]);
   
   const [festivalList, SetFestivalList] = useState([]);
   
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
                //if 관광지일때
                const tourData = data.response.body.items.item;
                const tours = tourData.map(td => ({
                    title: td.title,
                    addr: td.addr1,
                    firstimage: td.firstimage,
                    secondimg: td.firstimage2,
                    latitude: td.mapy,
                    longitude: td.mapx,
                  }));

                  setTourList(tours);              
            })
            .catch((error) => {
              console.error("Fetch Error:", error);
            });
        }
      }, [baseurl, params]);

    const addList = (index) =>{
      if(tourList[index]){
        setSaveTourList(tourList[index]);
      }
    }
    return (
    <>
    <div>
      <h1>관광지 목록</h1>
      <ul>
        {tourList.map((tour, index) => (
          <li key={index}>
            <h2>{tour.title}</h2>
            {/* <p>주소: {tour.addr}</p>
            <p>위도: {tour.latitude}</p>
            <p>경도: {tour.longitude}</p> */}
            <button onClick={() => addList(index)}>추가</button>
            <p>-----------------------------------</p>
          </li>
        ))}
      </ul>
    </div>
    </>
    )
}

export default TourSpot;