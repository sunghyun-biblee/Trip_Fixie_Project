import styled, { keyframes } from "styled-components";
import "../../fonts/font.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FontSizemd,
  FontSizemdInput,
  FontSizesm,
} from "../Trip/trip_save_components";
import { auth, storage } from "../../firebase";
import { Navigate, useNavigate } from "react-router-dom";
import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const MypageWrapper = styled.div`
  /* width: 100%; */
  height: 1000px;
  width: 1600px;
  /* min-width: 1200px; */
  /* border: 1px solid black; */
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 5.1fr 2.7fr;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  background-color: white;
`;
export const MypageBackGround = styled.div`
  font-family: "NanumGothicLight";
  width: 100vw;
  height: 100vh;
  background-color: #f0f8ff;
  position: relative;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;
export const BackgroundIcon = styled.div`
  border-radius: 50%;
  position: absolute;
  z-index: 0;
  background-color: #add6ff;
  &.left {
    bottom: -70%;
    left: -15%;
    width: 50%;
    height: 100%;
  }
  &.right {
    top: -40%;
    right: -15%;
    width: 60%;
    height: 120%;
  }
`;
export const MypageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 1;
  backdrop-filter: blur(5px);
  position: relative;
`;

export const MypageBox = styled.div`
  position: relative;
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
  height: 600px;
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
export const TripPlanList = ({
  data,
  setFavorNickname,
  setIsDetail,
  setFavorFid,
}) => {
  return (
    <TripPlanListWrapper>
      <PlanHeader></PlanHeader>
      {data.map((items) => (
        <TripPlanItem
          key={items.id}
          {...items}
          setFavorNickname={setFavorNickname}
          setIsDetail={setIsDetail}
          setFavorFid={setFavorFid}
        ></TripPlanItem>
      ))}
    </TripPlanListWrapper>
  );
};

export const TripPlanItem = ({
  startDay,
  endDay,
  nickname,
  area,
  fid,
  setFavorNickname,
  setIsDetail,
  setFavorFid,
}) => {
  return (
    <div>
      <PlanUl
        onClick={() => {
          setFavorNickname(nickname);
          setFavorFid(fid);
          setIsDetail(true);
        }}
      >
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
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1.5rem;
`;
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
    color: #00a9bf;
    font-weight: 600;
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
          <img
            src="/img/Left.svg"
            alt=""
            style={{ width: "25px", height: "25px" }}
          />
        </Button>
        {renderPagination()}
        <Button onClick={nextPage} disabled={currentPage === totalPages}>
          <img
            src="/img/Right.svg"
            alt=""
            style={{ width: "25px", height: "25px" }}
          />
        </Button>
      </ButtonWrap>
    </PageSection>
  );
};

// export const DetailContainer = styled.div`
//   width: 100vw;
//   height: 100vh;
//   z-index: 1;
//   position: fixed;
//   top: 0;
//   left: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// export const Detail = ({ nickname, favoriteList }) => {
//   const DetailWrap = styled.div`
//     background-color: white;
//     margin: 0 auto;
//     margin-left: 2%;
//     margin-bottom: 5%;
//     width: 1350px;
//     height: 80%;
//     padding: 10px;
//     border: 5px solid black;
//     border-radius: 20px;
//     position: absolute;
//     z-index: 2;
//     background-color: white;
//   `;
//   const DetailHeader = styled.header``;
//   const DetailHeaderUl = styled.ul``;
//   const DetailHeaderLi = styled.li`
//     float: left;
//     font-size: 50px;
//     list-style: none;
//   `;

//   const ListContainer = styled.div`
//     position: absolute;
//     top: 15%;
//     width: 98%;
//     height: 80%;
//     border: 2px solid black;
//     overflow-y: scroll;
//   `;
//   const ListOne = styled.div`
//     display: inline-block;
//     width: 100%;
//     height: 40%;
//     border: 1px solid black;
//   `;

//   let today = new Date().toLocaleDateString();

//   return (
//     <DetailWrap>
//       <DetailHeader>
//         <DetailHeaderUl>
//           <DetailHeaderLi>{today}</DetailHeaderLi>
//           <DetailHeaderLi>{nickname}</DetailHeaderLi>
//         </DetailHeaderUl>
//       </DetailHeader>
//       <ListContainer>
//         {favoriteList.map((list) => (
//           <ListOne>
//             <img
//               src={list.cfirstimage}
//               style={{ height: "100%", width: "30%" }}
//             ></img>
//             {list.ctitle}
//           </ListOne>
//         ))}
//       </ListContainer>
//     </DetailWrap>
//   );
// };

