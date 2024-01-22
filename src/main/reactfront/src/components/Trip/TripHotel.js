import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Loading } from "../atoms/Loading";
import { Trip_Hotel_components } from "./Trip_Hotel_components";
const ModeWrapper = styled.div`
  display: flex;
  padding: 1.5rem;
  justify-content: center;
`;
const TourModeName = styled.div`
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModeName = styled.button`
  width: 90%;
  text-align: center;
  font-size: 2rem;
  padding: 1rem;
  font-weight: 900;
  border: none;
  border-bottom: 2px solid gray;
  background-color: white;
  outline: none;
  color: gray;
  cursor: pointer;
  &.onSelect {
    color: #184bc4;
    /* #184BC4 ,#5ea3ec*/
    border-bottom: 4px solid #184bc4;
    transition: color, border-bottom 0.2s;
  }
`;

export const TourLoadingWrapper = styled.div`
  width: 600px;
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;


function TripHotel({
    selectedAreaName,
    setSaveTourList,
    setIsSlideMode,
    saveTourList,
    handleDeleteList,
    setDetailData,
}){
    const [hotelList, setHotelList] = useState([]);
    const [isMainLoading, setIsMainLoading] = useState();


    useEffect(()=>{
        
        setIsMainLoading(false);
        const url = `http://apis.data.go.kr/B551011/KorService1/searchStay1?_type=json&MobileOS=ETC&MobileApp=APPTest&serviceKey=cHlc2k2XcgjG10dgBDyoxMaS6KxKLHiHN4xtTP6q86EBe%2BUO09zOLEg6ZTpX9TWrdJPSJcFQYCZ%2B6fqhkD2ZVA%3D%3D&areaCode=${selectedAreaName.mainAreaCode}&sigunguCode=${selectedAreaName.subAreaCode}`
        axios.get(url).then((response)=>{
            setHotelList([]);
            const data = response.data.response.body.items.item;
            console.log("숙소목록");
            console.log(data);
            const hotels = data.map((list)=>({
                contentid: list.contentid,
                ctitle: list.title,
                caddr1: list.addr1,
                caddr2: list.addr2,
                cfirstimage: list.firstimage,
                csecondimage: list.firstimage2,
                clatitude: list.mapy,
                clongitude: list.mapx,
                ctel: list.tel,
                contenttypeid: list.contenttypeid,
                cgoodstay: list.goodstay,
            }));
            for (let i = 0; i < hotels.length; i += 5) {
                const slicedArray = hotels.slice(i, i + 5);
                setHotelList((prev) => [...prev, slicedArray]);
              }
              setIsMainLoading(false);
        })
        .catch((error) => {
            console.log("호텔없음");
            setIsMainLoading(false);
          });
        setIsMainLoading(true);
    },[])

    console.log(hotelList);
    return (
        <>
            <ModeWrapper>
                <TourModeName>
                    <ModeName
                    className="onSelect"
                    >축제</ModeName>
                </TourModeName>
            </ModeWrapper>
            {
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
                <Trip_Hotel_components
                  isMainLoading={isMainLoading}
                  hotelList={hotelList}
                  setSaveTourList={setSaveTourList}
                  setIsSlideMode={setIsSlideMode}
                  handleDeleteList={handleDeleteList}
                  saveTourList={saveTourList}
                  setDetailData={setDetailData}
                >
                </Trip_Hotel_components>
              )   
            }
        </>
    )

}

export default TripHotel;