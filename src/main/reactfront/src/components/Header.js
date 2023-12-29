import { Link } from "react-router-dom";
import "../css/header.css";
import img from "../img/CHlogo.png";

function Header() {
  return (
    <div className="header_container one">
      <div className="header_items">
        <img src={img} alt="" className="icon" />
      </div>
      <div className="header_items two">
        <Link to="/info" className="Link ">
          이용방법
        </Link>
      </div>
    </div>
  );
}

export default Header;
