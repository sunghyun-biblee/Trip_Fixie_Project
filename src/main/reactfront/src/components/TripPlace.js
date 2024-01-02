import { useEffect, useState } from "react";
import fairy from "../img/fairy2.svg";
import axios from "axios";

function TripPlace() {
  const [posts, setPosts] = useState([]);
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
  const Sex = ()=>{
         //배열 초기화
    
    console.log(requrl);

    fetch(requrl, {
      method: 'GET',
    })
    .then(response => {
      // 응답 확인
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // JSON 형태로 응답 파싱
    })
    .then(data => {
  
      console.log(requrl);   //url출력
      console.log(data); // API 응답 데이터 출력 (반환된 데이터는 여기서 처리할 수 있습니다.)
      const newLocations = data.items.map((items, index) => ({
        id: index,
        title: items.title
      }));
      setLocations(newLocations);
      setArrays(true);

    })
    .catch(error => {
      console.error('Fetch Error:', error); // 오류 발생 시 콘솔에 출력
    });
  }    
  const onChange = (event) =>{
    setArrays(false);
    const {
      target: { name, value },
    } = event;
    if (name === "keyword"){
      //setUrl('/api/v1/search/local.json?query='+value+'&display=5');
    } 
  };

  function Content({ locations }) {
    return (
      <div>
        <h2>검색 목록</h2>
        <ul>
          {locations.map((location) => (
            <li key={location.id} dangerouslySetInnerHTML={{ __html: location.title }}></li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <>
    <div>
      <div>
        <p>
          해당 지역 날씨는? <br /> 23"c, 흐림
        </p>

        <p>경주</p>
        <p>2024.01.02(화)~2024.01.03(수)</p>
        <div>
          <p>장소선택</p>
          <p>신규 장소 등록</p>
        </div>
        <input type="text" placeholder="장소명을 검색하세요(ex: 달서구 도원동)" 
          onChange={onChange}
          name="keyword"
        />
        <button>
          <img src={fairy} alt="" />
        </button>
        <button onClick={Sex}>dddd</button>
        {arrays  ?
          <Content locations = {locations}></Content> :null }
      </div>
    </div>
    </>
  );
  
  }

export default TripPlace;
