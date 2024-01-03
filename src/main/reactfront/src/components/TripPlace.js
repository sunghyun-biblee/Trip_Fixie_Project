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
  const [selectedAreaCode, setSelectedAreaCode] = useState("1");
  const [areaNames, setAreaNames] = useState([]);

  const [baseurl, setBaseurl] = useState("");

  const [params, setParams] = useState({});

  console.log(arrays);

  // const queryString = new URLSearchParams(params).toString();
  // const requrl = `${baseurl}?${queryString}`;

  useEffect(() => {
    if (baseurl && Object.keys(params).length > 0) {
      const queryString = new URLSearchParams(params).toString();
      const requrl = `${baseurl}?${queryString}`;

      fetch(requrl, {
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
          if(Object.keys(params)[8] === "eventStartDate"){
              const newLocations = [...locations];
              console.log(data.response.body.items);
              for(let i=0; i<data.response.body.items.length; i++){
              const newLocation = {id:i, title: data.items[i].title /*여러가지 더 추가*/};
              newLocations.push(newLocation);
              }
            setLocations(newLocations);
            console.log(newLocations);
          }else{
            const newAreaNames = data.items.map((item, index) => ({
              id: index,
              num: item.code,
              title: item.name,
            }));
            setAreaNames(newAreaNames);
            console.log(newAreaNames);
            setArrays(true);
            console.log(arrays);
          }
        })
        .catch((error) => {
          console.error("Fetch Error:", error);
        });
    }
  }, [baseurl, params]);

  const Sex = () => {
    setLocations([]);
    const areaCode = selectedAreaCode;
    console.log(areaCode);
    setBaseurl("http://apis.data.go.kr/B551011/KorService1/searchFestival1");
    setParams({
      serviceKey: "cHlc2k2XcgjG10dgBDyoxMaS6KxKLHiHN4xtTP6q86EBe+UO09zOLEg6ZTpX9TWrdJPSJcFQYCZ+6fqhkD2ZVA==",
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

  const subCode = () =>{
    setAreaNames([]);
    const areaCode = selectedAreaCode;

    console.log("지역코드 : "+areaCode);
    setBaseurl("http://apis.data.go.kr/B551011/KorService1/areaCode1");
    setParams({
      serviceKey: "cHlc2k2XcgjG10dgBDyoxMaS6KxKLHiHN4xtTP6q86EBe+UO09zOLEg6ZTpX9TWrdJPSJcFQYCZ+6fqhkD2ZVA==",
      numOfRows: "50",
      pageNo: "1",
      MobileOS: "ETC",
      MobileApp: "APPTest",
      areaCode: areaCode,
      _type: "json",
    });
   
    // const queryString = new URLSearchParams(params).toString();
    // const requrl = `${baseurl}?${queryString}`;

    // fetch(requrl, {
    //   method: "GET",
    // })
    //   .then((response) => {
    //     // 응답 확인
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.json(); // JSON 형태로 응답 파싱
    //   })
    //   .then((data) => {
    //     console.log(requrl); //url출력
    //     console.log(data); // API 응답 데이터 출력 (반환된 데이터는 여기서 처리할 수 있습니다.)

    //   })
    //   .catch((error) => {
    //     console.error("Fetch Error:", error); // 오류 발생 시 콘솔에 출력
    //   });
  };

  const onChange = (event) => {
    setSelectedAreaCode(event.target.value);
    console.log(selectedAreaCode);
  };

  function Content(props) {
    return (
      <div>
        <h2>검색 목록</h2>
        <ul>
          {props.locations.map((location) => (
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

        <h1>지역</h1>
        <select name="areacode" id="lang" onChange={onChange} value={selectedAreaCode}>
          <option value="1">서울</option>
          <option value="2">인천</option>
          <option value="3">대전</option>
          <option value="4">대구</option>
          <option value="5">광주</option>
          <option value="6">부산</option>
          <option value="7">울산</option>
          <option value="8">세종</option>
          <option value="31">경기도</option>
          <option value="32">강원도</option>
          <option value="33">충청북도</option>
          <option value="34">충청남도</option>
          <option value="35">경상북도</option>
          <option value="36">경상남도</option>
          <option value="37">전라북도</option>
          <option value="38">전라남도</option>
          <option value="39">제주도</option>
        </select>
        <button onClick={subCode}>등록</button>
        {arrays ? 
        <>
        <h1>군구</h1>
        <select name="areaNamecode" id="nameCode" >
          {areaNames.map((area) => (
            <option key={area.id} value={area.num}>
              {area.title}
            </option>
          ))}
        </select>
        </>
        :null}

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