const MypageUl = styled.ul`
  width: 100%;
  height: 90%;
  padding: 0;
  list-style: none;
  li {
    width: 100%;
    height: 8%;
    text-align: left;
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem 1rem 0;
    flex: 0 0 100%;
    z-index: 1;
  }
`;
const ClickState = styled.div`
  height: 100%;
  width: 7px;
  background-color: #92dbe2;
  border-radius: 0 1rem 1rem 0;
  transition: background-color 0.5s;
  &.click {
    background-color: #00a9bf;
  }
`;

export const MypageMenu = ({ setMypageMode }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("plan");
  const onClick = (e) => {
    console.log(e.target);
    if (e.target.id === "plan") {
      setMode("plan");
      setMypageMode("plan");
    } else if (e.target.id === "profile") {
      setMode("profile");
      setMypageMode("profile");
    } else if (e.target.id === "faq") {
      setMode("faq");
      setMypageMode("faq");
    } else if (e.target.id === "logout") {
      setMode("logout");
      const confirmlog = window.confirm("로그아웃 하시겠습니까?");
      if (confirmlog) {
        auth.signOut();
        navigate("/");
      } else {
        setMode("plan");
        setMypageMode("plan");
      }
    } else if (e.target.id === "trip") {
      navigate("/trip");
    }
  };
  const gomain = () => {
    navigate("/");
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        backgroundColor: "#92dbe2",
        color: "#FBF9F9",
        fontFamily: "NanumSquare",
        letterSpacing: 1.4,
      }}
    >
      <div
        style={{
          height: "5%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
        }}
        onClick={gomain}
        className="here"
      >
        <FontSizesm>마이페이지</FontSizesm>
      </div>
      <MypageUl>
        <li>
          <ClickState className={mode === "plan" ? "click" : null} />
          <img
            src="/img/mypage/Calendar.svg"
            alt=""
            style={{
              width: "40px",
              height: "100%",
              paddingRight: "1rem",
              marginLeft: "1rem",
            }}
          />
          <FontSizesm onClick={onClick} id="plan" style={{ cursor: "pointer" }}>
            MY PLAN
          </FontSizesm>
        </li>
        <li>
          <ClickState className={mode === "faq" ? "click" : null} />
          <img
            src="/img/mypage/FAQ.svg"
            alt=""
            style={{
              width: "40px",
              height: "100%",
              paddingRight: "1rem",
              marginLeft: "1rem",
            }}
          />
          <FontSizesm onClick={onClick} id="faq" style={{ cursor: "pointer" }}>
            문의, 건의하기
          </FontSizesm>
        </li>
        <li>
          <ClickState className={mode === "trip" ? "click" : null} />
          <img
            src="/img/mypage/goTripPlan.png"
            alt=""
            style={{
              width: "40px",
              height: "40px",
              paddingRight: "1.5rem",
              marginLeft: "1rem",
            }}
          />
          <FontSizesm onClick={onClick} id="trip" style={{ cursor: "pointer" }}>
            계획짜기
          </FontSizesm>
        </li>
        <li>
          <ClickState className={mode === "logout" ? "click" : null} />
          <img
            src="/img/mypage/Logout.svg"
            alt=""
            style={{
              width: "40px",
              height: "100%",
              paddingRight: "1rem",
              marginLeft: "1rem",
            }}
          />
          <FontSizesm
            onClick={onClick}
            id="logout"
            style={{ cursor: "pointer" }}
          >
            LOGOUT
          </FontSizesm>
        </li>
      </MypageUl>
    </div>
  );
};

const SectionBackground = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  height: 30%;
  background-color: #00a9bf;
  /* background-color: #79c1df; */
  border-radius: 0 0 30px 30px;
`;
const SectionListBox = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 90%;
  font-family: "NanumSquare";
`;

const ListNav = styled.ul`
  display: grid;
  grid-template-columns: 0.05fr 1fr 1.55fr 1fr 1fr;
  padding: 0;
  list-style: none;
  border-radius: 15px;
  background-color: #92dbe2;
  p {
    font-size: 1.3rem;
    font-weight: 600;
  }
`;

const ListNav1 = styled.ul`
  padding: 0;
  list-style: none;
  border-radius: 15px;
  background-color: #92dbe2;
  p {
    font-size: 1.3rem;
    font-weight: 600;
  }
`;

const ListNavli = styled.li`
  text-align: center;
  padding: 1rem;
  color: #00a9bf;
`;

