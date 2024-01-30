import { Link } from "react-router-dom";
import "./css/header.css";
import { useState } from "react";
import { auth } from "../../firebase";

export default function Header() {
  const user = auth.currentUser;

  console.log(user);

  return (
    <div className="header_container one">
      <div className="header_items">
        <img src={"/img/logo2.png"} alt="" className="icon" />
      </div>
      <div className="header_items two">
        {user ? (
          <Link to="/mypage" className="Link">
            마이페이지
          </Link>
        ) : (
          <Link to="/login" className="Link">
            로그인
          </Link>
        )}
      </div>
    </div>
  );
}
