import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { TourLoadingWrapper } from "./TourSpot";
import { useEffect, useState } from "react";

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
  margin-bottom: 10px;
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
export const TourSpotList = ({ tourList, addList, handleDeleteList, saveTourList }) => {
  const [isArray, setIsArray] = useState([]);

  useEffect(()=>{
    setIsArray([]);
    const newIsArrays = saveTourList.map((list)=>(
      list.contentid
    ));
    setIsArray(newIsArrays);
  },[saveTourList])  

  return (
    <TourSpotContainer>
      <TourWrapper>
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
                    {isArray.includes(tour.contentid) ? 
                      <TButton style={{backgroundColor: "red"}} onClick={() => {handleDeleteList(tour.contentid);}}>삭제</TButton>
                      : <TButton onClick={() => {addList(index);}}>추가</TButton>
                    }
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
export const FestivalSpotList = ({ festivalList, addList, handleDeleteList, saveTourList }) => {
 const [isArray, setIsArray] = useState([]);

  useEffect(()=>{
    setIsArray([]);
    const newIsArrays = saveTourList.map((list)=>(
      list.contentid
    ));
    setIsArray(newIsArrays);
  },[saveTourList])  
  
  return (
    <TourSpotContainer>
      <TourWrapper>
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
                    {isArray.includes(festival.contentid) ? 
                      <TButton style={{backgroundColor: "red"}} onClick={() => {handleDeleteList(festival.contentid);}}>삭제</TButton>
                      : <TButton onClick={() => {addList(index);}}>추가</TButton>
                    }
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
// && festivalList.length < 1
// isLoading ? (
//   <TourLoadingWrapper className="ABC">
//     <Loading />
//   </TourLoadingWrapper>
// ) : (
//   <FestivalSpotList
//     festivalList={festivalList}
//     addList={addList}
//   ></FestivalSpotList>
// )
// ) : null}
