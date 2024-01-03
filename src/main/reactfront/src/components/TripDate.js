import { useEffect, useState } from "react";
import styled from "styled-components";
// import fairyImg from "../img/fairy.png";

const DateContainer = styled.div`
  min-width: 330px;
  max-width: 530px;
  font-weight: 600;
  padding: 20px;
  input[type="date"] {
    background: url("/img/Calendar.svg") no-repeat right;
    font-weight: 900;
    border: none;
    position: relative;

    &:focus {
      outline: none;
    }

    &::-webkit-calendar-picker-indicator {
      position: absolute;
      left: 0;
      top: 0;
      background: transparent;

      cursor: pointer;
      width: 100%;
      height: 100%;
    }
  }
  #tripstart,
  #tripend {
    padding: 0 1.5rem 0 1rem;
  }

  height: 100%;
`;
const TripSelectDay = styled.div`
  padding-top: 2rem;
  div {
    padding: 0 0.5rem 0.5rem 1rem;
  }
`;
const TripHour = styled.div`
  display: flex;
  padding: 0.5rem 1rem 1rem 1rem;

  p:last-child {
    color: blue;
    padding-left: 10px;
    &::after {
      content: "❗";
      padding: 0 10px;
      /* width: 5px;
      height: 5px;
      border: 1px solid black;
      padding-left: 15px; */
    }
  }
`;
const Triptime = styled.div`
  padding: 0 0.5rem 0.5rem 0.5rem;
  table {
    border-spacing: 0;
    width: 100%;
    padding: 1rem 0 1rem 0;
    text-align: center;
    font-size: 0.8rem;
    thead {
      tr {
        background-color: #fafafa;
        color: #b8bdc4;
        th {
          padding: 0.6rem;
        }
      }
    }

    td {
      font-size: 14px;
      padding: 0.1rem;
    }
  }
  input[type="time"] {
    border: none;
    text-align: center;
  }
`;
const DateButton = styled.button`
  width: 100%;
  border: none;
  background-color: black;
  background-size: contain;

  color: white;
  padding: 0.625rem 0;
  border-radius: 5px;
  cursor: pointer;
`;