const SectionList = styled.ul`
  list-style: none;
  padding: 0;
`;
const SectionListIt = styled.li`
  display: grid;
  grid-template-columns: 0.05fr 1fr 1.55fr 1fr 1fr;
  text-align: center;
  border-radius: 15px;
  margin-bottom: 1.5rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  font-family: "NanumSquare";
  font-weight: 600;
`;
const ListText = styled.div`
  background-color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    font-size: 1.5rem;
    padding: 0.4rem;
  }
`;
const ListColor = styled.div`
  background-color: #6de7ed;
  border-radius: 10px 0 0 10px;
`;
const EditBtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
  input {
    font-size: 1.3rem;
    padding: 1.5rem 0.5rem;
    border-radius: 10px;
    margin-top: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.3);
    &:focus {
      outline: none;
    }
  }
`;
const UserEditBtn = styled.button`
  background-color: #00a9bf;
  border-radius: 15px;
  width: 45%;
  padding: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  color: white;
  font-weight: 600;
  font-size: 1.5rem;
`;
const MyprofileBox = styled.div`
  width: 95%;
  height: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  font-family: "NotoSans";
`;
const MyprofileImg = styled.img`
  padding: 1rem;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 1px solid black;
`;
export const MypageList = ({
  data,
  setFavorNickname,
  setIsDetail,
  setFavorFid,
  page,
  setPage,
  postLimit,
  totalPlan,
  userInfo,
  setListMode,
}) => {
  console.log(data);

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#F0F8FF",
        fontFamily: "NanumSquare",
      }}
    >
      <SectionBackground></SectionBackground>
      <SectionListBox>
        <div
          id="first_section"
          style={{
            height: "22%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <FontSizemd style={{ padding: "2rem 0", color: "#FBF9F9" }}>
            Plan List
          </FontSizemd>
          <ListNav>
            <div></div>
            <ListNavli>
              <p>별명</p>
            </ListNavli>
            <ListNavli>
              <p>날짜/지역</p>
            </ListNavli>
            <ListNavli>
              <p>유저정보</p>
            </ListNavli>
            <ListNavli>
              <p>확인</p>
            </ListNavli>
          </ListNav>
        </div>
        <div id="second_section" style={{ paddingTop: "3rem" }}>
          <SectionList>
            {data.map((items) => (
              <SectionListWrapper
                key={items.id}
                {...items}
                userInfo={userInfo}
                setFavorNickname={setFavorNickname}
                setIsDetail={setIsDetail}
                setFavorFid={setFavorFid}
                setListMode={setListMode}
              ></SectionListWrapper>
            ))}
          </SectionList>
          {data[0] && (
            <Pagenagtion
              page={page}
              setPage={setPage}
              postLimit={postLimit}
              totalPlan={totalPlan}
              // 1. page : 현재의 page
              // 2. setPage : 변경될 page를 만드는 useState함수
              // 3. limit : 한번에 posts의 최대 갯수
              // 4. totalPosts : 데이터의 총 posts 갯수
            ></Pagenagtion>
          )}
        </div>
      </SectionListBox>
    </div>
  );
};

const FaqBox = styled.div`
  background-color: #f0f8ff;
  display: flex;
  border-radius: 15px;
  align-items: center;
  padding: 2rem;
`;
const FaqUl = styled.ul`
  position: relative;
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  list-style: none;
  justify-content: center;
`;
const FaqItem = styled.li`
  width: 100%;
  padding: 1.5rem 0;
  display: flex;
  align-items: center;
  input[type="text"],
  input[type="password"] {
    width: 28%;
    height: 2.5vh;
    padding: 0.5rem;
    font-size: 1.3rem;
    font-family: "Nanum";
  }
  input[type="password"] {
    width: 40%;
  }
  textarea {
    resize: none;
    width: 50%;
    height: 15vh;
    padding: 1rem;
    font-size: 1.5rem;
    font-family: "Nanum";
  }
  input,
  textarea {
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    &:focus {
      outline: none;
    }
  }
`;
const FaqBtn = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: 10px;
  width: 45%;
  font-size: 1.2rem;
  font-family: "NanumSquare";
  background-color: #92dbe2;
  font-weight: 600;
`;

