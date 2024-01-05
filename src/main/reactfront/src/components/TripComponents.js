import styled from "styled-components";
import { Link } from "react-router-dom";
import "../css/header.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
export const MainContainer = styled.div`
  max-width: 500px;
  padding: 7.5rem 2rem;
`;
export const DateBox = styled.div`
  padding: 1rem;
  p {
    font-size: 2rem;
  }
  .date__info {
    padding: 1rem;
    font-size: 1.6rem;
    letter-spacing: 0.03rem;
    b {
      color: #3181c7;
      font-size: 1.6rem;
      font-weight: 900;
    }
  }
`;

export const GuidTitle = styled.h1`
  padding: 1rem;
  font-size: 2.5rem;
  color: gray;
`;
export const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid gray;
  border-radius: 10px;
`;
export const TripWrapper = styled.div`
  display: flex;
  height: 100vh;
`;
export const Tripbox = styled.div`
  padding: 1rem;
`;
export const Tripinfo = styled.div`
  font-size: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const CustomDatePicker = styled(DatePicker)`
  font-size: 20px;
`;
export const Button = styled.button``;
export function Header() {
  return (
    <div className="header_container one">
      <div className="header_items">
        <img src={"/img/CHlogo.png"} alt="" className="icon" />
      </div>
      <div className="header_items two">
        <Link to="/info" className="Link ">
          이용방법
        </Link>
      </div>
    </div>
  );
}
const Li = styled.li`
  text-align: center;
  padding: 10px 0;
  color: darkcyan;
  border: 1px solid #27d7ea;
  border-radius: 5px;
  background-color: #cbf0f4;
  cursor: pointer;
`;
export function SelectArea() {
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
  const test = (event) => {
    console.log(event.target.textContent);
    console.log(event.target.value);
  };

  return (
    <ul
      name="areacode"
      id="lang"
      style={{
        display: "grid",
        listStyle: "none",
        gridTemplateColumns: `repeat(4,90px)`,
        padding: "10px 0 0 0",
        gap: "4px",
      }}
    >
      {cities.map((city) => (
        <Li key={city.value} value={city.value} onClick={test}>
          {city.name}
        </Li>
      ))}
    </ul>
  );
}
export function ModeControll() {
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
  const [slidemode, setSlidemode] = useState(false); // 서브창 확장, 축소
  const handleSlidemode = () => {
    setSlidemode((mode) => !mode);
  };
  return (
    <ModeController onClick={handleSlidemode}>
      {slidemode ? (
        <img src="/img/Left.svg" style={{ width: "30px", height: "30px" }} />
      ) : (
        <img src="/img/Right.svg" style={{ width: "30px", height: "30px" }} />
      )}
    </ModeController>
  );
}
