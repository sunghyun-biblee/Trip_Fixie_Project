import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MotionAreaSelectBtn, MotionLi } from "./tripmotion_components";
import axios from "axios";
import {
  Areabox,
  Motion_AreaName,
  PlaceWrapper,
  SelectAreaUl,
  TripArea,
  Tripbox,
} from "./trip_place_components";

const AreaVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visable: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.7 },
};
const LiVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visable: { opacity: 1, scale: 1 },
};

function TripPlace({
  dateinfo,
  setSelectedAreaName,
  setMode,
  selectedAreaName,
}) {
  const [tripAreaName, setTripAreaName] = useState({
    mainAreaName: selectedAreaName.mainAreaName,
    subAreaName: selectedAreaName.subAreaName,
  });
  const [getSelectedAreaName, setGetSelectedAreaName] = useState({
    ...selectedAreaName,
  });
  const [locations, setLocations] = useState([]); //장소 검색 결과
  const [mainAreaCode, setMainAreaCode] = useState(
    selectedAreaName.mainAreaCode ? selectedAreaName.mainAreaCode : ""
  ); // 메인지역 코드
  const [subAreaCode, setSubAreaCode] = useState(
    selectedAreaName.subAreaCode ? selectedAreaName.subAreaCode : ""
  );
  const [subArea, setSubArea] = useState([]); // 서브 지역 코드
  const [baseurl, setBaseurl] = useState(""); // api 호출 url
  const [params, setParams] = useState({}); // api 호출 쿼리문
  // const [citycode, setCitycode] = useState({ citycode: 1, subCitycode: 2 });
  const Area = [
    {
      value: 1,
      name: "서울",
    },
    {
      value: 2,
      name: "인천",
    },
    {
      value: 3,
      name: "대전",
    },
    {
      value: 4,
      name: "대구",
    },
    {
      value: 5,
      name: "광주",
    },
    {
      value: 6,
      name: "부산",
    },
    {
      value: 7,
      name: "울산",
    },
    {
      value: 8,
      name: "세종시",
    },
    {
      value: 31,
      name: "경기도",
    },
    {
      value: 32,
      name: "강원도",
    },
    {
      value: 33,
      name: "충청북도",
    },
    {
      value: 34,
      name: "충청남도",
    },
    {
      value: 35,
      name: "경상북도",
    },
    {
      value: 36,
      name: "경상남도",
    },
    {
      value: 37,
      name: "전라북도",
    },
    {
      value: 38,
      name: "전라남도",
    },
    {
      value: 39,
      name: "제주도",
    },
  ];

  // const queryString = new URLSearchParams(params).toString();
  // const requrl = `${baseurl}?${queryString}`;

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
          console.log(data);
          //console.log(Object.keys(params)[8]);
          if (Object.keys(params)[8] === "eventStartDate") {
            const newLocations = [...locations];

            for (let i = 0; i < data.response.body.items.length; i++) {
              const newLocation = {
                id: i,
                title: data.items[i].title /*여러가지 더 추가*/,
              };
              newLocations.push(newLocation);
            }
            setLocations(newLocations);
          } else if (Object.keys(params)[7] === "contentTypeId") {
          } else if (Object.keys(params)[5] === "_type") {
          } else {
            console.log("진입");
            console.log(data.response.body.items.item);
            const areadata = data.response.body.items.item;
            const subAreadata = areadata.map((item) => ({
              value: item.code,
              subAreaname: item.name,
            }));
            setSubArea(subAreadata);
          }
        })
        .catch((error) => {
          console.error("Fetch Error:", error);
        });
    }
  }, [baseurl, params]);

  const SelectAreaCode = (event) => {
    console.log("SelectAreaCode");
    console.log(event.target.textContent);
    //메인 지역 선택
    setMainAreaCode(event.target.value);
    // setCitycode({
    //   citycode: event.target.value,
    //   ...citycode,
    // });
    setTripAreaName({
      mainAreaName: event.target.textContent,
      subAreaName: "",
    });
    // setGetSelectedAreaName({ mainAreaName: "", submitAreaName: "" });
    setBaseurl("http://apis.data.go.kr/B551011/KorService1/areaCode1"); //서브지역 코드받기
    setParams({
      serviceKey:
        "cHlc2k2XcgjG10dgBDyoxMaS6KxKLHiHN4xtTP6q86EBe+UO09zOLEg6ZTpX9TWrdJPSJcFQYCZ+6fqhkD2ZVA==",
      numOfRows: "50",
      pageNo: "1",
      MobileOS: "ETC",
      MobileApp: "APPTest",
      areaCode: `${event.target.value}`,
      _type: "json",
    });
  };
  const SelectSubAreaCode = (event) => {
    // setCitycode({
    //   subCitycode: event.target.value,
    //   ...citycode,
    // });
    console.log(event.target.value);
    setSubAreaCode(event.target.value);
    setTripAreaName({
      ...tripAreaName,
      subAreaName: event.target.textContent,
    });
  };

  const resetArea = async (event) => {
    if (event.target.className === "main") {
      setSubArea([]);
      setSubAreaCode();
      setMainAreaCode();
      setTripAreaName({ mainAreaName: "", subAreaName: "" });
      setGetSelectedAreaName({
        mainAreaName: "",
        subAreaName: "",
        mainAreaCode: "",
        subAreaCode: "",
      });
    } else if (event.target.className === "sub") {
      // setSubAreaCode();
      // setSubArea([]);
      console.log(mainAreaCode);
      console.log(getSelectedAreaName.mainAreaName);

      setTripAreaName({
        mainAreaName: tripAreaName.mainAreaName,
        subAreaName: "",
      });
      setGetSelectedAreaName((prev) => ({
        ...prev,
        subAreaName: "",
        subAreaCode: "",
      }));
      setMainAreaCode(
        mainAreaCode ? mainAreaCode : selectedAreaName.mainAreaCode
      );
      setBaseurl("http://apis.data.go.kr/B551011/KorService1/areaCode1"); //서브지역 코드받기
      setParams({
        serviceKey:
          "cHlc2k2XcgjG10dgBDyoxMaS6KxKLHiHN4xtTP6q86EBe+UO09zOLEg6ZTpX9TWrdJPSJcFQYCZ+6fqhkD2ZVA==",
        numOfRows: "50",
        pageNo: "1",
        MobileOS: "ETC",
        MobileApp: "APPTest",
        areaCode: mainAreaCode ? mainAreaCode : selectedAreaName.mainAreaCode,
        _type: "json",
      });
    }
  };
  const submitAreaName = () => {
    if (tripAreaName.mainAreaName !== "" && tripAreaName.subAreaName !== "") {
      setSelectedAreaName({
        mainAreaName: tripAreaName.mainAreaName,
        subAreaName: tripAreaName.subAreaName,
        mainAreaCode: mainAreaCode,
        subAreaCode: subAreaCode,
      });
      setMode("space");
    }
  };
  // console.log(getSelectedAreaName);
  // console.log(subArea);
  // console.log(tripAreaName.mainAreaName);
  // console.log(tripAreaName.subAreaName);
  // console.log(mainAreaCode);
  // console.log(subAreaCode);
  return (
    <PlaceWrapper>
      <Tripbox
        className="one
      "
      >
        {/* {tripAreaName.subAreaName ? (
          <button
            onClick={() => {
              setMainAreaCode();
              setSubAreaCode();
              setSubArea([]);
              setTripAreaName({ mainAreaName: "", subAreaName: "" });
              setdDisableSubArea((mode) => !mode);
            }}
          >
            초기화
          </button>
        ) : null} */}
        <AnimatePresence>
          {/* sunhyun */}
          <Motion_AreaName style={{ marginTop: "5px" }}>
            {getSelectedAreaName.mainAreaName ||
            tripAreaName.mainAreaName !== "" ? (
              <>
                <TripArea
                  className="main"
                  key="main"
                  initial="hidden"
                  animate="visable"
                  exit="exit"
                  variants={AreaVariants}
                  onClick={resetArea}
                >
                  <p className="main">
                    {tripAreaName.mainAreaName
                      ? tripAreaName.mainAreaName
                      : getSelectedAreaName.mainAreaName}
                  </p>
                </TripArea>
                <motion.img
                  initial={{ opacity: "1", scale: 0.5 }}
                  animate={{ opacity: "1", scale: 1 }}
                  exit={{ opacity: "0", scale: 0.5 }}
                  src="/img/Right.svg"
                  style={{
                    position: "absolute",
                    top: "30%",
                    right: "44%",
                    zIndex: "1",
                    width: "40px",
                    Color: "gray",
                  }}
                ></motion.img>
              </>
            ) : null}
            {tripAreaName.subAreaName !== "" ||
            getSelectedAreaName.subAreaName ? (
              <TripArea
                className="sub"
                key="sub"
                initial="hidden"
                animate="visable"
                variants={AreaVariants}
                exit="exit"
                onClick={resetArea}
              >
                <p className="sub">
                  {tripAreaName.subAreaName
                    ? tripAreaName.subAreaName
                    : getSelectedAreaName.subAreaName}
                </p>
              </TripArea>
            ) : null}
          </Motion_AreaName>
        </AnimatePresence>
        <SelectAreaUl>
          {!mainAreaCode ? (
            <Areabox>
              {Area.map((city) => (
                <MotionLi
                  key={city.value}
                  value={city.value}
                  onClick={SelectAreaCode}
                  initial="hidden"
                  animate="visable"
                  variants={LiVariants}
                >
                  {city.name}
                </MotionLi>
              ))}
            </Areabox>
          ) : (
            <Areabox
              className={
                tripAreaName.subAreaName || getSelectedAreaName.subAreaName
                  ? "on"
                  : "off"
              }
            >
              {tripAreaName.subAreaName || getSelectedAreaName.subAreaName ? (
                <MotionAreaSelectBtn
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  onClick={submitAreaName}
                >
                  <p>선택 완료 !</p>
                </MotionAreaSelectBtn>
              ) : (
                subArea.map((subarea) => (
                  <MotionLi
                    key={subarea.value + Math.floor(Math.random() * 1000)}
                    value={subarea.value}
                    onClick={SelectSubAreaCode}
                    initial="hidden"
                    animate="visable"
                    variants={LiVariants}
                  >
                    {subarea.subAreaname}
                  </MotionLi>
                ))
              )}
            </Areabox>
          )}
        </SelectAreaUl>
      </Tripbox>
    </PlaceWrapper>
  );
}

export default TripPlace;