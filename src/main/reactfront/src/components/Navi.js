import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import LoginForm from "./LoginForm";
import "../css/Navi.css";

const StyleLink = styled(Link)`
  color: gray;
  padding: 28px 8px;
  text-decoration: none;
`;
const Span = styled.span`
  color: gray;
  padding: 28px 8px;
  text-decoration: none;
  cursor: pointer;
`;
function Navi() {
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();

  const onClicks = () => {
    //navigate("/trip");
    setModalOpen(true);
  };

  return (
    <>
      <div className="nav_container">
        <div>
          <div className="logo"></div>

          <div className="nav">
            <StyleLink to="/notfound">여행지</StyleLink>
            <StyleLink to="/notfound">고객지원</StyleLink>
            <StyleLink to="/notfound">이용방법</StyleLink>
            <Span onClick={onClicks}>로그인</Span>
          </div>
        </div>
      </div>
      {modalOpen ? (
        <div
          className={"modal_container"}
          ref={modalBackground}
          onClick={(e) => {
            if (e.target === modalBackground.current) {
              setModalOpen(false);
            }
          }}
        >
          <div className={"modal_box"}>
            <LoginForm closeModal={() => setModalOpen(false)}></LoginForm>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Navi;
