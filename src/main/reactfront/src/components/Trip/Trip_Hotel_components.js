import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { TourLoadingWrapper } from "./TripHotel";
import { Loading } from "../atoms/Loading";



const TourSpotIMG = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  margin: 0 15px;
`;
const TourWrapper = styled.div`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 7px; /* 스크롤바의 너비 */
  }
  &::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: #5ea3ec; /* 스크롤바의 색상 */
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;

    background: rgba(33, 122, 244, 0.1); /*스크롤바 뒷 배경 색상*/
  }
`;
const TourSpotContainer = styled.div`
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  &.off {
    opacity: 0;
  }
`;
const TourSpotBox = styled.div`
  padding: 1rem;
`;
const TourSpotLi = styled.div`
  display: flex;
  height: 160px;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-bottom: 12px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;
const TourSpotItemWrapper = styled.div`
  /* display: grid;
  grid-template-columns: 310px 90px; */
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const TourSpotItem = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  p {
    font-size: 1.7rem;
  }
`;
const TourTitle = styled.p`
  font-weight: 900;
  padding-bottom: 1rem;
`;
const TourAddr = styled.p`
  padding-top: 0.5rem;
`;
const TButton = styled.button`
  background-color: #52c2f2;
  width: 80px;
  color: white;
  padding: 1rem;
  border-radius: 10px;
  font-size: 1.3rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;

export function Trip_Hotel_components({
  hotelList,
  isMainLoading,
  setSaveTourList,
  setIsSlideMode,
  saveTourList,
  handleDeleteList,
  setDetailData,
}){
  const [currHotelList, setCurrHotelList] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [list, setList] = useState(0);
  const scrollBoxRef = useRef();
  const max = hotelList.length;
  const [isArray, setIsArray] = useState([]);

  useEffect(() => {
    setIsArray([]);
    const newIsArrays = saveTourList.map((lists) => lists.contentid);
    setIsArray(newIsArrays);
  }, [saveTourList]);

  const handleScroll = () => {
    const scrollBox = scrollBoxRef.current;
    if (
      scrollBox.offsetHeight + scrollBox.scrollTop + 1 >=
      scrollBox.scrollHeight
    ) {
      setList((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const scrollBox = scrollBoxRef.current;
    // setCurrTourList(tourList[list]);
    if (scrollBox) {
      scrollBox.addEventListener("scroll", handleScroll);
      return () => {
        scrollBox.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    if (hotelList.length === 0) {
      setCurrHotelList([]);
      setIsLoading(false);
      return;
    }
    if (max <= list) {
      return;
    }
    setIsLoading(true);

    try {
      if (!currHotelList) {
        setCurrHotelList(hotelList[list]);
      } else {
        setCurrHotelList((prev) => [...prev, ...hotelList[list]]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [list]);
  console.log(currHotelList);

  const addList = (index) => {
    console.log(index);

    setIsSlideMode(true);
    if (currHotelList[index]) {
      setSaveTourList(currHotelList[index]);
    }
  };

    return(
        <TourSpotContainer className={isMainLoading ? "off" : null}>
      <TourWrapper ref={scrollBoxRef}>
        {currHotelList ? (
          currHotelList.length > 1 ? (
            currHotelList.map((hotel, index) => (
              <TourSpotBox key={index}>
                <TourSpotLi>
                  {hotel.cfirstimage ? (
                    <TourSpotIMG src={hotel.cfirstimage} alt="" />
                  ) : (
                    <TourSpotIMG src="/img/TourSpot_No_IMG.svg" alt="" />
                  )}
                  <TourSpotItemWrapper>
                    <TourSpotItem>
                      <TourTitle>{hotel.ctitle}</TourTitle>
                      <TourAddr>
                        {hotel.caddr1}
                        <br />
                        {hotel.caddr2 ? ` ${hotel.caddr2}` : null}
                      </TourAddr>
                    </TourSpotItem>
                    <TourSpotItem style={{ marginRight: "1.25rem" }}>
                      {isArray.includes(hotel.contentid) ? (
                        <TButton
                          style={{ backgroundColor: "red" }}
                          onClick={() => {
                            handleDeleteList(hotel.contentid);
                          }}
                        >
                          삭제
                        </TButton>
                      ) : (
                        <TButton
                          onClick={() => {
                            console.log(index);
                            addList(index);
                          }}
                        >
                          추가
                        </TButton>
                      )}
                      <TButton
                        style={{ marginTop: "5px" }}
                        onClick={() => {
                          setDetailData(hotel);
                        }}
                      >
                        상세정보{" "}
                      </TButton>
                    </TourSpotItem>
                  </TourSpotItemWrapper>
                </TourSpotLi>
              </TourSpotBox>
            ))
          ) : (
            <TourLoadingWrapper
              className="ABC"
              style={{ width: "500px", height: "500px" }}
            >
              <div style={{ fontSize: "3rem" }}>
                등록된 호텔이 없습니다 ㅠㅠ
              </div>
            </TourLoadingWrapper>
          )
        ) : (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading></Loading>
          </div>
        )}
        {isLoading ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading></Loading>
          </div>
        ) : null}
      </TourWrapper>
    </TourSpotContainer>
  );
};