export const MyFaq = ({ data }) => {
  console.log(data);
  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#F0F8FF",
      }}
    >
      <SectionBackground></SectionBackground>
      <SectionListBox>
        <div
          id="first_section"
          style={{
            height: "20%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <FontSizemd style={{ padding: "2rem 0", color: "#FBF9F9" }}>
            Plan List
          </FontSizemd>
          <ListNav1>
            <ListNavli>
              <p>문의 사항</p>
            </ListNavli>
          </ListNav1>
        </div>
        <div
          className="Box"
          style={{
            marginTop: "5rem",
            paddingTop: "1rem",
            borderRadius: "15px",
            backgroundColor: "#F0F8FF",
            border: "1px solid rgba(0,0,0,0.1)",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <FontSizesm
            style={{
              textAlign: "center",
              paddingBottom: "1rem",
            }}
          >
            문의사항 혹은 건의사항을 남겨주시면, 신속한 답변 드리겠습니다.
          </FontSizesm>
          <FaqBox>
            <FaqUl>
              <FaqItem>
                <FontSizesm style={{ width: "13%" }}>제목</FontSizesm>{" "}
                <input type="text" placeholder="제목을 입력해주세요" />
              </FaqItem>
              <FaqItem>
                <FontSizesm style={{ width: "13%" }}>이메일</FontSizesm>{" "}
                <input
                  type="text"
                  placeholder="연락받을 이메일을 입력해주세요"
                />
              </FaqItem>
              <FaqItem>
                <FontSizesm style={{ width: "13%" }}>비밀번호</FontSizesm>{" "}
                <input
                  type="password"
                  placeholder="게시글을 조회하기 위한 비밀번호를 입력해주세요"
                />
              </FaqItem>
              <FaqItem>
                <FontSizesm style={{ width: "13%" }}>문의 내용</FontSizesm>
                <textarea
                  name=""
                  id=""
                  placeholder="문의사항이나 건의사항을 입력해주세요"
                ></textarea>
              </FaqItem>

              <FaqItem>
                <FontSizesm style={{ width: "13%" }}>비공개</FontSizesm>
                <input type="checkbox" />
              </FaqItem>
              <div
                style={{
                  width: "30%",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <FaqBtn>목록보기</FaqBtn>
                <FaqBtn>저장하기</FaqBtn>
              </div>
            </FaqUl>
          </FaqBox>
        </div>
      </SectionListBox>
    </div>
  );
};

const SectionListWrapper = ({
  startDay,
  endDay,
  ftitle,
  area,
  fid,
  setFavorNickname,
  setIsDetail,
  setFavorFid,
  userInfo,
  setListMode,
}) => {
  return (
    <SectionListIt>
      <ListColor />
      <ListText>
        <p>{ftitle}</p>
      </ListText>
      <ListText>
        <p>
          {startDay}~{endDay}
        </p>
        <p>{area}</p>
      </ListText>
      <ListText>
        <p>{userInfo.name}</p>
      </ListText>
      <ListText
        style={{
          borderRadius: "0 10px 10px 0",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="/img/mypage/MYplanCheck.png"
          style={{ width: "30px", height: "30px" }}
          alt=""
          onClick={() => {
            setFavorNickname(ftitle);
            setFavorFid(fid);
            setIsDetail(true);
            setListMode("detail");
          }}
        ></img>
      </ListText>
    </SectionListIt>
  );
};

const ProfileLabel = styled.label``;

export const ShowListInfo = ({
  userInfo,
  listMode,
  setListMode,
  favoriteList,
  favoriteArea,
  notepad,
}) => {
  const [isQuit, setIsQuit] = useState(true);
  const [isDelete, setIsDelete] = useState(true);
  const [profilesrc, setProfilesrc] = useState();
  const navigate = useNavigate();
  const user = auth.currentUser;
  const updatePw = () => {
    const originpw = document.getElementById("originpw").value;
    const credential = EmailAuthProvider.credential(user.email, originpw);
    const updatepw = document.getElementById("updatepw").value;
    if (originpw === updatepw) {
      //원래는 파이어베이스에서 제대로 된 비밀번호를 받아와서 비교해야하나 그까지는 시간부족 구현 x
      alert("기존비밀번호와 동일한 비밀번호는 사용 할 수 없습니다.");
    } else {
      if (user.providerData[0].providerId === "password") {
        reauthenticateWithCredential(user, credential)
          .then(() => {
            // 기존 비밀번호 인증 성공
            return updatePassword(user, updatepw);
          })
          .then(() => {
            // 비밀번호 업데이트 성공
            alert("비밀번호가 변경되었습니다.");
            navigate("/");
          })
          .catch(() => {
            // 기존 비밀번호 인증 실패
            alert("기존 비밀번호를 확인해주세요.");
          });
      } else {
        alert("소셜로그인은 해당 웹에서 비밀번호 변경이 불가합니다.");
        setListMode("mypage");
      }
    }
  };
  const deleteuser = () => {
    const pw = document.getElementById("deletepw").value;
    const credential = EmailAuthProvider.credential(user.email, pw);
    const uid = user.uid;

    axios
      .post("/test/loadProfile", { uid: uid })
      .then((chuser) => {
        const email = chuser.data.uemail;

        if (user.providerData[0].providerId === "password") {
          reauthenticateWithCredential(user, credential)
            .then(() => {
              deleteUser(user) //위에있는 deleteuser과는 다른 함수
                .then(() => {
                  axios
                    .post("/test/deleteUser", { userid: uid })
                    .then(() => {
                      const deleteRef = ref(storage, `imageBox/${email}`);

                      deleteObject(deleteRef)
                        .then(() => {
                          console.log("파이어베이스스토리지삭제");
                        })
                        .catch((err) => {
                          console.log("파이어베이스스토리지삭제실패");
                          console.error(err);
                        });

                      console.log("성공");
                    })
                    .catch(() => {
                      console.log("실패");
                      return;
                    });
                  setIsDelete(false);
                })
                .catch((error) => {
                  console.log("에러용");
                });
            })
            .catch(() => {
              alert("기존 비밀번호를 확인해주세요.");
            });
        } else {
          alert("소셜로그인은 해당 웹에서 회원탈퇴가 불가합니다.");
          setIsQuit(true);
        }
      })
      .catch(() => {
        console.log("에러입니다.");
      });
  };

  useEffect(() => {
    if (isDelete == false) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [isDelete]);

  const onChageIMG = (event) => {
    const { files } = event.target;
    if (!user) {
      return;
    }
    if (files && files.length === 1) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("miniprofile").src = e.target.result;
        document.getElementById("myimg").src = e.target.result;
        setProfilesrc(e.target.result);
      };
      reader.readAsDataURL(files[0]);
    }
        const storageRef = ref(storage, `imageBox/${userInfo.email}`);
        const uploadTask = uploadBytes(storageRef, files[0]);

        const uidx = auth.currentUser
        uploadTask.then((snapshot)=>{
          getDownloadURL(snapshot.ref).then((downloadURL)=>{
            console.log(downloadURL);
            axios.post("/test/updateProfile", {uid: uidx.uid, uprofile: downloadURL})
            .then(()=>{console.log("성공")}).catch(()=>{console.log("실패")});

            updateProfile(user, {photoURL: downloadURL});
          });
        });
  };


  return (
    <>
      <div style={{ height: "100%", position: "relative" }}>
        <SectionBackground
          style={{
            height: "15%",
            borderRadius: 0,
          }}
          className="background"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "absolute",
              right: 0,
              padding: "1rem 2rem",
              margin: "2rem",
              border: "1px solid aliceblue",
              borderRadius: "50px",
            }}
          >
            <FontSizesm
              style={{
                padding: "0 2rem 0 1rem",
                color: "#D2ECEF",
                marginRight: "0.5rem",
                cursor: "pointer",
              }}
              onClick={() => {
                setListMode("mypage");
              }}
            >
              {userInfo.name}
            </FontSizesm>
            <div>
              <img
                id="miniprofile"
                src={user.photoURL ? user.photoURL : "/img/MyProfile_IMG.png"}
                alt=""
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
            </div>
          </div>
        </SectionBackground>
        <div
          style={{
            width: "100%",
            height: "90%",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderTopLeftRadius: "50px",
            bottom: 0,
            backgroundColor: "#F0F8FF",
          }}
        >
          {listMode === "mypage" && (
            <MyprofileBox>
              <ProfileLabel
                htmlFor="avatar"
                style={{
                  paddingTop: "10%",
                }}
              >
                <MyprofileImg
                  id="myimg"
                  src={
                    user?.photoURL
                      ? user.photoURL
                      : profilesrc
                      ? profilesrc
                      : "/img/MyProfile_IMG.png"
                  }
                  alt=""
                ></MyprofileImg>
                <input
                  onChange={onChageIMG}
                  id="avatar"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                ></input>
              </ProfileLabel>
              <div style={{ width: "100%", padding: "2rem 5rem" }}>
                <FontSizemd style={{ padding: "1rem 0" }}>
                  {userInfo.name}
                </FontSizemd>
                <FontSizemd style={{ padding: "1rem 0" }}>
                  {userInfo.email}
                </FontSizemd>
              </div>
              {isDelete ? (
                <div
                  style={{ width: "100%", position: "absolute", bottom: "5%" }}
                >
                  {isQuit ? (
                    <EditBtnBox style={{ padding: "2rem 5rem" }}>
                      <UserEditBtn
                        onClick={() => {
                          setListMode("update");
                        }}
                      >
                        비번수정
                      </UserEditBtn>
                      <UserEditBtn
                        onClick={() => {
                          setIsQuit(false);
                        }}
                      >
                        회원탈퇴
                      </UserEditBtn>
                    </EditBtnBox>
                  ) : (
                    <EditBtnBox
                      style={{
                        flexDirection: "column",
                        padding: "0.5rem 5rem",
                      }}
                    >
                      <FontSizesm style={{ fontSize: "1.7rem" }}>
                        삭제하시려면 비밀번호를 입력해주세요
                      </FontSizesm>
                      <input
                        id="deletepw"
                        placeholder="비밀번호를 입력해주세요"
                      />
                      <EditBtnBox style={{ padding: "1rem 0 0 0" }}>
                        <UserEditBtn
                          onClick={() => {
                            setIsQuit(true);
                          }}
                          style={{ backgroundColor: "#F0F8FF", color: "gray" }}
                        >
                          뒤로가기
                        </UserEditBtn>
                        <UserEditBtn onClick={deleteuser}>확인</UserEditBtn>
                      </EditBtnBox>
                    </EditBtnBox>
                  )}
                </div>
              ) : (
                <FontSizemd>
                  유저정보가 삭제 되었습니다. 3초후에 매인페이지로 이동합니다.
                </FontSizemd>
              )}
            </MyprofileBox>
          )}
          {listMode === "update" && (
            <MyprofileBox>
              <ProfileLabel
                htmlFor="avatar"
                style={{
                  paddingTop: "10%",
                }}
              >
                <MyprofileImg
                  id="myimg"
                  src={
                    user?.photoURL
                      ? user.photoURL
                      : profilesrc
                      ? profilesrc
                      : "/img/MyProfile_IMG.png"
                  }
                  alt=""
                ></MyprofileImg>
                <input
                  onChange={onChageIMG}
                  id="avatar"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                ></input>
              </ProfileLabel>
              <div style={{ width: "100%", padding: "2rem 5rem" }}>
                <FontSizemd style={{ padding: "1rem 0" }}>
                  {userInfo.name}
                </FontSizemd>
                <FontSizemd style={{ padding: "1rem 0" }}>
                  {userInfo.email}
                </FontSizemd>
              </div>
              <div
                style={{ width: "100%", position: "absolute", bottom: "5%" }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "3rem 5rem 0.5rem 5rem",
                    justifyContent: "space-between",
                  }}
                >
                  <FontSizesm> 이전 비밀번호</FontSizesm>
                  <input type="text" id="originpw" style={{ width: "60%" }} />
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    padding: "1rem 5rem 0.5rem 5rem",
                    justifyContent: "space-between",
                  }}
                >
                  <FontSizesm> 새로운 비밀번호</FontSizesm>
                  <input type="text" id="updatepw" style={{ width: "60%" }} />
                </div>
                <EditBtnBox style={{ padding: "2rem 5rem" }}>
                  <UserEditBtn
                    onClick={() => {
                      setListMode("mypage");
                    }}
                    style={{ backgroundColor: "#F0F8FF", color: "gray" }}
                  >
                    뒤로가기
                  </UserEditBtn>
                  <UserEditBtn onClick={updatePw}>완료</UserEditBtn>
                </EditBtnBox>
              </div>
            </MyprofileBox>
          )}
          {listMode === "detail" && (
            <MyprofileBox>
              <MypagePlanInfo
                notepad={notepad}
                setListMode={setListMode}
                favoriteList={favoriteList}
                favoriteArea={favoriteArea}
              ></MypagePlanInfo>
            </MyprofileBox>
          )}
        </div>
      </div>
    </>
  );
};

