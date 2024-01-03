import styled from "styled-components";
import { Link } from "react-router-dom";
import "../css/header.css";

export const TripWrapper = styled.div`
  display: flex;
  height: 100vh;
`;
export const Tripbox = styled.div`
  padding: 20px;
  position: relative;
`;
export const Tripinfo = styled.div`
  font-size: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
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
