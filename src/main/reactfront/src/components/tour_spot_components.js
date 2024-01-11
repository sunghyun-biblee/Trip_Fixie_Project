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

  isMainLoading,

  selectedAreaName,
}) => {
  const scrollBoxRef = useRef();
  const [list, setList] = useState(1);
  const [max, setMax] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [currtourList, setCurrTourList] = useState([...tourList]);
  const handleScroll = () => {
    const scrollBox = scrollBoxRef.current;
    if (
      scrollBox.offsetHeight + scrollBox.scrollTop + 1 >=
      scrollBox.scrollHeight
    ) {
      setList((prev) => prev + 1);
    }
  };
  useEffect(() => {
    const scrollBox = scrollBoxRef.current;
    if (scrollBox) {
      scrollBox.addEventListener("scroll", handleScroll);
      return () => {
        scrollBox.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      if (max < list) {
        return;
      }
      setIsLoading(true);

      // 여기에 데이터를 가져오는 비동기 로직 추가
      try {
        const response = await fetch(
          `http://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=cHlc2k2XcgjG10dgBDyoxMaS6KxKLHiHN4xtTP6q86EBe%2BUO09zOLEg6ZTpX9TWrdJPSJcFQYCZ%2B6fqhkD2ZVA%3D%3D&numOfRows=5&pageNo=${list}&MobileOS=ETC&MobileApp=APPTest&areaCode=${selectedAreaName.mainAreaCode}&sigunguCode=${selectedAreaName.subAreaCode}&contentTypeId=12&_type=json`
        );
        const data = await response.json();
        console.log("이렇게도 되나요?");
        console.log(data);
        // 데이터 처리 로직 추가
        const tourData = data.response.body.items.item;
        const totalcount = data.response.body.totalCount;
        setMax(Math.ceil(totalcount / 5));
        const tours = tourData.map((td) => ({
          contentid: td.contentid,
          ctitle: td.title,
          caddr1: td.addr1,
          caddr2: td.addr2,
          cfirstimage: td.firstimage,
          csecondimage: td.firstimage2,
          clatitude: td.mapy,
          clongitude: td.mapx,
        }));
        setCurrTourList((prev) => [...prev, ...tours]);
        setIsLoading(false);
      } catch (error) {
        console.error("Fetch Error:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [list]);
  console.log(currtourList);
  return (
    <TourSpotContainer className={isMainLoading ? "off" : null}>
      <TourWrapper ref={scrollBoxRef}>
        {currtourList.length === 0 ? (
          <TourLoadingWrapper className="ABC">
            <div style={{ fontSize: "3rem" }}>
              등록된 광광지가 없습니다 ㅠㅠ
            </div>
          </TourLoadingWrapper>
        ) : (
          currtourList.map((tour, index) => (
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
        {isLoading ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading></Loading>
          </div>
        ) : null}
      </TourWrapper>
    </TourSpotContainer>
  );
};
export const FestivalSpotList = ({
  festivalList,
  addList,
  isMainLoading,

  selectedAreaName,
  dateinfo,
}) => {
  const scrollBoxRef = useRef();
  const [list, setList] = useState(1);
  const [max, setMax] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [currtourList, setCurrTourList] = useState([...festivalList]);

  const handleScroll = () => {
    const scrollBox = scrollBoxRef.current;
    if (
      scrollBox.offsetHeight + scrollBox.scrollTop + 1 >=
      scrollBox.scrollHeight
    ) {
      setList((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const scrollBox = scrollBoxRef.current;
    if (scrollBox) {
      scrollBox.addEventListener("scroll", handleScroll);
      return () => {
        scrollBox.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (max < list) {
        return;
      }
      setIsLoading(true);
      console.log(list);
      // 여기에 데이터를 가져오는 비동기 로직 추가
      try {
        const response = await fetch(
          `http://apis.data.go.kr/B551011/KorService1/searchFestival1?serviceKey=cHlc2k2XcgjG10dgBDyoxMaS6KxKLHiHN4xtTP6q86EBe%2BUO09zOLEg6ZTpX9TWrdJPSJcFQYCZ%2B6fqhkD2ZVA%3D%3D&numOfRows=5&pageNo=${list}&MobileOS=ETC&MobileApp=APPTest&_type=json&eventStartDate=${dateinfo.startDay}&areaCode=${selectedAreaName.mainAreaCode}`
        );
        const data = await response.json();
        console.log("행사결과");
        console.log(data);
        // 데이터 처리 로직 추가
        const festivalData = data.response.body.items.item;
        const totalcount = data.response.body.totalCount;

        setMax(Math.ceil(totalcount / 5));
        const festivals = festivalData.map((fd) => ({
          contentid: fd.contentid,
          ctitle: fd.title,
          caddr1: fd.addr1,
          caddr2: fd.addr2,
          cfirstimage: fd.firstimage,
          csecondimage: fd.firstimage2,
          clatitude: fd.mapy,
          clongitude: fd.mapx,
          ceventstartdate: fd.eventstartdate,
          ceventenddate: fd.eventenddate,
          ctel: fd.tel,
        }));
        setCurrTourList((prev) => [...prev, ...festivals]);
        setIsLoading(false);
      } catch (error) {
        console.error("Fetch Error:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [list]);
  console.log("max:" + max);
  console.log("list:" + list);
  console.log(currtourList);
  return (
    <TourSpotContainer className={isMainLoading ? "off" : null}>
      <TourWrapper ref={scrollBoxRef}>
        {currtourList.length === 0 ? (
          <TourLoadingWrapper className="ABC">
            <div style={{ fontSize: "3rem" }}>등록된 행사가 없습니다 ㅠㅠ</div>
          </TourLoadingWrapper>
        ) : (
          currtourList.map((festival, index) => (
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
        {isLoading ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading></Loading>
          </div>
        ) : null}
      </TourWrapper>
    </TourSpotContainer>
  );
};
