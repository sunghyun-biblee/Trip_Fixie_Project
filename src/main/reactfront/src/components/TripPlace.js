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

function TripPlace({ weather, tripdate }) {
  const [selectmode, setSelectmode] = useState(false);
  const [locations, setLocations] = useState([]);
  const [arrays, setArrays] = useState(false);

  // const [url, setUrl] = useState('');
  // const headers = new Headers();
  // const clientSecret = 'sRVFhnY_y7';
  // const clientKey = 'a334rOkoOaZduh1GVUcc';
  // headers.append("X-Naver-Client-Id", clientKey);
  // headers.append("X-Naver-Client-Secret", clientSecret);

  const baseurl = "http://apis.data.go.kr/B551011/KorService1/searchFestival1";

  const params = {
    serviceKey: "cHlc2k2XcgjG10dgBDyoxMaS6KxKLHiHN4xtTP6q86EBe+UO09zOLEg6ZTpX9TWrdJPSJcFQYCZ+6fqhkD2ZVA==",
    numOfRows: "50",
    pageNo: "1",
    MobileOS: "ETC",
    MobileApp: "APPTest",
    areaCode: "4",
    arrange: "A",
    _type: "json",
    eventStartDate: "20240102",
  };

  const queryString = new URLSearchParams(params).toString();
  const requrl = `${baseurl}?${queryString}`;

  const Sex = () => {
    //배열 초기화

    fetch(requrl, {
      method: "GET",
    })
      .then((response) => {
        // 응답 확인
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // JSON 형태로 응답 파싱
      })
      .then((data) => {
        console.log(requrl); //url출력
        console.log(data); // API 응답 데이터 출력 (반환된 데이터는 여기서 처리할 수 있습니다.)
        const newLocations = data.items.map((item, index) => ({
          id: index,
          title: item.title,
        }));
        setLocations(newLocations);
        setArrays(true);
      })
      .catch((error) => {
        console.error("Fetch Error:", error); // 오류 발생 시 콘솔에 출력
      });
  };
  const onChange = (event) => {
    setArrays(false);
    const {
      target: { name, value },
    } = event;
    if (name === "keyword") {
      //setUrl("/api/v1/search/local.json?query=" + value + "&display=5");
    }
  };

  function Content({ locations }) {
    return (
      <div>
        <h2>검색 목록</h2>
        <ul>
          {locations.map((location) => (
            <li
              key={location.id}
              dangerouslySetInnerHTML={{ __html: location.title }}
            ></li>
          ))}
        </ul>
      </div>
    );
  }
  const handleSelectmode = () => {
    setSelectmode((mode) => !mode);
  };
  // console.log(props);
  console.log(weather);
  console.log(tripdate);
  return (
    <PlaceWrapper>
      <Tripbox style={{ width: "400px" }}>
        <p>현재 지역 날씨는? </p>
        <p>
          {weather.name} , {weather.temp}도 입니다
        </p>
        <p>
          {tripdate.start.startDate}({tripdate.start.startDayOfWeek}
          )~{tripdate.end.endDate}({tripdate.end.endDayOfWeek})
        </p>
        <div>
          <p>관광지</p>
          <p>행사</p>
        </div>
        <input
          type="text"
          placeholder="장소명을 검색하세요(ex: 달서구 도원동)"
          onChange={onChange}
          name="keyword"
        />
        <button>
          <img
            src={"/img/fairy2.svg"}
            alt=""
            style={{ width: "15px", height: "15px" }}
          />
        </button>
        <button onClick={Sex}>dddd</button>
        {arrays ? <Content locations={locations}></Content> : null}
      </Tripbox>
      <Tripbox>
        <TripSelect className={selectmode ? "on" : "off"}>
          <div>
            {selectmode ? (
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

        <ModeController onClick={handleSelectmode}>
          {selectmode ? (
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
