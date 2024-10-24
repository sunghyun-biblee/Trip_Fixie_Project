import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
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
  const [user, setUser] = useState();
  useEffect(() => {
    if (auth) {
      setUser(auth.currentUser);
    }
  }, [auth.currentUser]);
  const navigate = useNavigate("/login");

  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();

  const onClicks = () => {
    navigate("/login");
    setModalOpen(true);
  };

  return (
    <>
      <div className="nav_container">
        <div>
          <div className="logo"></div>

          <NavUl>
            {user === null ? (
              <StyleLink onClick={onClicks}>로그인</StyleLink>
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
