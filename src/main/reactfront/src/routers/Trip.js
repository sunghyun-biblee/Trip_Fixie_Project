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
  const [detailData, setDetailData] = useState();
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
  const handleAddList = (tourList) => {
    setSaveTourList((prevList) => [...prevList, tourList]);
    console.log(saveTourList);
  };
  const handleDeleteList = (contentid) => {
    console.log(saveTourList); // saveTourList의 현재 상태를 콘솔에 출력

    const newSaveTourList = [...saveTourList];

    // contentid 값이 일치하는 항목을 필터링하여 새로운 배열을 생성합니다.
    const filteredList = newSaveTourList.filter(
      (item) => item.contentid !== contentid
    );

    // 필터링된 배열을 원래의 saveTourList 상태로 업데이트합니다.
    setSaveTourList(filteredList);
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
    // sunghyun
    if (clickTargetId === "date") {
      setMode("date");
    } else if (clickTargetId === "space") {
      if (!selectedAreaName.subAreaCode) {
        alert("날짜와 지역을 선택해주세요");
        return;
      } else {
        setMode("space");
      }
    } else if (clickTargetId === "mt") {
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
    const offset =
      new Date(Date.now()) - new Date().getTimezoneOffset() * 60000;
    // const today = new Date(offset).toISOString().split("T")[0];
    let [start, end] = dates;
    const startDateObeject = new Date(start).getDay();
    const testStart = new Date(start) - new Date().getTimezoneOffset() * 60000;
    const startDateISO = new Date(testStart).toISOString().split("T")[0];
    const endDateObeject = new Date(end).getDay();
    const testend = new Date(end) - new Date().getTimezoneOffset() * 60000;
    const endDateISO = new Date(testend).toISOString().split("T")[0];

    console.log(startDateISO.replace(/-/g, ".")); // "-"문자 모두 "."으로 변환
    if (start && end === null) {
      setStartDate(start);
      setMaxDate(new Date(start.getTime() + 4 * 24 * 60 * 60 * 1000));
      setMinDate(start);
      setDateinfo({
        startDay: startDateISO,
        startDayofWeek: `(${KoreanDayOfWeek[startDateObeject]})`,
        ...dateinfo,
      });
    } else if (start && end) {
      setStartDate(start);
      setEndDate(end);
      setMaxDate();
      setMinDate(new Date(Date.now()));
      setDateinfo({
        startDay: startDateISO,
        startDayofWeek: `(${KoreanDayOfWeek[startDateObeject]})`,
        endDay: endDateISO,
        endDayofWeek: `(${KoreanDayOfWeek[endDateObeject]})`,
      });
    }
    setEndDate(end);
  };
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
                className={mode === "date" ? "color" : null}
              >
                step 1 <br />
                날짜 확인
              </StepLi>
              <StepLi
                onClick={onChangeMode}
                id="space"
                className={mode === "space" ? "color" : null}
              >
                step 2 <br />
                장소 선택
              </StepLi>
              <StepLi
                onClick={onChangeMode}
                id="mt"
                className={mode === "mt" ? "color" : null}
              >
                step 3 <br />
                숙소 설정
              </StepLi>
              <StepLi
                onClick={onChangeMode}
                id="kr"
                className={mode === "kr" ? "color" : null}
              >
                step 4 <br />
                {weather ? weather.sys.country : null}
              </StepLi>
            </StepUl>
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
                      setSaveTourList={setSaveTourList}
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
                  style={{ width: " 600px", padding: "4rem 1rem 0 1rem" }}
                >
                  <TourSpot
                    selectedAreaName={selectedAreaName}
                    setSaveTourList={handleAddList}
                    dateinfo={dateinfo}
                    setIsSlideMode={setIsSlideMode}
                    handleDeleteList={handleDeleteList}
                    saveTourList={saveTourList}
                    setDetailData={setDetailData}
                  ></TourSpot>
                </Motionitem>
              ) : mode === "mt" ? (
                <Motionitem
                  key="mt"
                  initial="itemSet"
                  animate="itemIn"
                  exit="itemOut"
                  variants={variants}
                ></Motionitem>
              ) : null}
            </AnimatePresence>
          </MotionBox>
          <SaveTripInfo
            dateinfo={dateinfo}
            selectedAreaName={selectedAreaName}
            saveTourList={saveTourList}
            handleDeleteList={handleDeleteList}
            handleSlidemode={handleSlidemode}
            isSlideMode={isSlideMode}
            setMygeolocation={setMygeolocation}
          ></SaveTripInfo>
        </MotionMainContainer>

        <TripMap
          selectedAreaName={selectedAreaName}
          mygeolocation={mygeolocation}
          setMygeolocation={setMygeolocation}
          saveTourList={saveTourList}
          detailData={detailData}
          setDetailData={setDetailData}
        ></TripMap>
      </MotionTripWrapper>
    </AnimatePresence>
  );
}

export default Trip;
