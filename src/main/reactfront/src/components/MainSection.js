import React, { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import "../css/MainSection.css";
import LoginForm from "./LoginForm";
import { auth } from "../firebase";


function MainSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();
  const navigate = useNavigate();
  const onClicks = () => {
      //navigate("/trip");

      const user = auth.currentUser;
      console.log(user);
      if(user == null){
        setModalOpen(true);
      }else {
        navigate("/trip");
      }
      //console.log(modalOpen);
    };
    const signOut = ()=>{
      auth.signOut();
    };
  return (
    <>
    <div className="MainSection_container">
      <div className="main_box">
        <div className="left_box">
          <h1>
            기존에 경험하지 못한 <br /> 새로운 플래너
          </h1>
          <span>
            고민만 하던 여행 계획을 <b>여행요정</b>을 통해 몇분만에 스케줄링
            해보세요
          </span>
            <button className="main_btn" onClick={onClicks}>
              여행시작 하기
            </button>
            <button onClick={signOut}>로그아웃</button>
        </div>
        <div>
          <img
            className="main_img"
            src="https://www.kagoshima-kankou.com/storage/tourism_themes/12/responsive_images/ElwnvZ2u5uZda7Pjcwlk4mMtr08kLNydT8zXA6Ie__1673_1115.jpeg"
            alt=""
          />
        </div>
      </div>
    </div>
    {
      modalOpen ?
      <div className={'modal_container'} ref={modalBackground} onClick={e => {
        if (e.target === modalBackground.current) {
          setModalOpen(false);
        }
      }}>
        <div className={'modal_box'}>
        <LoginForm closeModal={() => setModalOpen(false)}></LoginForm>
        </div>
      </div>
      : null
    }
    </>
  );
}

export default MainSection;
