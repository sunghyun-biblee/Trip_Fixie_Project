import React, { /*useEffect,*/ useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import { auth } from "../../firebase";
import styled from "styled-components";

const LootSectionContainer = styled.div`
  display: flex;
  align-items: center;
`;
const LootSectionMainBox = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
`;
const LootSectionLeftBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const MainBtn = styled.button`
  width: 300px;
  height: 100px;
  border-radius: 10px;
  background-color: #4eaae7;
  color: white;
  font-size: 24px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  border: 2px solid rgba(255, 255, 255);
  cursor: pointer;

  &:hover {
    border: 2px solid #4eaae7;
  }
`;
const MainImg = styled.img`
  width: 100%;
  border-radius: 10px;
`;
export const ModalContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid black;
`;
export const ModalBox = styled.div`
  background-color: white;
  border-radius: 10px;
`;
const LootSectionRightBox = styled.div``;

export const signOut = () => {
  auth.signOut();
  window.location.reload();
};

function LootSection() {
  const user = auth.currentUser;
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();
  const navigate = useNavigate();

  const onClicks = () => {
      navigate("/trip");
  };

  return (
    <>
      <LootSectionContainer>
        <LootSectionMainBox>
          <LootSectionLeftBox>
            <h1 style={{ fontSize: "4.8rem" }}>
              기존에 경험하지 못한 <br /> 새로운 플래너
            </h1>
            <span
              style={{
                fontSize: "1.5rem",
                display: "block",
                padding: "1.5rem",
              }}
            >
              고민만 하던 여행 계획을{" "}
              <b style={{ fontSize: "1.5rem", color: "#4eaae7" }}>여행요정</b>을
              통해 몇분만에 스케줄링 해보세요
            </span>
            <div style={{ paddingTop: "2rem" }}>
              <MainBtn onClick={onClicks}>여행시작 하기</MainBtn>
            </div>
          </LootSectionLeftBox>
          <LootSectionRightBox>
            <MainImg
              src="https://www.kagoshima-kankou.com/storage/tourism_themes/12/responsive_images/ElwnvZ2u5uZda7Pjcwlk4mMtr08kLNydT8zXA6Ie__1673_1115.jpeg"
              alt=""
            />
          </LootSectionRightBox>
        </LootSectionMainBox>
      </LootSectionContainer>
      {modalOpen ? (
        <ModalContainer
          ref={modalBackground}
          onClick={(e) => {
            if (e.target === modalBackground.current) {
              setModalOpen(false);
            }
          }}
        >
          <ModalBox>
            <LoginForm closeModal={() => setModalOpen(false)}></LoginForm>
          </ModalBox>
        </ModalContainer>
      ) : null}
    </>
  );
}

export default LootSection;