const InfoWrapper = styled.div`
  width: 100%;
  padding: 2rem;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const InfoMenuUl = styled.ul`
  padding: 0;
  display: grid;
  list-style: none;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
`;
const ActiveBar = styled.div`
  width: 33.3%;
  height: 3px;
  transition: transform 0.5s, display 0.5s;
  background-color: #52c2f2;
  margin-top: 0.5rem;
  display: ${(props) => {
    if (!props.infoMode) {
      return "none";
    }
    if (props.infoMode === "tour") {
      return "block";
    } else if (props.infoMode === "festival") {
      return "block";
    } else if (props.infoMode === "mt") {
      return "block";
    }
  }};
  transform: ${(props) => {
    if (props.infoMode === "tour") {
      return "translateX(0)";
    } else if (props.infoMode === "festival") {
      return "translateX(99.9%)";
    } else if (props.infoMode === "mt") {
      return "translateX(199.8%)";
    } else {
      return "translateX(0)"; // 기본 값
    }
  }};
`;
const rotateAnimation = keyframes`
  from {
    transform:  rotateZ(-90deg) translateX(0)
  }
  to {
    transform: rotateZ(-90deg) translateX(-10px)
  }
  `;
const UpArrow = styled.img`
  width: 40px;
  height: 40px;
  animation: ${rotateAnimation} 0.5s infinite alternate;
