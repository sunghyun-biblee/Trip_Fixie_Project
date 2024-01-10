import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import "../components/Trip/css/react-datepicker.css";
import { ko } from "date-fns/locale";
import Header from "../components/atoms/Header";
import styled from "styled-components";
import {
  MotionTripWrapper,
  Motionitem,
} from "../components/Trip/tripmotion_components";
import {
  StepContainer,
  StepLi,
  StepUl,
  Stepbox,
} from "../components/Trip/trip_step_components";
import {
  Button,
  CustomDatePicker,
  DateBox,
  DateWrapper,
  GuidTitle,
  MotionBox,
} from "../components/Trip/TripComponents";
import TripPlace from "../components/Trip/TripPlace";
import { SaveTripInfo } from "../components/Trip/SaveTripInfo";
import TripMap from "../components/Trip/TripMap";
import TourSpot from "../components/TourSpot";

const MotionMainContainer = styled.div`
  position: relative;

  display: flex;
  height: 100vh;
`;
const variants = {
  itemSet: { opacity: 0, x: "100%" },
  itemIn: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring", // 스프링 효과 사용
      damping: 11, // 감쇠 설정
      stiffness: 40, // 강성 설정
    },
  },
  itemOut: { opacity: 0, x: "-100%" },
};

const API_KEY = "c75a16b0fcfc4f98a1a34b29ed15d23c";
function Trip() {
  // const offset = new Date().getTimezoneOffset() * 60000;
  // 영국시간으로 맞춰져있기 때문에 한국시간으로 정정하기위해 잃어버린 9시간을 찾아옴
  const KoreanDayOfWeek = ["일", "월", "화", "수", "목", "금", "토"]; // 날짜 요일을 구하기위함
  const [dateinfo, setDateinfo] = useState({
    startDay: "",
    startDayofWeek: "",
    endDay: "",
    endDayofWeek: "",
  });
  const [selectedAreaName, setSelectedAreaName] = useState({
    mainAreaName: "",
    subAreaName: "",
    mainAreaCode: "",
    subAreaCode: "",
  });
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(null);
  const [minDate, setMinDate] = useState(new Date(Date.now()));
  const [maxDate, setMaxDate] = useState();
  const [mode, setMode] = useState("date");
  const [lastClickedId, setLastClickedId] = useState(null);
  const [weather, setWeather] = useState({
    clouds: "",
    coord: { long: "", lat: "" },
    sys: { country: "" },
    id: "",
    name: "",
    weather: "",
    temp: "",
  });

  const [mygeolocation, setMygeolocation] = useState({
    lat: "",
    long: "",
  });

  const [isSlideMode, setIsSlideMode] = useState(false); // 서브창 확장,
  const handleSlidemode = () => {
    setIsSlideMode((mode) => !mode);
  };

  //추가
  const [saveTourList, setSaveTourList] = useState([]);
  const handleAddList = (tourList) =>{
    setSaveTourList(prevList => [...prevList, tourList]);
    console.log(saveTourList);
  }
  const handleDeleteList = (indexToRemove) => {
    setSaveTourList(prevList => prevList.filter((_, index) => index !== indexToRemove));
    console.log(saveTourList);
  };

  useEffect(() => {
    const geolocation = async () => {
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position.coords);
        setMygeolocation({
          long: position.coords.longitude,
          lat: position.coords.latitude,
        });

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=metric`;
        fetch(url).then((response) =>
          response.json().then((data) => {
            const { clouds, sys, coord, id, name, weather, main } = data;
            setWeather({
              clouds,
              sys,
              coord,
              id,
              name,
              weather,
              temp: Math.floor(main.temp),
            });
            // { ...data, clouds: data.weather[0].main }
          })
        );
      });
    };
    geolocation();
  }, []);
  const onChangeMode = (event) => {
    const clickTargetId = event.target.id;
    if (clickTargetId !== "date") {
      document.getElementById("date").style.color = "gray";
      document.getElementById("date").style.transform = "scale(1)";
    }
    event.target.style.color = "#03A9F4"; //#50DCEF > 연파랑 , #03A9F4> 찐파랑
    event.target.style.fontWeight = 900;
    event.target.style.scale = 1;
    setLastClickedId(clickTargetId);
    // console.log(lastClickedId);

    if (lastClickedId && lastClickedId !== clickTargetId) {
      /*  lastClickedId가 true 이고 , lastClickedId와 clickedId 클릭한 태그의 아이디가 다르다면 이전에 클릭한태그의 아이디값을 참조하여 해당태그의 컬러색을 gray색으로 변경
       이와같은 형식이 가능한 이유는 React의 useState 훅에서 setState함수는
       비동기로 동작하며, 즉시 상태를 업데이트하지 않는다. 대신 리액트는 일련의 업데이트를 큐에 넣고, 현재 함수가 완전히 종료된 후에 큐를 처리하여 상태를 업데이트한다

       //비동기이기때문에 setState 함수를 지나쳐 다음코드를 실행하기 떄문에 다음함수가 끝난후에 함수가 적용됨

       하지만 아래와 같이 함수형으로 setState를 사용하면 이전 상태값을 기반으로 새로운 상태를 설정할 수 있으며, 이 경우 최신의 상태를 보장한다
      const [count, setCount] = useState(0);

      const handleClick = () => {
      setCount(prevCount => prevCount + 1);
      여기서의 prevCount는 업데이트 이전의 값

        */
      const lastClicked = document.getElementById(lastClickedId);
      if (lastClicked) {
        lastClicked.style.color = "gray";
        lastClicked.style.fontWeight = 600;
        lastClicked.style.scale = 0.8;
      }
    }

    if (event.target.id === "date") {
      setMode("date");
    } else if (event.target.id === "space") {
      setMode("space");
    } else if (event.target.id === "mt") {
      setMode("mt");
    }
  };

  const highlightStartDate = (date) => {
    return startDate && date.getTime() === startDate.getTime()
      ? "start-date"
      : "";
  };

  const highlightEndDate = (date) => {
    return endDate && date.getTime() === endDate.getTime() ? "end-date" : "";
  };

  const onChange = (dates) => {
    let [start, end] = dates;
    const startDateObeject = new Date(start).getDay();
    const startDateISO = new Date(start).toISOString().split("T")[0];
    const endDateObeject = new Date(end).getDay();
    const endDateISO = new Date(end).toISOString().split("T")[0];

    console.log(startDateISO.replace(/-/g, ".")); // "-"문자 모두 "."으로 변환
    if (start && end === null) {
      setStartDate(start);
      setMaxDate(new Date(start.getTime() + 4 * 24 * 60 * 60 * 1000));
      setMinDate(start);
      setDateinfo({
        startDay: startDateISO.replace(/-/g, "."),
        startDayofWeek: `(${KoreanDayOfWeek[startDateObeject]})`,
        ...dateinfo,
      });
    } else if (start && end) {
      setStartDate(start);
      setEndDate(end);
      setMaxDate();
      setDateinfo({
        startDay: startDateISO.replace(/-/g, "."),
        startDayofWeek: `(${KoreanDayOfWeek[startDateObeject]})`,
        endDay: endDateISO.replace(/-/g, "."),
        endDayofWeek: `(${KoreanDayOfWeek[endDateObeject]})`,
      });
    }
    setEndDate(end);
  };
  console.log(mode);
  return (
    <AnimatePresence mode="wait">
      <MotionTripWrapper
        initial={{ opacity: 0, x: "100%" }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            type: "spring", // 스프링 효과 사용
            damping: 11, // 감쇠 설정
            stiffness: 40, // 강성 설정
          },
        }}
        exit={{ opacity: 0, x: "-100%" }}
      >
        <Header></Header>
        <StepContainer>
          <Stepbox>
            <StepUl>
              <StepLi
                onClick={onChangeMode}
                id="date"
                style={{
                  color: "#03A9F4",
                  transform: "scale(1.2)",
                  fontWeight: 900,
                }}
              >
                step 1 <br />
                날짜 확인
              </StepLi>
              <StepLi onClick={onChangeMode} id="space">
                step 2 <br />
                장소 선택
              </StepLi>
              <StepLi onClick={onChangeMode} id="mt">
                step 3 <br />
                숙소 설정
              </StepLi>
              <StepLi onClick={onChangeMode} id="kr">
                step 4 <br />
                {weather ? weather.sys.country : null}
              </StepLi>
            </StepUl>
            <Button> </Button>
          </Stepbox>
        </StepContainer>
        <MotionMainContainer>
          <MotionBox>
            <AnimatePresence mode="out-in">
              {mode === "date" ? (
                <Motionitem
                  key="date"
                  initial="itemSet"
                  animate="itemIn"
                  exit="itemOut"
                  variants={variants}
                >
                  <GuidTitle>언제?</GuidTitle>
                  <DateWrapper>
                    <CustomDatePicker
                      dateFormat="yyyy/MM/dd"
                      onChange={onChange}
                      startDate={startDate}
                      endDate={endDate}
                      minDate={minDate}
                      selectsRange
                      maxDate={maxDate}
                      locale={ko}
                      placeholderText="날짜를 선택해주세요"
                      dayClassName={(date) =>
                        `react-datepicker-day ${highlightStartDate(
                          date
                        )} ${highlightEndDate(date)}`
                      }
                      value={
                        dateinfo.startDay
                          ? `${dateinfo.startDay} ${dateinfo.startDayofWeek} - ${dateinfo.endDay} ${dateinfo.endDayofWeek}`
                          : null
                      }
                      withPortal
                      className="calendar_input"
                    />
                  </DateWrapper>
                  <DateBox style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src="/img/bell.png"
                      style={{ width: "30px", height: "30px" }}
                      alt=""
                    />
                    <p className="date__info" style={{ paddingLeft: "1.7rem" }}>
                      <b>날씨예보</b>는<b style={{ color: "black" }}>접속일</b>
                      로부터 <br />
                      <b style={{ color: "tomato" }}>최대 5일</b>까지만
                      지원합니다
                    </p>
                  </DateBox>
                  <DateBox>
                    <GuidTitle>어디로?</GuidTitle>

                    <TripPlace
                      weather={weather}
                      dateinfo={dateinfo}
                      setSelectedAreaName={setSelectedAreaName}
                      selectedAreaName={selectedAreaName}
                      setMode={setMode}
                    ></TripPlace>
                  </DateBox>
                </Motionitem>
              ) : mode === "space" ? (
                <Motionitem
                  key="space"
                  initial="itemSet"
                  animate="itemIn"
                  exit="itemOut"
                  variants={variants}
                >
                  <TourSpot
                     selectedAreaName = {selectedAreaName}
                     setSaveTourList={handleAddList}
                     dateinfo={dateinfo}
                     setIsSlideMode={setIsSlideMode}
                  >
                  </TourSpot>
                </Motionitem>
              ) : mode === "mt" ? (
                <Motionitem
                  key="mt"
                  initial="itemSet"
                  animate="itemIn"
                  exit="itemOut"
                  variants={variants}
                >
                  <GuidTitle>언제?</GuidTitle>
                  <DateWrapper>
                    <CustomDatePicker
                      dateFormat="yyyy/MM/dd"
                      onChange={onChange}
                      startDate={startDate}
                      endDate={endDate}
                      minDate={minDate}
                      selectsRange
                      maxDate={maxDate}
                      locale={ko}
                      placeholderText="날짜를 선택해주세요"
                      dayClassName={(date) =>
                        `react-datepicker-day ${highlightStartDate(
                          date
                        )} ${highlightEndDate(date)}`
                      }
                      value={
                        dateinfo.startDay
                          ? `${dateinfo.startDay} ${dateinfo.startDayofWeek} - ${dateinfo.endDay} ${dateinfo.endDayofWeek}`
                          : null
                      }
                      withPortal
                      className="calendar_input"
                    />
                  </DateWrapper>
                  <DateBox style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src="/img/bell.png"
                      style={{ width: "30px", height: "30px" }}
                      alt=""
                    />
                    <p className="date__info" style={{ paddingLeft: "1.7rem" }}>
                      <b>날씨예보</b>는 <b style={{ color: "black" }}>접속일</b>
                      로부터 <br />
                      <b style={{ color: "tomato" }}>최대 5일</b>까지만
                      지원합니다
                    </p>
                  </DateBox>
                  <DateBox>
                    <GuidTitle>어디로?</GuidTitle>

                    <TripPlace
                      weather={weather}
                      dateinfo={dateinfo}
                    ></TripPlace>
                  </DateBox>
                </Motionitem>
              ) : null}
            </AnimatePresence>
          </MotionBox>
          <SaveTripInfo
            dateinfo={dateinfo}
            selectedAreaName={selectedAreaName}
            saveTourList={saveTourList}
            deleteSaveTourList={handleDeleteList}
            handleSlidemode={handleSlidemode}
            isSlideMode={isSlideMode}
          ></SaveTripInfo>
        </MotionMainContainer>

        <TripMap></TripMap>
      </MotionTripWrapper>
    </AnimatePresence>
  );
}

export default Trip;