function TripDate({ weather, getTripDate }) {
  /*
  // const [mygeolocation, setMygeolocation] = useState({
  //   lat: "",
  //   long: "",
  // });
  // const geolocation = () => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     console.log(position.coords);
  //     setMygeolocation({
  //       long: position.coords.longitude,
  //       lat: position.coords.latitude,
  //     });
  //     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`;
  //     fetch(url).then((response) =>
  //       response.json().then((data) => {
  //         console.log(data);
  //       })
  //     );
  //   });
  // };
 */
  const offset = new Date().getTimezoneOffset() * 60000;
  // 영국시간으로 맞춰져있기 때문에 한국시간으로 정정하기위해 잃어버린 9시간을 찾아옴

  const today = new Date(Date.now() - offset).toISOString().split("T")[0];
  const MaxDate = new Date(Date.now() - offset);
  MaxDate.setDate(MaxDate.getDate() + 5);
  const exportMaxDate = MaxDate.toISOString().split("T")[0];

  const KoreanDayOfWeek = ["일", "월", "화", "수", "목", "금", "토"]; // 날짜 요일을 구하기위함
  const [startday, setStartday] = useState({
    startdate: "",
    startDayOfWeek: "",
  });
  const [endday, setEndday] = useState({ enddate: "", endDayOfWeek: "" });
  const [maxday, setMaxday] = useState(exportMaxDate);

  /*  
  input[type="date"] > min 속성값을 지정해주기 위함
  캘린더에서 오늘날짜부터 선택가능하게 만들기위하여 new Date()로 오늘 날짜를 받아오고 input 태그에 min을 적용하기위해 string 형식으로 작성해주어야함

  그러기 위해서 new date로 받은 날짜를 yyyy-mm-dd 형식으로 변경하여 적용해야하기때문에
  new Date()에  toISOString() 내장함수를 사용 해줌
  toISOString() 메서드는 단순화한 확장 ISO 형식(ISO 8601)의 문자열을 반환합니다. 반환값은 언제나 24글자 또는 27글자(각각 YYYY-MM-DDTHH:mm:ss.sssZ 또는 ±YYYYYY-MM-DDTHH:mm:ss.sssZ)입니다.

  new Date() 반환값은  : Fri Dec 29 2023 12:07:39 GMT+0900 (한국 표준시)
  반환값에 toISOString()을 적용하면 : 2023-12-29T03:08:05.574Z

  toISOString()을 적용한 값을 split()를 사용하여 특정 문자기준으로 분리 
  우리는 날짜만 필요하기때문에 날짜와 시간을 경계하는 T를 기준으로 구분함
  2023-12-29 / T / 03:08:05.574Z > 반환값에 [0]번째인 2023-12-29 를 원하기때문에 

  최종적으로 currentDate.toISOString().split("T")[0]; 작성하게되면 2023-12-29를 반환
  이를 setToday 적용

  input[type="date"] > max 속성값을 지정해주기 위함

    const day = new Date(startday);
    선택한 날짜의 string value를 가져와 날짜형식으로 포멧하고
    
    day.setDate(day.getDate() + 7);
    해당 날짜를 셋팅해준다 , date=일을 7일 뒤인 날짜로 셋해줌

    const afterday = day.toISOString().split("T")[0];
    셋 한 날짜를 출력하면 Fri Jan 05 2024 12:44:54 GMT+0900 (한국 표준시) 해당형식으로 나오기때문에 위에서와같이 toISOString,split을 사용하여
    yyyy-mm-dd 형식으로 출력
  
  */

  const givetripdate = () => {
    getTripDate({
      start: {
        startDate: startday.startdate,
        startDayOfWeek: startday.startDayOfWeek,
      },
      end: {
        endDate: endday.enddate,
        endDayOfWeek: endday.endDayOfWeek,
      },
    });
  };
  const checkDate = (event) => {
    const selectday = event.target.value;
    const dateObject = new Date(selectday).getDay();

    //선택한 날짜를 startday로 지정
    console.log(selectday);
    console.log(event.target.id);
    if (event.target.id === "tripstart") {
      setStartday({
        startdate: selectday,
        startDayOfWeek: KoreanDayOfWeek[dateObject],
      });
    } else {
      setEndday({
        enddate: selectday,
        endDayOfWeek: KoreanDayOfWeek[dateObject],
      });
    }

    if (selectday) {
      const setMax = new Date(selectday);
      console.log(setMax);
      setMax.setDate(setMax.getDate() + 5);
      const newMaxday = setMax.toISOString().split("T")[0];
      console.log("newMaxDay= " + newMaxday);
      setMaxday(newMaxday);
    }
    if (startday.startdate < endday.enddate) {
      setEndday({ enddate: "", endDayOfWeek: "" });
    }
  };

  return (
    <DateContainer style={{ paddingTop: "40px" }}>
      <TripSelectDay>
        <div>
          <span>출발</span>
          <input
            type="date"
            id="tripstart"
            data-placeholder="시작일"
            value={startday.startdate}
            onChange={checkDate}
            min={today}
            max={maxday}
          />
        </div>
        <div>
          <span>도착</span>
          <input
            type="date"
            id="tripend"
            data-placeholder="종료일"
            value={endday.enddate}
            onChange={checkDate}
            min={startday.startdate}
            max={maxday}
          />
        </div>
      </TripSelectDay>
      <TripHour>
        <p>여행시간 설정</p>
        <p>총 120시간 00분</p>
      </TripHour>

      <Triptime>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore quam
          quia dignissimos molestiae obcaecati! Obcaecati accusantium ipsum
          perspiciatis sit labore minus similique, velit laudantium assumenda,
          voluptatibus illum quidem delectus placeat.
        </p>
        <table>
          <thead>
            <tr>
              <th>일자</th>
              <th>요일</th>
              <th>시작시간</th>
              <th>종료시간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                {startday.startdate === ""
                  ? null
                  : startday.startdate.split("-")[1] +
                    "/" +
                    startday.startdate.split("-")[2]}
              </th>
              <td>{startday.startDayOfWeek}</td>
              <td>
                <input type="time" name="" id="" />
              </td>
              <td>
                <input type="time" name="" id="" />
              </td>
            </tr>
            <tr>
              <th>
                {endday.enddate === ""
                  ? null
                  : endday.enddate.split("-")[1] +
                    "/" +
                    endday.enddate.split("-")[2]}
              </th>
              <td>{endday.endDayOfWeek}</td>
              <td>
                <input type="time" name="" id="" />
              </td>
              <td>
                <input type="time" name="" id="" />
              </td>
            </tr>
          </tbody>
        </table>
        <DateButton onClick={givetripdate}>시간 설정 완료</DateButton>
      </Triptime>
    </DateContainer>
  );
}

export default TripDate;
