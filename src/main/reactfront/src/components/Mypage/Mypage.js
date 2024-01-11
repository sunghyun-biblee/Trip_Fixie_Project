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
  DetailContainer
} from "./mypage_components";
import styled from "styled-components";
import { auth } from "../../firebase";
import axios from "axios";
const testArraySample = [
  {
    id: 1,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명1",
    area: "울산",
  },
  {
    id: 2,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명2",
    area: "세종시",
  },
  {
    id: 3,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명3",
    area: "경기도",
  },
  {
    id: 4,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명4",
    area: "강원도",
  },
  {
    id: 5,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명5",
    area: "충청북도",
  },
  {
    id: 6,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명6",
    area: "충청남도",
  },
  {
    id: 7,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명7",
    area: "경상북도",
  },
  {
    id: 8,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명8",
    area: "서울",
  },
  {
    id: 9,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명9",
    area: "인천",
  },
  {
    id: 10,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명10",
    area: "대전",
  },
  {
    id: 11,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명11",
    area: "대구",
  },
  {
    id: 12,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명12",
    area: "광주",
  },
  {
    id: 13,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명13",
    area: "부산",
  },
  {
    id: 14,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명14",
    area: "울산",
  },
  {
    id: 15,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명15",
    area: "세종시",
  },
  {
    id: 16,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명16",
    area: "경기도",
  },
  {
    id: 17,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명17",
    area: "강원도",
  },
  {
    id: 18,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명18",
    area: "충청북도",
  },
  {
    id: 19,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명19",
    area: "충청남도",
  },
  {
    id: 20,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명20",
    area: "경상북도",
  },
  {
    id: 21,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명21",
    area: "서울",
  },
  {
    id: 22,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명22",
    area: "인천",
  },
  {
    id: 23,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명23",
    area: "대전",
  },
  {
    id: 24,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명24",
    area: "대구",
  },
  {
    id: 25,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명25",
    area: "광주",
  },
  {
    id: 26,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명26",
    area: "부산",
  },
  {
    id: 27,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명27",
    area: "울산",
  },
  {
    id: 28,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명28",
    area: "세종시",
  },
  {
    id: 29,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명29",
    area: "경기도",
  },
  {
    id: 30,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명30",
    area: "강원도",
  },
  {
    id: 31,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명31",
    area: "충청북도",
  },
  {
    id: 32,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명32",
    area: "충청남도",
  },
  {
    id: 33,
    startDay: "2022-01-02",
    endDay: "2022-01-03",
    nickname: "별명33",
    area: "경상북도",
  },
];

export function Mypage() {


  const [userInfo, setUserInfo] = useState({
    name: "biblee",
    email: "biblee@biblee.co",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [testArray, setTestArray] = useState([...testArraySample]);   //좀따 지우기
  const [favoriteArray, setFavoriteArray] = useState([]);
  const [favorNickname, setFavorNickname] = useState();
  const [favorFid, setFavorFid] = useState();
  const [isDetail, setIsDetail] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);
  const detailBackground = useRef();
  const handleAddFavorite = (favorite) =>{
    setFavoriteArray(prevList =>[...prevList, favorite]); 
  }

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
  // const load = ()=>{
  //   const uid = auth.currentUser.uid //프로필불러오기
  //   axios.post('/test/loadProfile',{
  //     uid: uid,
  //   })
  //   .then(response =>{
  //     console.log(response);
  //     console.log(response.data);
  //   })
  //   .catch(error =>{
  //     console.error("load오류", error);
  //   });
  // }

  useEffect(() =>{
    const uid = auth.currentUser.uid //프로필불러오기
    axios.post('/test/loadProfile',{
      uid: uid,
    })
    .then(response =>{
      setUserInfo({
        name: response.data.uname,
        email: response.data.uemail,
      })
      console.log(response);
    })
    .catch(error =>{
      console.error("profile오류", error);
    });
    console.log("sex")
    axios.post('/test/loadFavorite',{
      uid: uid,
    })
    .then(response =>{
      
      setFavoriteArray([]);
      console.log(response);
      const list = response.data;
      list.map((favor, index) =>(
        handleAddFavorite({
          id: index,
          startDay: favor.fstart,
          endDay: favor.fend,
          nickname: favor.ftitle,
          area: favor.farea,
          fid: favor.fid,
        })
      ))
    })
    .catch(error =>{
      console.error("favorite오류", error);
    });
  },[auth])
  console.log("페이볼어레이");
  console.log(favoriteArray);
  
  useEffect(()=>{
    axios.post('/test/loadFavoriteList', favorFid)
    .then(response =>{
      console.log(response.data);
      const favorlist = response.data;
      const flist = favorlist.map((list)=>({
        cid: list.cid,
        ctitle: list.ctitle,
        caddr: list.caddr,
        ceventstartdate: list.ceventstartdate,
        ceventenddate: list.ceventenddate,
        cfirstimage: list.cfirstimage,
        csecondimage: list.csecondimage,
        clatitude: list.clatitude,
        clongitude: list.clongitude,
        ctel: list.ctel,
      }))
      setFavoriteList(flist);
    })
    .catch(error =>{
      console.error("favorlist오류", error);
    });
  },[favorFid])

  return (
    <MypageWrapper>
      <MypageHeader>MY PlAN</MypageHeader>
      <MypageContainer>
        {/* 나의 프로필 */}
        <MypageSection>
          <MypageBox>
            <UserInfo>
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
            </UserInfo>
          </MypageBox>
        </MypageSection>
        {/* 나의 여행 계획 */}
        <MypageSection>
          <MypageBox>
            <TripPlanList data={planData(favoriteArray)}
            setFavorNickname = {setFavorNickname}
            setIsDetail = {setIsDetail}
            setFavorFid = {setFavorFid}
            ></TripPlanList>
            {/* 최대 5개까지의 plan이 한 페이지에 출력 */}
            <Pagenagtion
              page={page}
              setPage={setPage}
              postLimit={postLimit}
              totalPlan={totalPlan}
              /* 
              1. page : 현재의 page
              2. setPage : 변경될 page를 만드는 useState함수
              3. limit : 한번에 posts의 최대 갯수
            4. totalPosts : 데이터의 총 posts 갯수*/
            ></Pagenagtion>
          </MypageBox>
        </MypageSection>
        {isDetail ? (
          <DetailContainer
          ref={detailBackground}
            onClick={(e) => {
              if (e.target === detailBackground.current) {
                setIsDetail(false);
              }
            }}>
          <Detail 
            nickname={favorNickname}
            favoriteList={favoriteList}
          >
          </Detail>
        </DetailContainer>
        ) : null}
      </MypageContainer>
    </MypageWrapper>
  );
}
