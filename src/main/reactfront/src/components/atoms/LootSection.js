import React, {
  /*useEffect,*/ Children,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import { auth } from "../../firebase";
import styled from "styled-components";
import {
  LootExampleBox,
  ExampleOne,
  ExampleTwo,
  ExampleThree,
  ExampleFour,
  ExampleFive,
} from "./lootsection_components";
import "../../fonts/font.css";
const LootSectionContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
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
  font-family: "NotoSans";
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
export const MainImg = styled.img`
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
  const [isBottom, setIsBottom] = useState(false);
  const onClicks = () => {
    navigate("/trip");
  };
  useEffect(() => {
    let observer = new IntersectionObserver(
      (e) => {
        e.forEach((item) => {
          if (item.isIntersecting) {
            item.target.style.opacity = 1;
            item.target.style.transform = "translateY(0)";
          } else {
            item.target.style.opacity = 0;
            item.target.style.transform = "translateY(-10%)";
          }
        });
      },
      { threshold: 0.4 }
    );
    const box = document.querySelectorAll(".example");
    // 클래스가 example인 태그들을 배열로 선언한뒤
    // 해당 배열안에 있는 요소들의 자식태그를 childeren변수에 저장하고,
    // children안에있는 태그들을 observe 함수의 매개변수로 전달
    // 이후 observe 매개변수로 전달된 자식태그들이 화면에 감지될때마다 함수를 실행
    box.forEach((item) => {
      const children = Array.from(item.children);
      console.log(children);
      children.forEach((child) => {
        console.log(child);
        observer.observe(child);
      });
    });

    return () => {
      box.forEach((item) => {
        const children = Array.from(item.children);
        children.forEach((child) => {
          observer.unobserve(child);
        });
      });
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      // 스크롤이 맨 아래에 도달했는지 여부를 확인
      const atBottom = scrollHeight - scrollTop === clientHeight;

      // 맨 아래에 도달했으면 isAtBottom 상태를 true로 설정
      if (atBottom) {
        setIsBottom(true);
      } else {
        // 맨 아래에 도달하지 않았으면 isAtBottom 상태를 false로 설정
        setIsBottom(false);
      }
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 해제
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
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
        <LootExampleBox className="example 1" style={{ height: "90vh" }}>
          <ExampleOne></ExampleOne>
        </LootExampleBox>
        <LootExampleBox className="example 2">
          <ExampleTwo></ExampleTwo>
        </LootExampleBox>
        <LootExampleBox className="example 3">
          <ExampleThree></ExampleThree>
        </LootExampleBox>
        <LootExampleBox className="example 4">
          <ExampleFour></ExampleFour>
        </LootExampleBox>
        <LootExampleBox className="example 5">
          <ExampleFive></ExampleFive>
        </LootExampleBox>
        <div></div>
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
