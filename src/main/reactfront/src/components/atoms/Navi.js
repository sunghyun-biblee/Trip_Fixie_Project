import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import LoginForm from "./LoginForm";
import "./css/Navi.css";
import { ModalBox, ModalContainer, signOut } from "./LootSection";
import { auth } from "../../firebase";

const StyleLink = styled(Link)`
  color: gray;
  padding: 28px 8px;
  text-decoration: none;
  font-size: 1.5rem;
`;
const Span = styled.span`
  color: gray;
  padding: 28px 8px;
  text-decoration: none;
  cursor: pointer;
  font-size: 1.5rem;
`;
const NavUl = styled.ul`
  display: flex;
`;
const NavDiv = styled.div``;
const MypageList = styled.div``;
function Navi() {
  const user = auth.currentUser;
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();

  const onClicks = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div className="nav_container">
        <div>
          <div className="logo"></div>

          <NavUl>
            <StyleLink to="/notfound">여행지</StyleLink>
            <StyleLink to="/notfound">고객지원</StyleLink>
            <StyleLink to="/notfound">이용방법</StyleLink>
            {user === null ? (
              <Span onClick={onClicks}>로그인</Span>
            ) : (
              <>
                <StyleLink to="/mypage">마이페이지</StyleLink>
                <StyleLink onClick={signOut}>로그아웃</StyleLink>
              </>
            )}
          </NavUl>
        </div>
      </div>
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

export default Navi;
