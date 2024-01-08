import { Link } from "react-router-dom";
import "./css/header.css";

export default function Header() {
  return (
    <div className="header_container one">
      <div className="header_items">
        <img src={"/img/CHlogo.png"} alt="" className="icon" />
      </div>
      <div className="header_items two">
        <Link to="/how" className="Link">
          이용방법
        </Link>
      </div>
    </div>
  );
}
