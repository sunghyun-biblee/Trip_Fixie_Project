import styled from "styled-components";
import { MainImg } from "./LootSection";
import {
  FontSizeLg,
  FontSizemd,
  FontSizesm,
} from "../Trip/trip_save_components";

export const LootExampleBox = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 1rem;
  font-family: "NanumSquare";
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
        <FontSizeLg style={{ fontWeight: "600" }}>
          Part 1<br /> 날짜와 여행지 선택하기
        </FontSizeLg>
        <div
          style={{ display: "flex", alignItems: "center", padding: "2rem 0" }}
        >
          <img
            src="/img/bell.png"
            alt=""
            style={{ width: "30px", height: "30px", marginRight: "2rem" }}
          />
          <FontSizesm style={{ padding: "2rem 0" }}>
            여행일정 날짜와 여행가고싶은 지역을 선택하세요!
          </FontSizesm>
        </div>
        <FontSizesm style={{ padding: "1rem 0" }}>
          일기예보 서비스는 접속일로부터 최대 5일까지 지원해드립니다
        </FontSizesm>
        <FontSizesm style={{ padding: "1rem 0" }}>
          접속일 기준 5일을 초과한 날씨가 있을경우, 접속일로부터 5일까지의
          날씨예보를 지원합니다
        </FontSizesm>
        <FontSizesm style={{ padding: "1rem 0" }}>
          ex{")"} 접속일이 2024년 1월 24일이고, 여행계획에 29일을 초과하는
          날짜가 포함되어 있다면 <br /> 2024년 1월 24일부터 5일까지의 날씨정보를
          제공합니다.
        </FontSizesm>
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
        <FontSizeLg style={{ fontWeight: "600", paddingBottom: "2rem" }}>
          Part 2<br /> 관광지와 축제 선택하기
        </FontSizeLg>

        <FontSizesm style={{ padding: "1rem 0", fontSize: "1.7rem" }}>
          쾌적한 여행을 위해 날씨정보를 제공해드립니다!
        </FontSizesm>
        <FontSizesm style={{ padding: "1rem 0", fontSize: "1.7rem" }}>
          여행지의 날씨를 참고하여, 여행계획을 실내 위주, 실외 외주로
          <br />
          계획할 수 있습니다
        </FontSizesm>
        <FontSizesm style={{ padding: "1rem 0", fontSize: "1.7rem" }}>
          여행지의 날씨가 눈,비 소식이 있다면{" "}
          <span style={{ color: "#EC6E4C", fontSize: "1.7rem" }}>
            실내 위주
          </span>
          로 계획!
          <br />
        </FontSizesm>
        <FontSizesm style={{ padding: "0.5rem 0", fontSize: "1.7rem" }}>
          여행지의 날씨가 맑음일 경우{" "}
          <span style={{ color: "#1D358E", fontSize: "1.7rem" }}>
            실외 위주
          </span>
          로 계획!
        </FontSizesm>
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
        <FontSizeLg style={{ fontWeight: "600", paddingBottom: "2rem" }}>
          Part 3<br /> 숙소 선택하기
        </FontSizeLg>
        <FontSizesm style={{ padding: "1rem 0" }}>
          여행 일정에 숙소가 필요하다면 추가하세요!
        </FontSizesm>
        <FontSizesm style={{ padding: "1rem 0" }}>
          여행지역의 숙소 정보를 지원해드립니다.
        </FontSizesm>
        <FontSizesm style={{ padding: "1rem 0" }}>
          해당 숙소들은{" "}
          <span style={{ color: "#EF9900", fontSize: "1.5rem" }}>
            한국관광공사
          </span>
          에 등록된 숙소정보입니다.
        </FontSizesm>
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
      <ExampleLeft style={{ width: "50%" }}>
        <FontSizeLg style={{ fontWeight: "600", paddingBottom: "3rem" }}>
          Part 4<br /> 저장 목록 확인하기!
        </FontSizeLg>
        <div style={{ paddingBottom: "2rem" }}>
          <FontSizesm style={{ fontSize: "1.7rem", padding: "0.2rem 0" }}>
            지금까지 추가한 일정들을 한눈에 확인하고, 수정하실 수 있습니다 !
          </FontSizesm>
          <FontSizesm style={{ fontSize: "1.7rem", padding: "0.2rem 0" }}>
            관광지,축제,숙소 탭을 선택하여 각{" "}
            <span style={{ color: "#00A9BF", fontSize: "1.7rem" }}>
              카테고리
            </span>
            별로 확인하실 수 있습니다
          </FontSizesm>
        </div>
        <div style={{ paddingBottom: "2rem" }}>
          <FontSizesm style={{ fontSize: "1.7rem", padding: "0.2rem 0" }}>
            <span style={{ color: "#00A9BF", fontSize: "1.7rem" }}>메모</span>가
            필요하시다면 메모칸에 예시와 같이 작성하실 수 있어요 !
          </FontSizesm>
          <FontSizesm style={{ fontSize: "1.7rem", padding: "0.2rem 0" }}>
            내가 저장한 관광지나,축제,숙소를{" "}
            <span style={{ color: "#00A9BF", fontSize: "1.7rem" }}>
              언제 몇시에 가고싶은지
            </span>{" "}
            메모할 수 있습니다
          </FontSizesm>
        </div>
        <FontSizesm style={{ fontSize: "1.7rem", padding: "0.2rem 0" }}>
          여행계획을 저장하고, 두고두고 찾아보고 싶으시다면 별명을 통해{" "}
          <span style={{ color: "#167DB7", fontSize: "1.7rem" }}>
            나만의 계획
          </span>
          을 만들어보세요!
        </FontSizesm>
      </ExampleLeft>
      <ExampleRight>
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
        <FontSizeLg style={{ fontWeight: "600" }}>
          Part 5<br /> 저장된 나의 계획을 확인하기
        </FontSizeLg>
        <FontSizemd style={{ fontWeight: "600", padding: "2rem 0" }}>
          지금까지 저장된 계획을{" "}
          <span style={{ color: "#4DCAA4", fontSize: "2.5rem" }}>
            마이페이지
          </span>{" "}
          에서 확인하실 수 있습니다
        </FontSizemd>
      </ExampleLeft>
      <ExampleRight>
        <ExampleImg src="/img/loot/example5.png" alt="" />
      </ExampleRight>
    </ExampleWrapper>
  );
};
