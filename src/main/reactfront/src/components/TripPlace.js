import { useEffect, useState } from "react";
import { TripWrapper, Tripbox } from "./TripComponents";
import styled from "styled-components";

const TripSelect = styled.div`
  display: flex;
  flex-direction: column;
  width: 30px;
  background-color: antiquewhite;

  &.on {
    min-width: 300px;
  }
`;

const PlaceWrapper = styled(TripWrapper)`
  padding-top: 40px;
`;
const ModeController = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  z-index: 1;
  transform: translateY(-50%);
  right: -45px;
  width: 40px;
  height: 50px;
  padding: 25px;
  background-color: white;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
`;
const SelectAreaUl = styled.ul`
  display: grid;
  list-style: none;
  grid-template-columns: repeat(4, 90px);
  padding: 10px 0 0 0;
  gap: 4px;
`;
const Li = styled.li`
  text-align: center;
  padding: 10px 0;
  color: darkcyan;
  border: 1px solid #27d7ea;
  border-radius: 5px;
  background-color: #cbf0f4;
  cursor: pointer;
`;

function TripPlace({ weather, tripdate }) {
  const [tripdate1, setTripdate1] = useState({ ...tripdate });
  const [slidemode, setSlidemode] = useState(false); // 서브창 확장, 축소
  const [locations, setLocations] = useState([]); //장소 검색 결과
  const [selectedAreaCode, setSelectedAreaCode] = useState(""); // 메인지역 코드
  const [subArea, setSubArea] = useState(); // 서브 지역 코드
  const [baseurl, setBaseurl] = useState(""); // api 호출 url
  const [params, setParams] = useState({}); // api 호출 쿼리문

  const cities = [
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
          console.log(Object.keys(params)[8]);
          if (Object.keys(params)[8] /*  === "eventStartDate"*/) {
            const newLocations = [...locations];
            console.log(data.response.body.items);
            for (let i = 0; i < data.response.body.items.length; i++) {
              const newLocation = {
                id: i,
                title: data.items[i].title /*여러가지 더 추가*/,
              };
              newLocations.push(newLocation);
            }
            setLocations(newLocations);
            console.log(newLocations);
          } else {
            console.log("!@#");
            const areadata = data.response.body.items.item;
            const subAreadata = areadata.map((item) => ({
              value: item.code,
              subAreaname: item.name,
            }));
            setSubArea(subAreadata);
            console.log(subAreadata);
          }
        })
        .catch((error) => {
          console.error("Fetch Error:", error);
        });
    }
  }, [baseurl, params]);

  const searchPlace = () => {
    setLocations([]);
    const areaCode = selectedAreaCode;
    console.log(areaCode);
    setBaseurl("http://apis.data.go.kr/B551011/KorService1/searchFestival1");
    setParams({
      serviceKey:
        "cHlc2k2XcgjG10dgBDyoxMaS6KxKLHiHN4xtTP6q86EBe+UO09zOLEg6ZTpX9TWrdJPSJcFQYCZ+6fqhkD2ZVA==",
      numOfRows: "50",
      pageNo: "1",
      MobileOS: "ETC",
      MobileApp: "APPTest",
      areaCode: areaCode,
      arrange: "A",
      _type: "json",
      eventStartDate: "20240102",
    });
  };

  const SelectAreaCode = (event) => {
    //메인 지역 선택
    setSelectedAreaCode(event.target.value);
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

  const handleSlidemode = () => {
    setSlidemode((mode) => !mode);
  };
  const SelectSubAreaCode = () => {};

  return (
    <PlaceWrapper>
      <Tripbox style={{ width: "400px" }}>
        <p>
          현재 지역 날씨는? {weather.name} , {weather.temp}도 입니다
        </p>

        {tripdate1 && tripdate1.start ? (
          <p>
            {typeof tripdate.start.startDate === "undefined"
              ? null
              : `${tripdate.start.startDate}
            (${tripdate.start.startDayOfWeek})~ ${tripdate.end.endDate}
            (${tripdate.end.endDayOfWeek})`}
          </p>
        ) : (
          <p>날짜를 선택해주세요</p>
        )}

        <button>
          <img
            src={"/img/fairy2.svg"}
            alt=""
            style={{ width: "15px", height: "15px" }}
          />
        </button>

        <button onClick={searchPlace}>Search</button>
        {subArea ? (
          <button
            onClick={() => {
              setSubArea();
            }}
          >
            뒤로가기
          </button>
        ) : null}
        <SelectAreaUl>
          {!subArea
            ? cities.map((city) => (
                <Li
                  key={city.value}
                  value={city.value}
                  onClick={SelectAreaCode}
                >
                  {city.name}
                </Li>
              ))
            : subArea.map((subarea) => (
                <Li
                  key={subarea.value + Math.floor(Math.random() * 1000)}
                  value={subarea.value}
                  onClick={SelectSubAreaCode}
                >
                  {subarea.subAreaname}
                </Li>
              ))}
        </SelectAreaUl>
      </Tripbox>
      <Tripbox>
        <TripSelect className={slidemode ? "on" : "off"}>
          <div>
            {slidemode ? (
              <div style={{ textAlign: "center" }}>장소를 선택해주세요</div>
            ) : (
              <div
                style={{
                  fontWeight: 900,
                  textAlign: "center",
                  fontSize: "32px",
                }}
              >
                0
              </div>
            )}
          </div>
        </TripSelect>
        <ModeController onClick={handleSlidemode}>
          {slidemode ? (
            <img
              src="/img/Left.svg"
              style={{ width: "30px", height: "30px" }}
            />
          ) : (
            <img
              src="/img/Right.svg"
              style={{ width: "30px", height: "30px" }}
            />
          )}
        </ModeController>
      </Tripbox>
    </PlaceWrapper>
  );
}

export default TripPlace;
