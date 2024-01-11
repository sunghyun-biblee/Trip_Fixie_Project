import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { TourLoadingWrapper } from "./TourSpot";
import { useEffect, useRef, useState } from "react";
import { Loading } from "./atoms/Loading";

const ModeWrapper = styled.div`
  display: flex;
  padding: 2rem;
  justify-content: center;
`;
const TourModeName = styled.div`
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModeName = styled.button`
  width: 70%;
  text-align: center;
  font-size: 2rem;
  padding: 1rem;
  font-weight: 900;
  border: none;
  border-bottom: 2px solid black;
  background-color: white;
  outline: none;
  cursor: pointer;
  &.onSelect {
    color: #5ea3ec;

    border-bottom: 4px solid #5ea3ec;
    transition: color, border-bottom 0.3s;
  }
`;

export const SelectTourMode = ({ viewTour, viewFestival, tourMode }) => {
  return (
    <ModeWrapper>
      <TourModeName onClick={viewTour}>
        <ModeName
          className={tourMode === "tour" && "onSelect"}
          disabled={tourMode === "tour"}
        >
          관광지
        </ModeName>
      </TourModeName>
      <TourModeName onClick={viewFestival}>
        <ModeName
          className={tourMode === "festivals" && "onSelect"}
          disabled={tourMode === "festivals"}
        >
          축제
        </ModeName>
      </TourModeName>
    </ModeWrapper>
  );
};

const TourSpotIMG = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  margin: 0 15px;
`;
const TourWrapper = styled.div`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px; /* 스크롤바의 너비 */
  }
  &::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: #5ea3ec; /* 스크롤바의 색상 */
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;

    background: rgba(33, 122, 244, 0.1); /*스크롤바 뒷 배경 색상*/
  }
`;
const TourSpotContainer = styled.div`
  padding: 1rem;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  &.off {
    opacity: 0;
  }
`;
const TourSpotBox = styled.div`
  padding: 1rem;
`;
const TourSpotLi = styled.div`
  display: flex;
  height: 160px;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;
const TourSpotItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 330px 100px;
`;
const TourSpotItem = styled.div`
  padding: 0 1rem 0 0.5rem;
  display: flex;
  flex-direction: column;

  p {
    font-size: 1.7rem;
  }
`;
const TourTitle = styled.p`
  font-weight: 900;
  padding-bottom: 1rem;
`;
const TourAddr = styled.p`
  padding-top: 0.5rem;
`;
const TButton = styled.button`
  background-color: #52c2f2;
  width: 80px;
  color: white;
  padding: 1rem;
  border-radius: 10px;
  font-size: 1.3rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;
export const TourSpotList = ({
  tourList,
  addList,
  setListpage,
  isMainLoading,
}) => {
  const scrollBoxRef = useRef();
  const handleScroll = () => {
    const scrollBox = scrollBoxRef.current;

    // console.log(scrollBox);
    // console.log("height: " + scrollBox.scrollHeight);
    /*
     scrollHeight는 스크롤박스 요소의 전체 높이를 나타냅니다.
     보이지 않는 콘텐츠까지 포함한 요소의 전체 높이를 말합니다.
     일반적으로, scrollHeight 값은 offsetHeight보다 크거나 같습니다. 만약 콘텐츠가 스크롤되지 않는 경우에는 둘의 값이 같을 수 있습니다.
     */
    // console.log("Top: " + scrollBox.scrollTop);
    /*
     scrollTop은 스크롤된 컨테이너의 상단에서 현재 보이는 부분의 상단까지의 픽셀 수를 나타냅니다.
     즉, 사용자가 스크롤을 얼마나 내렸는지를 나타냅니다.
     scrollTop 값은 0부터 시작하여 컨테이너의 맨 위에 도달하면 증가하게 됩니다. */
    // console.log("innerHeight: " + scrollBox.offsetHeight);
    /*
     offsetHeight는 요소의 높이를 픽셀 단위로 나타내는 속성입니다. 이 속성은 요소의 총 높이를 반환하며, 여기에는 요소의 높이, 패딩(Padding), 그리고 위아래 테두리(Border)가 포함됩니다. 하지만, 마진(Margin)은 포함되지 않습니다.
     
     즉, scrollheight은 overflow된 범위의 크기,길이까지 포함하고있고,
      offsetHeight은 눈에보이는 영역의 크기,길이를 뜻합니다
     */

    if (
      scrollBox.offsetHeight + scrollBox.scrollTop + 1 >=
      scrollBox.scrollHeight
    ) {
      setListpage((prev) => prev + 1);

      //scrollBox.offsetHeight + scrollBox.scrollTop + 1 값이 scrollBox.scrollHeight 값과 크거나 같으면 스크롤 박스가 맨 아래에 도달한 것으로 간주합니다

      /*
      이전 상태 값을 안전하게 참조하기 위한 것입니다. listpage+1로 직접 값을 계산하는 경우, 비동기적인 업데이트에서 예상치 못한 결과가 발생할 수 있습니다.
      */
    }
    /* 
     +1 한 이유는 일부 브라우저에서는 scrollBox.offsetHeight + scrollBox.scrollTop 합계가
     scrollBox.scrollHeight 높이와 같지 않기 때문입니다.
     스크롤 내부의 박스의 길이와 , 스크롤박스의 TOP길이 +1 한 값이
     */
  };
  useEffect(() => {
    const scrollBox = scrollBoxRef.current;
    if (scrollBox) {
      scrollBox.addEventListener("scroll", handleScroll);

      return () => {
        // 컴포넌트가 언마운트될 때 이벤트 리스너 정리
        scrollBox.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <TourSpotContainer className={isMainLoading ? "off" : null}>
      <TourWrapper ref={scrollBoxRef}>
        {tourList.length === 0 ? (
          <TourLoadingWrapper className="ABC">
            <div style={{ fontSize: "3rem" }}>
              등록된 광광지가 없습니다 ㅠㅠ
            </div>
          </TourLoadingWrapper>
        ) : (
          tourList.map((tour, index) => (
            <TourSpotBox key={index}>
              <TourSpotLi>
                {tour.cfirstimage ? (
                  <TourSpotIMG src={tour.cfirstimage} alt="" />
                ) : (
                  <TourSpotIMG src="/img/TourSpot_No_IMG.svg" alt="" />
                )}
                <TourSpotItemWrapper>
                  <TourSpotItem>
                    <TourTitle>{tour.ctitle}</TourTitle>
                    <TourAddr>
                      {tour.caddr1}
                      {tour.caddr2 ? ` ${tour.caddr2}` : null}
                    </TourAddr>
                  </TourSpotItem>
                  <TourSpotItem>
                    <TButton onClick={() => addList(index)}>추가</TButton>
                    <TButton style={{ marginTop: "5px" }}>상세정보 </TButton>
                  </TourSpotItem>
                </TourSpotItemWrapper>
              </TourSpotLi>
            </TourSpotBox>
          ))
        )}
      </TourWrapper>
    </TourSpotContainer>
  );
};
export const FestivalSpotList = ({
  festivalList,
  addList,
  setListpage,
  isMainLoading,
}) => {
  const scrollBoxRef = useRef();
  const handleScroll = () => {
    const scrollBox = scrollBoxRef.current;
    // console.log("height: " + scrollBox.scrollHeight);
    // console.log("Top: " + scrollBox.scrollTop);
    // console.log("innerHeight: " + scrollBox.offsetHeight);

    if (
      scrollBox.offsetHeight + scrollBox.scrollTop + 1 >=
      scrollBox.scrollHeight
    ) {
      setListpage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    const scrollBox = scrollBoxRef.current;
    if (scrollBox) {
      scrollBox.addEventListener("scroll", handleScroll);

      return () => {
        // 컴포넌트가 언마운트될 때 이벤트 리스너 정리
        scrollBox.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  return (
    <TourSpotContainer className={isMainLoading ? "off" : null}>
      <TourWrapper ref={scrollBoxRef}>
        {festivalList.length === 0 ? (
          <TourLoadingWrapper className="ABC">
            <div style={{ fontSize: "3rem" }}>등록된 행사가 없습니다 ㅠㅠ</div>
          </TourLoadingWrapper>
        ) : (
          festivalList.map((festival, index) => (
            <TourSpotBox key={index}>
              <TourSpotLi>
                {festival.cfirstimage ? (
                  <TourSpotIMG src={festival.cfirstimage} alt="" />
                ) : (
                  <TourSpotIMG src="/img/TourSpot_No_IMG.svg" alt="" />
                )}
                <TourSpotItemWrapper>
                  <TourSpotItem>
                    <TourTitle>{festival.ctitle}</TourTitle>
                    <TourAddr>
                      {festival.caddr1}
                      {festival.caddr2 ? ` ${festival.caddr2}` : null}
                    </TourAddr>
                  </TourSpotItem>
                  <TourSpotItem>
                    <TButton onClick={() => addList(index)}>추가</TButton>
                    <TButton style={{ marginTop: "5px" }}>상세정보 </TButton>
                  </TourSpotItem>
                </TourSpotItemWrapper>
              </TourSpotLi>
            </TourSpotBox>
          ))
        )}
      </TourWrapper>
    </TourSpotContainer>
  );
};
