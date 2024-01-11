import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const MypageWrapper = styled.div`
  /* width: 100%; */
  height: 100vh;
  max-width: 1400px;
  /* min-width: 1200px; */
  margin: 0 auto;
`;

export const MypageContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const MypageSection = styled.div`
  height: 80%;
`;
export const MypageBox = styled.div`
  position: relative;
  padding: 0 3rem;
  width: 100%;
  height: 80%;
`;
export const UserImgBox = styled.div`
  padding-top: 4rem;
`;
export const UserIMG = styled.img`
  width: 200px;
  height: 200px;
  background-color: blue;
  object-fit: cover;
  border-radius: 50%;
`;
export const UserInfo = styled.div`
  width: 270px;
  

  display: flex;
  flex-direction: column;

  align-items: center;
  border-radius: 15px;
  border: 2px solid rgba(0, 0, 0, 0.3);
  background-color: white;
`;

export const UserInfoList = styled.ul`
  list-style: none;
  padding: 2rem 1rem;
  width: 100%;
`;
export const UserInfoItem = styled.li`
  width: 100%;
  height: 50px;
  padding: 1rem;
  p {
    font-size: 2.5rem;
  }
`;

export const UserEditBtn = styled.button`
  width: 80px;
  cursor: pointer;
  height: 40px;
  position: relative;
  bottom: -20%;
  right: -25%;
  padding: 1rem;
  border-radius: 10px;
  background-color: black;
  color: white;
  font-size: 1.3rem;
`;
export const EditInput = styled.input`
  padding: 1rem;
  font-size: 2rem;
  width: 90%;
  height: 50px;
  &:focus {
    outline: none;
  }
`;
export const MypageHeader = styled.div`
  width: 100%;

  background-color: aliceblue;
  margin: 0 auto;
  text-align: center;
  font-size: 5rem;
`;

const PlanHeaderUl = styled.ul`
  display: grid;
  grid-template-columns: 4fr 1fr 1fr;
  list-style: none;
  padding: 0;
  border: 1px solid #5e8fba;
`;
const PlanHeaderli = styled.li`
  padding: 1rem;
  font-size: 2rem;
  text-align: center;
`;

const TripPlanListWrapper = styled.div`
  width: 1000px;
  height: 100%;
  background-color: aliceblue;
`;

const PlanUl = styled.ul`
  display: grid;
  grid-template-columns: 4fr 1fr 1fr;
  list-style: none;
  padding: 0;
`;
const PlanLi = styled.li`
  padding: 1rem;
  font-size: 2rem;
  text-align: center;
  cursor: pointer;
`;
export const PlanHeader = () => {
  return (
    <div>
      <PlanHeaderUl>
        <PlanHeaderli>날짜</PlanHeaderli>
        <PlanHeaderli style={{ borderLeft: "1px solid #5e8fba" }}>
          지역
        </PlanHeaderli>
        <PlanHeaderli style={{ borderLeft: "1px solid #5e8fba" }}>
          별명
        </PlanHeaderli>
      </PlanHeaderUl>
    </div>
  );
};
export const TripPlanList = ({ data, setFavorNickname, setIsDetail, setFavorFid }) => {
  return (
    <TripPlanListWrapper>
      <PlanHeader></PlanHeader>
      {data.map((items) => (
        <TripPlanItem key={items.id} {...items}
        setFavorNickname = {setFavorNickname}
        setIsDetail = {setIsDetail}
        setFavorFid = {setFavorFid}
        ></TripPlanItem>
      ))}
    </TripPlanListWrapper>
  );
};

export const TripPlanItem = ({ startDay, endDay, nickname, area, fid, setFavorNickname, setIsDetail, setFavorFid }) => {
  return (
    <div>
      <PlanUl 
        onClick={()=>{
          setFavorNickname(nickname)
          setFavorFid(fid)
          setIsDetail(true)
        }}>
        <PlanLi>
          {startDay}~{endDay}
        </PlanLi>
        <PlanLi>{area}</PlanLi>
        <PlanLi>{nickname}</PlanLi>
      </PlanUl>
    </div>
  );
};
const PageSection = styled.div`
  position: absolute;
  bottom: 2rem;
  width: 1000px;
  display: flex;
  justify-content: center;
`;
const ButtonWrap = styled.div``;
const Button = styled.button`
  background-color: transparent;
  /* border: 1px solid rgba(0, 0, 0, 0.5); */
  border: none;
  outline: none;
  color: black;
  transition: color 0.2s;
  width: 50px;
  height: 50px;
  font-size: 2rem;
  cursor: pointer;
  &.page {
    color: red;
  }
`;

