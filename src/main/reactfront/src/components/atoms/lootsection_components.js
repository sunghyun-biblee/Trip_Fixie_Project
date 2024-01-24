import styled from "styled-components";
import { MainImg } from "./LootSection";
import { FontSizeLg } from "../Trip/trip_save_components";

export const LootExampleBox = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 1rem;
`;
const ExampleLeft = styled.div`
  padding: 1rem;
`;
const ExampleRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ExampleImg = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
`;
const ExampleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #f2fdff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 2rem;
  opacity: 0;
  transform: translateY(10%);
  transition: all 0.7s;
`;
export const ExampleOne = () => {
  return (
    <ExampleWrapper>
      <ExampleLeft>
        <FontSizeLg>
          Part 1<br /> 날짜와 여행지 선택하기
        </FontSizeLg>
        <span>여행일정 날짜와 여행가고싶은 지역을 선택하세요!</span>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/img/bell.png"
            alt=""
            style={{ width: "30px", height: "30px" }}
          />
          <p>일기예보 서비스는 접속일로부터 최대 5일까지 지원해드립니다</p>
        </div>
      </ExampleLeft>
      <ExampleRight>
        <ExampleImg
          src="/img/loot/example1.png"
          alt=""
          style={{ marginRight: "5rem" }}
        />
      </ExampleRight>
    </ExampleWrapper>
  );
};
export const ExampleTwo = () => {
  return (
    <ExampleWrapper
      style={{
        padding: "3rem",
      }}
    >
      <ExampleLeft>
        <FontSizeLg>
          Part 2<br /> 관광지와 축제 선택하기
        </FontSizeLg>

        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/img/bell.png"
            alt=""
            style={{ width: "30px", height: "30px" }}
          />
          <p>
            날씨정보가 지원되는 날짜일 경우 날씨정보를 참고하여, 쾌적한
            여행계획을 세워보세요!
          </p>
        </div>
      </ExampleLeft>
      <ExampleRight>
        {" "}
        <ExampleImg src="/img/loot/example2.png" alt="" />
      </ExampleRight>
    </ExampleWrapper>
  );
};
export const ExampleThree = () => {
  return (
    <ExampleWrapper
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <ExampleLeft>
        <FontSizeLg>
          Part 3<br /> 숙소 선택하기
        </FontSizeLg>
        <span>여행 일정에 숙소가 필요하다면 추가하세요!</span>
        <p>여행지역의 숙소 정보를 지원해드립니다</p>
      </ExampleLeft>
      <ExampleRight>
        {" "}
        <ExampleImg src="/img/loot/example3.png" alt="" />
      </ExampleRight>
    </ExampleWrapper>
  );
};
export const ExampleFour = () => {
  return (
    <ExampleWrapper
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <ExampleLeft>
        <FontSizeLg>
          Part 4<br /> 저장 목록 확인하기!
        </FontSizeLg>
        <p>지금까지 추가한 일정들을 한눈에 확인하고, 수정하실 수 있습니다 !</p>
        <p>메모가 필요하시다면 메모칸에 예시와 같이 작성하실 수 있어요 !</p>
        <p>여행계획을 저장하고 싶으시다면 여행계획의 별명을 지어주세요 !</p>
      </ExampleLeft>
      <ExampleRight>
        {" "}
        <ExampleImg src="/img/loot/example4.png" alt="" />
      </ExampleRight>
    </ExampleWrapper>
  );
};
export const ExampleFive = () => {
  return (
    <ExampleWrapper
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <ExampleLeft>
        <FontSizeLg>
          Part 5<br /> 저장된 나의 계획을 확인하기
        </FontSizeLg>
        <p>지금까지 저장된 계획을 마이페이지에서 확인하실 수 있습니다</p>
      </ExampleLeft>
      <ExampleRight>
        {" "}
        <ExampleImg src="/img/loot/example5.png" alt="" />
      </ExampleRight>
    </ExampleWrapper>
  );
};
