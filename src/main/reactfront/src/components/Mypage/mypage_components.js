import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FontSizemd,
  FontSizemdInput,
  FontSizesm,
} from "../Trip/trip_save_components";
import { auth } from "../../firebase";
import { Navigate, useNavigate } from "react-router-dom";
import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
  signOut,
  updatePassword,
} from "firebase/auth";
import axios from "axios";

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
  width: 100vw;
  height: 100vh;
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Detail = ({ nickname, favoriteList }) => {
  const DetailWrap = styled.div`
    background-color: white;
    margin: 0 auto;
    margin-left: 2%;
    margin-bottom: 5%;
    width: 1350px;
    height: 80%;
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
    width: 98%;
    height: 80%;
    border: 2px solid black;
    overflow-y: scroll;
  `;
  const ListOne = styled.div`
    display: inline-block;
    width: 100%;
    height: 40%;
    border: 1px solid black;
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
        {favoriteList.map((list) => (
          <ListOne>
            <img
              src={list.cfirstimage}
              style={{ height: "100%", width: "30%" }}
            ></img>
            {list.ctitle}
          </ListOne>
        ))}
      </ListContainer>
    </DetailWrap>
  );
};

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
      if(confirmlog){
        auth.signOut();
        navigate("/");
      }else{
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
      }}
    >
      <div
        style={{
          height: "5%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        onClick={gomain}
        className="here"
      >
        <img
          src="/img/CHlogo.png"
          alt=""
          style={{ width: "80px", height: "80px" }}
        />
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
        {/* <li>
          <ClickState className={mode === "profile" ? "click" : null} />
          <img
            src="/img/mypage/Profile.svg"
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
            id="profile"
            style={{ cursor: "pointer" }}
          >
            MY PROFILE
          </FontSizesm>
        </li> */}
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
            1:1 FAQ
          </FontSizesm>
        </li>
        <li>
          <ClickState className={mode === "trip" ? "click" : null} />
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

const UserEditBtn = styled.button`
  width: 45%;
  background-color: green;
  border-radius: 5px;
  color: black;
  font-size: 30px;
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
        </div>
        <div id="third_section" className="pagenation"></div>
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
      <ListText style={{ borderRadius: "0 10px 10px 0" }}>
        <p
          onClick={() => {
            setFavorNickname(ftitle);
            setFavorFid(fid);
            setIsDetail(true);
            setListMode("detail");
          }}
        >
          {"=>"}
        </p>
      </ListText>
    </SectionListIt>
  );
};

export const ShowListInfo = ({ userInfo, listMode, setListMode }) => {
  const [isQuit, setIsQuit] = useState(true);
  const [isDelete, setIsDelete] = useState(true);
  const navigate = useNavigate();

  const updatePw = () => {
    const user = auth.currentUser;
    const pw = document.getElementById("originpw").value;
    const credential = EmailAuthProvider.credential(user.email, pw);
    reauthenticateWithCredential(user, credential)
      .then(() => {})
      .catch(() => {
        alert("기존 비밀번호를 확인해주세요.");
        return;
      })
      .finally(() => {
        updatePassword(user, document.getElementById("updatepw").value)
          .then(() => {
            console.log("확인");
            navigate("/");
          })
          .catch((error) => {
            console.log("실패");
          });
      });
  };

  const deleteuser = () => {
    const user = auth.currentUser;
    const pw = document.getElementById("deletepw").value;
    const credential = EmailAuthProvider.credential(user.email, pw);
    const uid = user.uid;
    reauthenticateWithCredential(user, credential)
      .then(() => {})
      .catch(() => {
        alert("기존 비밀번호를 확인해주세요.");
        return;
      })
      .finally(() => {
        deleteUser(user)
          .then(() => {
            axios
              .post("/test/deleteUser", { userid: uid })
              .then(() => {
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
      });
  };

  useEffect(() => {
    if (isDelete == false) {
      setTimeout(() => {
        navigate("/");
      }, 6000);
    }
  }, [isDelete]);

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
            <div
              style={{
                width: "30px",
                height: "30px",
                border: "1px solid aliceblue",
                borderRadius: "50%",
                backgroundImage: `url("/img/MyProfile_IMG.png")`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
        </SectionBackground>
        {listMode === "mypage" && (
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
            <div
              style={{
                width: "90%",
                height: "90%",
                border: "1px solid black",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  paddingTop: "20%",
                }}
              >
                <img
                  src="/img/fairy2.svg"
                  alt=""
                  style={{
                    padding: "1rem",
                    width: "300px",
                    height: "300px",
                    borderRadius: "50%",
                    border: "1px solid black",
                  }}
                ></img>
              </div>
              <FontSizemd
                style={{
                  margin: "15px 0",
                }}
              >
                {userInfo.name}
              </FontSizemd>
              <FontSizemd
                style={{
                  margin: "10px 0",
                }}
              >
                {userInfo.email}
              </FontSizemd>
              {isDelete ? (
                <div
                  style={{
                    margin: "15px 0",
                    marginBottom: "15px 0 ",
                    width: "90%",
                    height: "5%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {isQuit ? (
                    <div>
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
                    </div>
                  ) : (
                    <div>
                      <FontSizemd>
                        삭제하시려면 비밀번호를 입력해주세요
                      </FontSizemd>
                      <input id="deletepw" />
                      <UserEditBtn onClick={deleteuser}>확인</UserEditBtn>
                      <UserEditBtn
                        onClick={() => {
                          setIsQuit(true);
                        }}
                      >
                        뒤로가기
                      </UserEditBtn>
                    </div>
                  )}
                </div>
              ) : (
                <FontSizemd>
                  유저정보가 삭제 되었습니다. 3초후에 매인페이지로 이동합니다.
                </FontSizemd>
              )}
            </div>
          </div>
        )}
        {listMode === "update" && (
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
            <div
              style={{
                width: "90%",
                height: "90%",
                border: "1px solid black",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  paddingTop: "20%",
                }}
              >
                <img
                  src="/img/fairy2.svg"
                  alt=""
                  style={{
                    padding: "1rem",
                    width: "300px",
                    height: "300px",
                    borderRadius: "50%",
                    border: "1px solid black",
                  }}
                ></img>
              </div>
              <FontSizemd
                style={{
                  margin: "15px 0",
                }}
              >
                {userInfo.name}
              </FontSizemd>
              <FontSizemd
                style={{
                  margin: "10px 0",
                }}
              >
                {userInfo.email}
              </FontSizemd>
              이전 비밀번호
              <input type="text" id="originpw" />
              새로운 비밀번호
              <input type="text" id="updatepw" />
              <div
                style={{
                  margin: "15px 0",
                  width: "90%",
                  height: "5%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <UserEditBtn onClick={updatePw}>완료</UserEditBtn>
                <UserEditBtn
                  onClick={() => {
                    setListMode("mypage");
                  }}
                >
                  뒤로가기
                </UserEditBtn>
              </div>
            </div>
          </div>
        )}
        {listMode === "detail" && (
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
            <button
              style={{ width: "100px", height: "20px" }}
              onClick={() => {
                setListMode("mypage");
              }}
            >
              마이페이지로 바꾸기
            </button>
            <span>섹스머신 조성현</span>
          </div>
        )}
      </div>
    </>
  );
};
// motion block
export const MotionMypageWrapper = motion(MypageContainer);

export const MotionMypageBox = motion(MypageBox);