export const Pagenagtion = ({ postLimit, totalPlan, page, setPage }) => {
  const totalPages = Math.ceil(totalPlan / postLimit); // 총 게시물을 반환할 페이지의 갯수
  const [currentPage, setCurrentPage] = useState(page); // 현재보고있는 페이지

  // 아래 주석에서 말하는 페이지를 이동은 화면에 출력되는 페이지를 뜻함
  //페이지네이션을 이동 >> 페이지네이션의 번호를 뜻함
  const prevPage = () => {
    // setCurrentPage((currentPage) => Math.max(currentPage - 5, 1)); > 그룹페이지를 이전 그룹페이지로 이동
    setPage((curr) => curr - 1); // 페이지를 -1씩 이동
    setCurrentPage((curr) => curr - 1); // 페이지네이션를 -1씩 이동
  };
  const nextPage = () => {
    // setCurrentPage((currentPage) => Math.min(currentPage + 5, totalPages)); > 그룹페이지를 다음 그룹페이지로 이동
    setPage((curr) => curr + 1); // 페이지를 +1 씩 이동
    setCurrentPage((curr) => curr + 1); // 페이지네이션을 +1씩 이동
  };
  const renderPagination = () => {
    let pages = [];
    let startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
    /*
     * (currentPage - 1) / 5)부분은 현재페이지가 속한 그룹을 찾기 위해서
    // ex) 2-1/5 > 몫이 0이기때문에 1번째 페이지에포함 / ex) 6-1/5 or 7-1/5 는 몫이 1이기때문에 2번째 페이지에 포함됨
    // 다음페이지의 첫번째 페이지네이션의 숫자는 5의배수 +1 이기 때문에
    // Math.floor 를 하지않으면 소숫점이 존재함으로 다음 그룹페이지 속하게 됨
    // startPage는 그룹의 첫번째 페이지를 의미하기때문에 *5 +1 을해줌으로 해당 그룹의 첫번째자리를 가져옵니다.
    // ex) (1~5)-1/5 에 *5를 하게되면 무조건 0 이 되고  +1을 해서 첫번째 페이지의 첫번째 자리를 갖게 됩니다.
    // 여기서 (6~10)-1/5 *5 를 하게되면 무조건 5가 되고 +1을 하여 두번째 페이지의 첫번째 자리의 숫자인 6을 가져옵니다.
     */

    let endPage = Math.min(startPage + 4, totalPages);
    /*
    1. 한페이지 포스트는 최대 5개까지 출력되므로 endpage는 startpage+4, 만약 최대페이지보다 큰수라면 최대페이지로 
       설정
    2. endPage는 말그대로 그룹페이지의 마지막 자리를 뜻함으로 한번에 5개의 자리를 보여주고싶으니 startpage에 +4를 
       해줌
    3. 만약 포스트를 10개출력한다고 하면 +9를 하면 됩니다. startPage에서도 /5, *5 가 아닌 /10 ,*10을 해줘야합니다
    4. Math.min을 사용한 이유는 totalPages 23이라고 가정할시 , 마지막그룹페이지에서는 21,22,23을 
       보여주기위해서입니다.
    5. 만약 startPage가 21일때 endpage의 값을 startPage+4 한 값으로 적용해버리면 24,25까지 생성되어버리고 해당  
       페이지는
    6. 아무 문서가 없는 빈페이지가 생성되므로 Math.min을 사용해 totalpage의 값과 비교해 작은 숫자를 가져와서 
       설정합니다.
    7. 그럼 startPage가 21일때 +4 한 값인 25와 totalpages의 23 값을 비교하여 더 적은 23을 가져와 엔드페이지를 
       23으로 적용할 수 있습니다.
    8. 
     */
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          className={page === i ? "page" : null}
          // 선택된 페이지네이션이 현재 화면에 출력된 페이지일때 page라는 클래스명을 주어서 스타일링을 함
          onClick={() => {
            setCurrentPage(i);
            setPage(i);
          }}
        >
          {i}
        </Button>
      );
    }
    return pages;
  };

  //
  return (
    <PageSection>
      <ButtonWrap>
        <Button onClick={prevPage} disabled={currentPage === 1}>
          &lt;
        </Button>
        {renderPagination()}
        <Button onClick={nextPage} disabled={currentPage === totalPages}>
          &gt;
        </Button>
      </ButtonWrap>
    </PageSection>
  );
};

export const DetailContainer = styled.div`
width:100vw;
height:100vh;
z-index:1;
position: fixed;  
top:0;
left:0;
display: flex;
justify-content: center;
align-items: center;
`;

export const Detail = ({nickname, favoriteList})=>{
  
  console.log("ㅇㅇㅇㅇㅇ");
  console.log(favoriteList);
  const DetailWrap = styled.div`
  
  background-color: white;
  margin: 0 auto;
  margin-left: 2%; 
  margin-bottom: 5%;
  width:1350px;
  height:80%;
  padding: 10px;
  border: 5px solid black;
  border-radius: 20px;
  position: absolute;
  z-index: 2;
  background-color: white;
  
  `;
  const DetailHeader = styled.header``;
  const DetailHeaderUl = styled.ul``;
  const DetailHeaderLi = styled.li`
  float: left;
  font-size: 50px;
  list-style: none;
  `;

  const ListContainer = styled.div`
  position: absolute;
  top: 15%;
  width:98%;
  height:80%;
  border:2px solid black;
  overflow-y: scroll;
  
  `;
  const ListOne = styled.div`
  display: inline-block;
  width: 100%;
  height: 40%;
  border:1px solid black;
  `;

  let today = new Date().toLocaleDateString();

  return (
    <DetailWrap>
      <DetailHeader>
        <DetailHeaderUl>
          <DetailHeaderLi>{today}</DetailHeaderLi>
          <DetailHeaderLi>{nickname}</DetailHeaderLi>
        </DetailHeaderUl>  
      </DetailHeader>
      <ListContainer>
        {favoriteList.map((list)=>(
          <ListOne>
            <img src={list.cfirstimage} style={{height: "100%", width: "30%"}}></img>
            {list.ctitle}
          </ListOne>
        ))}
      </ListContainer>
  
    </DetailWrap>
  )
}


// motion block
export const MotionMypageWrapper = motion(MypageContainer);

export const MotionMypageBox = motion(MypageBox);

export const MotionMypageSectio = motion(MypageSection);