`;
const MypagePlanInfo = ({
  favoriteList,
  favoriteArea,
  setListMode,
  notepad,
}) => {
  const [infoMode, setInfoMode] = useState();

  console.log(favoriteArea);
  const changeMode = (e) => {
    const targetId = e.target.id;
    if (targetId === "tour" || targetId === "festival" || targetId === "mt") {
      setInfoMode(targetId);
    }
  };
  useEffect(() => {
    setInfoMode();
  }, [favoriteList]);

  return (
    favoriteArea &&
    favoriteList && (
      <InfoWrapper>
        <InfoBox>
          <FontSizesm style={{ padding: "1rem 0.5rem" }}>
            일정 : {favoriteArea.fstart}~{favoriteArea.fend}
          </FontSizesm>
          <FontSizesm style={{ padding: "1rem 0.5rem" }}>
            지역 : {favoriteArea.farea}
          </FontSizesm>
        </InfoBox>
        <div style={{ paddingTop: "2rem", width: "100%" }}>
          <InfoMenuUl style={{ cursor: "pointer" }}>
            <li>
              <FontSizesm id="tour" onClick={changeMode}>
                관광지
              </FontSizesm>
            </li>
            <li>
              <FontSizesm id="festival" onClick={changeMode}>
                축제
              </FontSizesm>
            </li>
            <li>
              <FontSizesm id="mt" onClick={changeMode}>
                숙소
              </FontSizesm>
            </li>
          </InfoMenuUl>
          <ActiveBar infoMode={infoMode}></ActiveBar>
        </div>
        <div>
          {!infoMode && (
            <div
              style={{
                height: "30vh",
                display: "flex",
                flexDirection: "column",
                paddingTop: "4rem",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  paddingBottom: "4rem",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <UpArrow src="/img/mypage/UpArrow.png"></UpArrow>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <UpArrow src="/img/mypage/UpArrow.png"></UpArrow>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <UpArrow src="/img/mypage/UpArrow.png"></UpArrow>
                </div>
              </div>
              <FontSizesm style={{ textAlign: "center" }}>
                조회할 카테고리를 클릭해주세요!
              </FontSizesm>
            </div>
          )}
          {infoMode === "tour" && (
            <Infobox style={{ marginTop: "1.5rem" }}>
              {favoriteList &&
                favoriteList.map(
                  (item) =>
                    item.contenttypeid === 12 && (
                      <div
                        style={{
                          display: "flex",
                          width: "97%",
                          alignItems: "center",
                          border: "1px solid rgba(0,0,0,0.3)",
                          borderRadius: "15px",
                          margin: "1rem 0",
                        }}
                      >
                        <img
                          src={
                            item.cfirstimage
                              ? item.cfirstimage
                              : "/img/TourSpot_No_IMG.svg"
                          }
                          alt=""
                          style={{
                            width: "30%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "10px 0 0 10px",
                          }}
                        ></img>
                        <div
                          style={{
                            padding: "0.5rem 0 0.5rem 1rem",
                            width: "100%",
                          }}
                        >
                          <p
                            key={item.contentid}
                            style={{
                              width: "100%",
                              paddingBottom: "1rem",
                              fontSize: "1.8rem",
                              fontWeight: 600,
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            {item.ctitle}
                            {item.homepage && (
                              <a
                                href={item.homepage}
                                target="_blank"
                                style={{
                                  fontSize: "1.2rem",
                                  paddingRight: "1rem",
                                }}
                              >
                                <img
                                  src="/img/Homepage.png"
                                  alt=""
                                  style={{ width: "25px", height: "25px" }}
                                />
                              </a>
                            )}
                          </p>

                          <p
                            style={{
                              fontSize: "1.2rem",
                              fontWeight: 600,
                              color: "gray",
                            }}
                          >
                            {item.caddr}
                          </p>
                          {item.ctel && (
                            <p
                              style={{
                                fontSize: "1.2rem",
                                fontWeight: 600,
                                color: "gray",
                              }}
                            >
                              {item.ctel}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                )}
            </Infobox>
          )}
          {infoMode === "festival" && (
            <Infobox style={{ marginTop: "1.5rem" }}>
              {favoriteList &&
                favoriteList.map(
                  (item) =>
                    item.contenttypeid !== 12 &&
                    item.contenttypeid !== 32 && (
                      <div
                        style={{
                          display: "flex",
                          width: "97%",
                          alignItems: "center",
                          border: "1px solid rgba(0,0,0,0.3)",
                          borderRadius: "15px",
                          margin: "1rem 0",
                        }}
                      >
                        <img
                          src={
                            item.cfirstimage
                              ? item.cfirstimage
                              : "/img/TourSpot_No_IMG.svg"
                          }
                          alt=""
                          style={{
                            width: "30%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "10px 0 0 10px",
                          }}
                        ></img>
                        <div
                          style={{
                            padding: "0.5rem 0 0.5rem 1rem",
                            width: "100%",
                          }}
                        >
                          <p
                            key={item.contentid}
                            style={{
                              width: "100%",
                              paddingBottom: "1rem",
                              fontSize: "1.8rem",
                              fontWeight: 600,
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            {item.ctitle}
                            {item.homepage && (
                              <a
                                href={item.homepage}
                                target="_blank"
                                style={{
                                  fontSize: "1.2rem",
                                  paddingRight: "1rem",
                                }}
                              >
                                <img
                                  src="/img/Homepage.png"
                                  alt=""
                                  style={{ width: "25px", height: "25px" }}
                                />
                              </a>
                            )}
                          </p>

                          <p
                            style={{
                              fontSize: "1.2rem",
                              fontWeight: 600,
                              color: "gray",
                            }}
                          >
                            {item.caddr}
                          </p>
                          {item.ctel && (
                            <p
                              style={{
                                fontSize: "1.2rem",
                                fontWeight: 600,
                                color: "gray",
                              }}
                            >
                              {item.ctel}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                )}
            </Infobox>
          )}
          {infoMode === "mt" && (
            <Infobox style={{ marginTop: "1.5rem" }}>
              {favoriteList &&
                favoriteList.map(
                  (item) =>
                    item.contenttypeid === 32 && (
                      <div
                        style={{
                          display: "flex",
                          width: "97%",
                          alignItems: "center",
                          border: "1px solid rgba(0,0,0,0.3)",
                          borderRadius: "15px",
                          margin: "1rem 0",
                        }}
                      >
                        <img
                          src={
                            item.cfirstimage
                              ? item.cfirstimage
                              : "/img/TourSpot_No_IMG.svg"
                          }
                          alt=""
                          style={{
                            width: "30%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "10px 0 0 10px",
                          }}
                        ></img>
                        <div
                          style={{
                            padding: "0.5rem 0 0.5rem 1rem",
                            width: "100%",
                          }}
                        >
                          <p
                            key={item.contentid}
                            style={{
                              width: "100%",
                              paddingBottom: "1rem",
                              fontSize: "1.8rem",
                              fontWeight: 600,
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            {item.ctitle}
                            {item.homepage && (
                              <a
                                href={item.homepage}
                                target="_blank"
                                style={{
                                  fontSize: "1.2rem",
                                  paddingRight: "1rem",
                                }}
                              >
                                <img
                                  src="/img/Homepage.png"
                                  alt=""
                                  style={{ width: "25px", height: "25px" }}
                                />
                              </a>
                            )}
                          </p>

                          <p
                            style={{
                              fontSize: "1.2rem",
                              fontWeight: 600,
                              color: "gray",
                            }}
                          >
                            {item.caddr}
                          </p>
                          {item.ctel && (
                            <p
                              style={{
                                fontSize: "1.2rem",
                                fontWeight: 600,
                                color: "gray",
                              }}
                            >
                              {item.ctel}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                )}
            </Infobox>
          )}
        </div>
        <div style={{ paddingTop: "5rem" }}>
          <FontSizemd style={{ padding: "2rem 0", fontFamily: "NanumSquare" }}>
            작성메모
          </FontSizemd>
          <Memo className="Memo">
            <FontSizesm>
              {favoriteArea.fnotepad && favoriteArea.fnotepad}
            </FontSizesm>
          </Memo>
        </div>
        <div
          style={{ position: "absolute", top: "1%", right: "5%", zIndex: 1 }}
          onClick={() => {
            setListMode("mypage");
          }}
        >
          <img src="/img/MYpageColse.png" alt="" style={{ width: "40px" }} />
        </div>
      </InfoWrapper>
    )
  );
};

const Memo = styled.div`
  height: 10vh;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;
  overflow: scroll;
  overflow-x: hidden;
  border-radius: 5px;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    height: 30%;
    border-radius: 1rem;
    background-color: #00a9bf;
  }
  &::-webkit-scrollbar-track {
    border-radius: 1rem;
    background-color: rgba(33, 122, 244, 0.1);
  }
`;

const Infobox = styled.div`
  height: 30vh;
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    height: 30%;
    border-radius: 1rem;
    background-color: #00a9bf;
  }
  &::-webkit-scrollbar-track {
    border-radius: 1rem;
    background-color: rgba(33, 122, 244, 0.1);
  }
`;

// motion block

export const MotionMypageWrapper = motion(MypageContainer);

export const MotionMypageBox = motion(MypageBox);
