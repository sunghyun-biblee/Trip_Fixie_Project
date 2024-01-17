import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { TourLoadingWrapper } from "./TourSpot";
import { useEffect, useRef, useState } from "react";
import { Loading } from "./atoms/Loading";
import axios from "axios";
import { setDate, startOfDay } from "date-fns";
import { ref } from "firebase/storage";

const ModeWrapper = styled.div`
  display: flex;
  padding: 1rem;
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

const WTitle = styled.div`
  position: relative;
  scroll-snap-align: start;
`;

const WH1 = styled.div`
  font-size: 20px;
  margin: 0 auto;
`;

const WRightButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
`;
const WLeftButton = styled.button`
  position: absolute;
  top: 50%;
  left: 0;
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
                        <br />
                        {tour.caddr2 ? ` ${tour.caddr2}` : null}
                      </TourAddr>
                    </TourSpotItem>
                    <TourSpotItem style={{ marginRight: "1.25rem" }}>
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
                    <TourSpotItem style={{ marginRight: "1.25rem" }}>
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

  const slide = useRef();
  const [weatherData, setWeatherData] = useState([]);
  const [subWeather, setSubWeather] = useState();
  const [dateArray, setDateArray] = useState();
  const [subDateArray, setSubDateArray] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [choiceWeather, setChoiceWeather] = useState();

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
          console.log("날씨데이터");
          console.log(response);
          const responseDate = response.data.list;
          const saveDate = responseDate.map((item) => ({
            clouds: item.clouds.all, // 강수확률
            time: item.dt_txt, // 시간
            temp: item.main.temp, // 온도
            wetherState: item.weather[0].main, // 맑음,비 등등의 데이터
            icon: item.weather[0].icon,
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
    console.log("섹스");

    if (dateArray) {
      const sampleArray = [groupWeather[dateArray[dateArray.length - 1]]];
      for (let i = 0; i < dateArray.length; i++) {
        sampleArray.push(groupWeather[dateArray[i]]);
      }
      sampleArray.push(groupWeather[dateArray[0]]);

      const sampleArray2 = [
        groupWeather[subDateArray[subDateArray.length - 1]],
      ];
      for (let i = 0; i < subDateArray.length; i++) {
        sampleArray2.push(groupWeather[subDateArray[i]]);
      }
      sampleArray2.push(groupWeather[subDateArray[0]]);

      console.log(sampleArray);
      setChoiceWeather(sampleArray);
      setSubWeather(sampleArray2);
      setIsLoading(false);
    }
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

  const slideUp = (index) => {
    const slideBox = slide.current;
    slideBox.style.transition = "transform 0.5s";
    if (
      new Date(dateinfo.startDay) < today &&          //choiceweather인지 subweather인지 구별
      new Date(dateinfo.endDay) < today
    ) {
      if (choiceWeather.length - 2 === index) {       //무한슬라이드쇼 구현을 위해 배열앞뒤에 마지막과 처음의 요소를 추가해놓은 상태이므로 마지막요소를 찾을때는 length에서 -1만 하는게 아니라 -2를 해주어야한다.
        slideBox.style.transform = `translateX(-${(index + 1) * 100}%)`;  //현재 받아온 인덱스번호에서 +1 *100을 하여 다음요소의 위치를 설정 

        setTimeout(() => {
          slideBox.style.transition = "";
          slideBox.style.transform = `translateX(-100%)`; //마지막에 도달했을때 똑같이 +1 *100을 해서 보여준뒤 부드러운 전환을 위하여 슬라이드 모션 삭제 후 배열의 끝에 있던 값과 동일한 값을 가진 배열의 인덱스 1번으로 이동한다.
        }, 500);
      } else {
        slideBox.style.transform = `translateX(-${(index + 1) * 100}%)`;  
      }
    } else {
      if (subWeather.length - 2 === index) {
        slideBox.style.transform = `translateX(-${(index + 1) * 100}%)`;

        setTimeout(() => {
          slideBox.style.transition = "";
          slideBox.style.transform = `translateX(-100%)`;
        }, 500);
      } else {
        slideBox.style.transform = `translateX(-${(index + 1) * 100}%)`;
      }
    }
  };
  const slideDown = (index) => {
    const slideBox = slide.current;
    slideBox.style.transition = "transform 0.5s";
    if (
      new Date(dateinfo.startDay) < today &&
      new Date(dateinfo.endDay) < today
    ) {
      if (index === 1) {  // 가장 처음 섹션에서 버튼을 누르면 마지막 섹션으로 이동
        slideBox.style.transform = `translateX(0)`; //배열의 가장 첫번째 내용 == 요소의 마지막 내용 이기 때문에 일단 가장 처음으로 이동시킨 뒤.

        setTimeout(() => {
          slideBox.style.transition = "";
          slideBox.style.transform = `translateX(-${  //실제 위치를 (choiceWeather.length - 2) * 100를 통하여 얻어낸 후 적용
            (choiceWeather.length - 2) * 100
          }%)`;
        }, 500);
      } else {
        slideBox.style.transform = `translateX(-${(index - 1) * 100}%)`;  //up로직과 반대로 -1 *100하여 왼쪽으로 한칸씩 이동
      }
    } else {
      if (index === 1) {
        slideBox.style.transform = `translateX(0)`;

        setTimeout(() => {
          slideBox.style.transition = "";
          slideBox.style.transform = `translateX(-${
            (subWeather.length - 2) * 100
          }%)`;
        }, 500);
      } else {
        slideBox.style.transform = `translateX(-${(index - 1) * 100}%)`;
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <div>로딩중</div>
      ) : dateArray &&
        new Date(dateinfo.startDay) < today &&
        new Date(dateinfo.endDay) < today ? (
        <div style={{ width: "100%", overflow: "hidden" }}>
          <div
            style={{ display: "flex", transform: "translateX(-100%)" }}     //처음부터 translateX(-100%)적용하여 원하는 처음 요소가 보일 수 있도록 설정.
            ref={slide}
          >
            {choiceWeather &&
              choiceWeather.map((item, index) => (
                <WTitle
                  style={{
                    flex: "0 0 100%",
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                  key={index}
                >
                  <WH1>{item[0].time.split(" ")[0]}</WH1>
                  {item.map((list) => {
                    if (
                      list.time.includes("00:00:00") ||
                      list.time.includes("06:00:00") ||
                      list.time.includes("12:00:00") ||
                      list.time.includes("18:00:00")
                    ) {
                      return (
                        <>
                          <div>
                            <div>{list.time.split(" ")[1]}</div>
                            <div>{list.temp} <img src={`https://openweathermap.org/img/wn/${list.icon}@2x.png`} alt="" /></div>                          
                          </div>
                          <WRightButton
                            onClick={() => {
                              slideUp(index);
                              console.log(index);
                            }}
                          >
                            오른쪽
                          </WRightButton>
                          <WLeftButton
                            onClick={() => {
                              slideDown(index);
                            }}
                          >
                            왼쪽
                          </WLeftButton>
                        </>
                      );
                    }
                    return null;
                  })}
                </WTitle>
              ))}
          </div>
        </div>
      ) : (
        <>
          <div style={{ width: "100%", overflow: "hidden" }}>
            <div>지원하지 않는 날씨가 포함되어있습니다</div>
            <div
              style={{ display: "flex", transform: "translateX(-100%)" }}
              ref={slide}
            >
              {subWeather &&
                subWeather.map((item, index) => (
                  <WTitle
                    style={{
                      flex: "0 0 100%",
                      border: "1px solid black",
                      textAlign: "center",
                    }}
                    key={index}
                  >
                    <WH1>{item[0].time.split(" ")[0]}</WH1>
                    {item.map((list) => {
                      if (
                        list.time.includes("00:00:00") ||
                        list.time.includes("06:00:00") ||
                        list.time.includes("12:00:00") ||
                        list.time.includes("18:00:00")
                      ) {
                        return (
                          <>
                            <div>
                              <div>{list.time.split(" ")[1]}</div>
                              <div>{list.temp} <img src={`https://openweathermap.org/img/wn/${list.icon}@2x.png`} alt="" /></div>                          
                            </div>
                            <WRightButton
                              onClick={() => {
                                slideUp(index);
                                console.log(index);
                              }}
                            >
                              오른쪽
                            </WRightButton>
                            <WLeftButton
                              onClick={() => {
                                slideDown(index);
                              }}
                            >
                              왼쪽
                            </WLeftButton>
                          </>
                        );
                      }
                      return null;
                    })}
                  </WTitle>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
