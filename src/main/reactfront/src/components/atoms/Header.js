import { Link } from "react-router-dom";
import "./css/header.css";

export default function Header() {
  return (
    <div className="header_container one">
      <div className="header_items">
        <img src={"/img/CHlogo.png"} alt="" className="icon" />
      </div>
      <div className="header_items two">
        <Link to="/mypage" className="Link">
          마이페이지
        </Link>
      </div>
    </div>
  );
}
