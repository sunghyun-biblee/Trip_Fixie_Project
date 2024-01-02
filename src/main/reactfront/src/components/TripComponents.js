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
export const Button = styled.button``;
