import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { TourLoadingWrapper } from "./TourSpot";
import { useEffect, useRef, useState } from "react";
import { Loading } from "./atoms/Loading";
import axios from "axios";
import { setDate, startOfDay } from "date-fns";

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

const WTitle = styled.div`
  position: relative;
`;

const WH1 = styled.div`  
font-size: 20px;
  margin: 0 auto;
`;

const WButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0;

`
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
    if (tourList.length === 0) {
      setCurrTourList([]);
      setIsLoading(false);
      return;
    }
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
  console.log(tourList);
  // console.log("max :" + max);
  // console.log("currlist: " + currtourList ? "true" : "false");
  // console.log(currtourList);
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
            <TourLoadingWrapper
              className="ABC"
              style={{ width: "500px", height: "500px" }}
            >
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
    if (festivalList.length === 0) {
      setCurrTourList([]);
      setIsLoading(false);
      return;
    }
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

  const [weatherData, setWeatherData] = useState([]);
  const [dateOfWeather, setDateOfWeather] = useState();
  const [dateArray, setDateArray] = useState();
  const [subDateArray, setSubDateArray] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [currWeather, setCurrWeather] = useState();

  // const offset = ;
  // const offset = new Date(Date.now()) - new Date().getTimezoneOffset() * 60000;
  // const today = new Date(offset).toISOString().split("T")[0];
  const today = new Date();
  today.setDate(today.getDate() + 5);
  // toisostring으로 변환하면 utc기준으로 한국 현재시간과 9시간이 차이난다. 이를 메꾸기위해 offset를 뺴주면서 잃어버린 9시간을 찾아오는 것
  useEffect(() => {
    try {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${longlat.arealatitude}&lon=${longlat.arealongitude}&appid=${apikey}&units=metric&lang=kr`
        )
        .then((response) => {
          const responseDate = response.data.list;
          const saveDate = responseDate.map((item) => ({
            clouds: item.clouds.all, // 강수확률
            time: item.dt_txt, // 시간
            temp: item.main.temp, // 온도
            wetherState: item.weather[0].main, // 맑음,비 등등의 데이터
          }));

          console.log(response.data);
          setWeatherData(saveDate);
        });
    } catch (error) {
      console.log(error);
    }
  }, [longlat]);
  useEffect(() => {
    const groupWeather = weatherData.reduce((prev, data) => {
      const date = data.time.split(" ")[0];

      // ex) '2024-01-19'와 같은 문자열

      //weatherData안에 time이라는 속성값을 빈 공백을 기준으로 잘라낸다음 0번째 배열을 date로 지정
      // 만약 해당 날짜에 대한 배열이 없으면 빈 배열로 초기화시킴
      if (!prev[date]) {
        prev[date] = [];
      }
      // 해당 배열안에 data를 추가
      prev[date].push(data);

      /* 
      js에서 배열의 인덱스는 일반적으로 숫자이다. 하지만 객체의 속성(프로퍼티)이름으로는 문자열을 사용 할 수 있다

      따라서 prev[date]는 날짜에 해당하는 문자열을 속성이름으로 가지는 객체가 되는 것이다
      예를 들어 2024-01-01 이라는 날짜에 대한 데이터를 추가할때 prev["2024-01-01"]는
      2024-01-01 해당 날짜에 대한 배열을 가지게 된다

      prev는 기본값으로 빈 객체로 지정해두었고, date는 객체의 속성이다
      (배열의 인덱스라고 생각하면 될것같다)

      예시로 아래와같은 형식처럼 저장이 됨

      const prev={
        "2024-01-01":["a","b","c"]
        "2024-01-02":["d","e","f"]
      } 
      모든 데이터를 순회하면서 split을 통해 날짜를 구하고, 해당 날짜에 대한 인덱스가 있으면
      해당 인덱스의 배열에 데이터를 추가하게 되는 것이다
       */

      return prev;
    }, []);
    setDateOfWeather(groupWeather);
    setIsLoading(false);
  }, [weatherData]);
  useEffect(() => {
    const startDay = new Date(dateinfo.startDay);
    const endDay = new Date(dateinfo.endDay);
    const array = [];
    for (
      let currentDate = startDay;
      currentDate <= endDay;
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      array.push(new Date(currentDate).toISOString().split("T")[0]);
    }
    console.log("!@#TLQLDLQDkfg");
    setDateArray(array);
  }, []);
  useEffect(() => {
    const subStartDay = new Date();
    const subendDay = today;
    const subArray = [];
    for (
      let currentDate = subStartDay;
      currentDate <= subendDay;
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      subArray.push(new Date(currentDate).toISOString().split("T")[0]);
    }
    setSubDateArray([...subArray]);
  }, []);
  // console.log(dateArray);
  // console.log(dateOfWeather);
  // console.log(isLoading);
  // console.log(subDateArray);
  console.log(dateArray);
  console.log(dateOfWeather);
  
  const slideUp = (index)=>{
    if(index === dateArray.length-1){
      setCurrWeather(dateArray[0]);
    }else{
      setCurrWeather(dateArray[index+1]);
    }
  }

  return (
    <>
      {isLoading ? (
        <div>로딩중</div>
      ) : dateArray &&
        new Date(dateinfo.startDay) < today &&
        new Date(dateinfo.endDay) < today ? (
        <div style={{ width: "630px"}}>
          <div style={{ display: "flex" , width: "3000px"}}>
            {dateArray.map((array, index) => (
              <WTitle style={{ width: "630px", border: "1px solid black", textAlign: "center"}}>
                <WH1>{array}</WH1>
                {dateOfWeather[array] &&
                  dateOfWeather[array].map((item) => {
                    if (
                      item.time.includes("00:00:00") ||
                      item.time.includes("06:00:00") ||
                      item.time.includes("12:00:00") ||
                      item.time.includes("18:00:00")
                    ) {
                      return (
                        <div>
                          <div>{item.time.split(" ")[1]}</div>
                          <div>{item.temp}</div>
                        </div>
                      );
                    }
                    return null;
                  })}
                  <WButton onClick={()=>{
                    slideUp(index);
                  }}>오른쪽</WButton>
              </WTitle>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div style={{ width: "100%", overflow: "hidden" }}>
            <div>지원하지 않는 날씨가 포함되어있습니다</div>
            <div style={{ display: "flex" }}>
              {subDateArray.map((array) => (
                <div style={{ width: "630px" }}>
                  <h1>{array}</h1>
                  {dateOfWeather[array] &&
                    dateOfWeather[array].map((item) => {
                      if (
                        item.time.includes("00:00:00") ||
                        item.time.includes("06:00:00") ||
                        item.time.includes("12:00:00") ||
                        item.time.includes("18:00:00")
                      ) {
                        return (
                          <div>
                            <div>{item.time.split(" ")[1]}</div>
                            <div>{item.temp}</div>
                          </div>
                        );
                      }
                      return null;
                    })}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
