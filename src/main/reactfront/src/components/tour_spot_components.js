import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { TourLoadingWrapper } from "./TourSpot";
import { useEffect, useRef, useState } from "react";
import { Loading } from "./atoms/Loading";
import axios from "axios";

const ModeWrapper = styled.div`
  display: flex;
  padding: 2rem;
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
  width: 70%;
  text-align: center;
  font-size: 2rem;
  padding: 1rem;
  font-weight: 900;
  border: none;
  border-bottom: 2px solid black;
  background-color: white;
  outline: none;
  cursor: pointer;
  &.onSelect {
    color: #5ea3ec;

    border-bottom: 4px solid #5ea3ec;
    transition: color, border-bottom 0.3s;
  }
`;

export const SelectTourMode = ({ viewTour, viewFestival, tourMode }) => {
  return (
    <ModeWrapper>
      <TourModeName onClick={viewTour}>
        <ModeName
          className={tourMode === "tour" && "onSelect"}
          disabled={tourMode === "tour"}
        >
          관광지
        </ModeName>
      </TourModeName>
      <TourModeName onClick={viewFestival}>
        <ModeName
          className={tourMode === "festivals" && "onSelect"}
          disabled={tourMode === "festivals"}
        >
          축제
        </ModeName>
      </TourModeName>
    </ModeWrapper>
  );
};

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
    width: 10px; /* 스크롤바의 너비 */
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
  padding: 1rem;
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
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;
const TourSpotItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 330px 100px;
`;
const TourSpotItem = styled.div`
  padding: 0 1rem 0 0.5rem;
  display: flex;
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
export const TourSpotList = ({
  tourList,
  isMainLoading,
  setSaveTourList,
  setIsSlideMode,
  saveTourList,
  handleDeleteList,
}) => {
  const scrollBoxRef = useRef();
  const [list, setList] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currtourList, setCurrTourList] = useState();
  const max = tourList.length;

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
    if (max <= list) {
      return;
    }
    setIsLoading(true);
    try {
      if (!currtourList) {
        setCurrTourList(tourList[list]);
      } else {
        setCurrTourList((prev) => [...prev, ...tourList[list]]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [list]);

  const addList = (index) => {
    console.log(index);

    setIsSlideMode(true);
    if (currtourList[index]) {
      setSaveTourList(currtourList[index]);
    }
  };

  console.log("max :" + max);
  console.log("currlist: " + currtourList ? "true" : "false");
  console.log(currtourList);
  return (
    <TourSpotContainer className={isMainLoading ? "off" : null}>
      <TourWrapper ref={scrollBoxRef}>
        {currtourList ? (
          currtourList.length > 1 ? (
            currtourList.map((tour, index) => (
              <TourSpotBox key={index}>
                <TourSpotLi>
                  {tour.cfirstimage ? (
                    <TourSpotIMG src={tour.cfirstimage} alt="" />
                  ) : (
                    <TourSpotIMG src="/img/TourSpot_No_IMG.svg" alt="" />
                  )}
                  <TourSpotItemWrapper>
                    <TourSpotItem>
                      <TourTitle>{tour.ctitle}</TourTitle>
                      <TourAddr>
                        {tour.caddr1}
                        {tour.caddr2 ? ` ${tour.caddr2}` : null}
                      </TourAddr>
                    </TourSpotItem>
                    <TourSpotItem>
                      {isArray.includes(tour.contentid) ? (
                        <TButton
                          style={{ backgroundColor: "red" }}
                          onClick={() => {
                            handleDeleteList(tour.contentid);
                          }}
                        >
                          삭제
                        </TButton>
                      ) : (
                        <TButton
                          onClick={() => {
                            addList(index);
                          }}
                        >
                          추가
                        </TButton>
                      )}
                      <TButton style={{ marginTop: "5px" }}>상세정보 </TButton>
                    </TourSpotItem>
                  </TourSpotItemWrapper>
                </TourSpotLi>
              </TourSpotBox>
            ))
          ) : (
            <TourLoadingWrapper className="ABC">
              <div style={{ fontSize: "3rem" }}>
                등록된 광광지가 없습니다 ㅠㅠ
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
export const FestivalSpotList = ({
  festivalList,
  isMainLoading,
  setSaveTourList,
  setIsSlideMode,
  saveTourList,
  handleDeleteList,
}) => {
  const scrollBoxRef = useRef();
  const [list, setList] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currtourList, setCurrTourList] = useState();
  const max = festivalList.length;
  console.log(festivalList);

  const [isArray, setIsArray] = useState([]);

  useEffect(() => {
    setIsArray([]);
    const newIsArrays = saveTourList.map((list) => list.contentid);
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
    // setCurrTourList(festivalList[list]);
    if (scrollBox) {
      scrollBox.addEventListener("scroll", handleScroll);
      return () => {
        scrollBox.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    if (max <= list) {
      return;
    }
    setIsLoading(true);
    try {
      if (!currtourList) {
        setCurrTourList(festivalList[list]);
      } else {
        setCurrTourList((prev) => [...prev, ...festivalList[list]]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [list]);

  const addList = (index) => {
    console.log(index);
    setIsSlideMode(true);
    if (currtourList[index]) {
      setSaveTourList(currtourList[index]);
    }
  };
  console.log(currtourList);
  return (
    <TourSpotContainer className={isMainLoading ? "off" : null}>
      <TourWrapper ref={scrollBoxRef}>
        {currtourList ? (
          currtourList.length > 1 ? (
            currtourList.map((festival, index) => (
              <TourSpotBox key={index}>
                <TourSpotLi>
                  {festival.cfirstimage ? (
                    <TourSpotIMG src={festival.cfirstimage} alt="" />
                  ) : (
                    <TourSpotIMG src="/img/TourSpot_No_IMG.svg" alt="" />
                  )}
                  <TourSpotItemWrapper>
                    <TourSpotItem>
                      <TourTitle>{festival.ctitle}</TourTitle>
                      <TourAddr>
                        {festival.caddr1}
                        {festival.caddr2 ? ` ${festival.caddr2}` : null}
                      </TourAddr>
                    </TourSpotItem>
                    <TourSpotItem>
                      {isArray.includes(festival.contentid) ? (
                        <TButton
                          style={{ backgroundColor: "red" }}
                          onClick={() => {
                            handleDeleteList(festival.contentid);
                          }}
                        >
                          삭제
                        </TButton>
                      ) : (
                        <TButton
                          onClick={() => {
                            addList(index);
                          }}
                        >
                          추가
                        </TButton>
                      )}
                      <TButton style={{ marginTop: "5px" }}>상세정보 </TButton>
                    </TourSpotItem>
                  </TourSpotItemWrapper>
                </TourSpotLi>
              </TourSpotBox>
            ))
          ) : (
            <TourLoadingWrapper className="ABC">
              <div style={{ fontSize: "3rem" }}>
                등록된 행사가 없습니다 ㅠㅠ
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
//날씨 예보 특성상 기상청의 데이터를 기반으로 가져오기때문에 접속일 기준 최대 5일까지만 지원합니다
export const Weather = ({ dateinfo, arealonglat }) => {
  const apikey = "c75a16b0fcfc4f98a1a34b29ed15d23c";
  // const date = dateinfo;
  const longlat = arealonglat;
  const [weatherData, setWeatherData] = useState();
  useEffect(() => {
    console.log("들어옴");
    console.log(arealonglat);
    try {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${arealonglat.arealatitude}&lon=${arealonglat.arealongitude}&appid=${apikey}&units=metric&lang=kr`
        )
        .then((response) => {
          const responseDate = response.data.list;
          const saveDate = responseDate.map((item) => ({
            clouds: item.clouds.all, // 강수확률
            time: item.dt_txt, // 시간
            temp: item.main.temp, // 온도
            wetherState: item.weather[0].main, // 맑음,비 등등의 데이터
          }));
          console.log("진입");
          console.log(response.data);
          setWeatherData(saveDate);
        });
    } catch (error) {
      console.log(error);
    }
  }, [longlat]);
  console.log(weatherData);
  console.log(dateinfo.startDay);
  // console.log(new Date(dateinfo.startDay).toISOString().split("T")[0]);
  // console.log(new Date(weatherData[0].time).toISOString().split("T")[0]);
  return <div>heelo</div>;
};
