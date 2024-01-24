import { useEffect, useState, useRef } from "react";

import {
  EditInput,
  MypageBox,
  MypageContainer,
  MypageHeader,
  MypageSection,
  MypageWrapper,
  Pagenagtion,
  TripPlanList,
  UserEditBtn,
  UserIMG,
  UserImgBox,
  UserInfo,
  UserInfoItem,
  UserInfoList,
  Detail,
  DetailContainer,
  MypageBackGround,
  BackgroundIcon,
  MypageMenu,
  MypageList,
  ShowListInfo,
} from "./mypage_components";
import { auth } from "../../firebase";
import axios from "axios";
import { motion } from "framer-motion";
const MotionContainer = motion(MypageContainer);
export function Mypage() {
  const [userInfo, setUserInfo] = useState({
    name: "biblee",
    email: "biblee@biblee.co",
  });
  const [mypageMode, setMypageMode] = useState("plan");
  const [isEdit, setIsEdit] = useState(false);
  const [favoriteArray, setFavoriteArray] = useState([]);
  const [favorNickname, setFavorNickname] = useState();
  const [favorFid, setFavorFid] = useState();
  const [isDetail, setIsDetail] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);
  const [favoriteArea, setFavoriteArea] = useState();
  const detailBackground = useRef();
  const handleAddFavorite = (favorite) => {
    setFavoriteArray((prevList) => [...prevList, favorite]);
  };
  const [listMode, setListMode] = useState("mypage");

  const [page, setPage] = useState(1); // 페이지
  const postLimit = 5; // 페이지당 보여줄 포스트 갯수
  /*useState를 사용하여 page의 유동적인 값에 대해 초기값을 1로 설정해두었고, posts가 보이게 할 최대한의 갯수를 5개로 설정해두었다.*/
  const totalPlan = favoriteArray.length; // 총 여행계획 갯수
  const pageOfLast = page * postLimit; // 페이지마다 마지막 포스트 위치
  const pageOfFirst = pageOfLast - postLimit; // 페이지마다 첫 포스트 위치
  //시작점과 끝점을 구하는 offset > 출력되는 포스트를 자르기위해

  const planData = (testArray) => {
    if (testArray) {
      let result = testArray.slice(pageOfFirst, pageOfLast);
      return result;
    }
    //   포스트를 5개 단위로 잘라서 props로 전달
  };

  const EditMode = () => {
    if (isEdit) {
      const value = document.getElementById("EditInput").value;
      setUserInfo({ name: value, email: "biblee@biblee.co" });
    }
    setIsEdit((mode) => !mode);
  };

  useEffect(() => {
    const uid = auth.currentUser.uid; //프로필불러오기
    axios
      .post("/test/loadProfile", {
        uid: uid,
      })
      .then((response) => {
        setUserInfo({
          name: response.data.uname,
          email: response.data.uemail,
        });
        console.log(response);
      })
      .catch((error) => {
        console.error("profile오류", error);
      });
    console.log("sex");
    axios
      .post("/test/loadFavorite", {
        uid: uid,
      })
      .then((response) => {
        setFavoriteArray([]);
        console.log(response);
        const list = response.data;
        list.map((favor, index) =>
          handleAddFavorite({
            id: index,
            startDay: favor.fstart,
            endDay: favor.fend,
            ftitle: favor.ftitle,
            area: favor.farea,
            fid: favor.fid,
          })
        );
      })
      .catch((error) => {
        console.error("favorite오류", error);
      });
  }, [auth]);
  console.log("페이볼어레이");
  console.log(favoriteArray);

  useEffect(() => {
    axios
      .post("/test/loadFavoriteList", favorFid)
      .then((response) => {
        console.log("wlsdlq");
        console.log(response.data);
        const favorlist = response.data;
        const flist = favorlist.map((list) => ({
          contentid: list.contentid,
          ctitle: list.ctitle,
          caddr: list.caddr,
          ceventstartdate: list.ceventstartdate,
          ceventenddate: list.ceventenddate,
          cfirstimage: list.cfirstimage,
          csecondimage: list.csecondimage,
          clatitude: list.clatitude,
          clongitude: list.clongitude,
          ctel: list.ctel,
          contenttypeid: list.contenttypeid,
        }));
        setFavoriteList(flist);
      })
      .catch((error) => {
        console.error("favorlist오류", error);
      });

    axios
      .post("/test/getFavorArea", favorFid)
      .then((response) => {
        const data = response.data;
        setFavoriteArea(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [favorFid]);
  console.log(favoriteArea);
  console.log(favoriteList);
  return (
    <MypageBackGround>
      <MotionContainer
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <MypageWrapper>
          <MypageBox>
            <MypageMenu setMypageMode={setMypageMode} />
          </MypageBox>

          {mypageMode === "plan" ? (
            <>
              <MypageBox className="planlist">
                <MypageList
                  data={planData(favoriteArray)}
                  setFavorNickname={setFavorNickname}
                  setIsDetail={setIsDetail}
                  setFavorFid={setFavorFid}
                  page={page}
                  setPage={setPage}
                  postLimit={postLimit}
                  totalPlan={totalPlan}
                  userInfo={userInfo}
                  setListMode={setListMode}
                ></MypageList>
              </MypageBox>
              <MypageBox
                style={{ backgroundColor: "white" }}
                className="showlistInfo"
              >
                <ShowListInfo
                  favoriteArea={favoriteArea}
                  favoriteList={favoriteList}
                  userInfo={userInfo}
                  setListMode={setListMode}
                  listMode={listMode}
                ></ShowListInfo>
              </MypageBox>
            </>
          ) : mypageMode === "faq" ? (
            <>
              <MypageBox className="planlist">
                <MypageList
                  data={planData(favoriteArray)}
                  setFavorNickname={setFavorNickname}
                  setIsDetail={setIsDetail}
                  setFavorFid={setFavorFid}
                  page={page}
                  setPage={setPage}
                  postLimit={postLimit}
                  totalPlan={totalPlan}
                  userInfo={userInfo}
                  setListMode={setListMode}
                ></MypageList>
              </MypageBox>
              <MypageBox
                style={{ backgroundColor: "white" }}
                className="showlistInfo"
              >
                <ShowListInfo
                  userInfo={userInfo}
                  setListMode={setListMode}
                  listMode={listMode}
                ></ShowListInfo>
              </MypageBox>
            </>
          ) : null}
        </MypageWrapper>
      </MotionContainer>
      <BackgroundIcon className="left"></BackgroundIcon>
      <BackgroundIcon className="right"></BackgroundIcon>
    </MypageBackGround>
  );
}

// 유저 프로필
{
  /* <UserInfo>
                <UserImgBox>
                  <UserIMG src="/img/source1.jpg"></UserIMG>
                </UserImgBox>

                <UserInfoList>
                  {isEdit ? (
                    <EditInput
                      type="text"
                      placeholder={userInfo.name}
                      id="EditInput"
                    />
                  ) : (
                    <UserInfoItem>
                      <p>{userInfo.name}</p>
                    </UserInfoItem>
                  )}
                  <UserInfoItem>
                    <p>{userInfo.email}</p>
                  </UserInfoItem>
                  <UserInfoItem>
                    <p>Hello</p>
                  </UserInfoItem>
                </UserInfoList>
                <UserEditBtn onClick={EditMode}>
                  {isEdit ? "확인" : "정보 수정"}
                </UserEditBtn>
              </UserInfo> */
}

// {isDetail ? (
//   <DetailContainer
//     className="eeeeeeee"
//     ref={detailBackground}
//     onClick={(e) => {
//       if (e.target === detailBackground.current) {
//         setIsDetail(false);
//       }
//     }}
//   >
//     <Detail
//       nickname={favorNickname}
//       favoriteList={favoriteList}
//     ></Detail>
//   </DetailContainer>
// ) : null}
