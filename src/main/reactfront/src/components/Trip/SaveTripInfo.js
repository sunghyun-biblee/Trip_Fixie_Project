import { useEffect, useState } from "react";
import { ModeController } from "./TripComponents";
import {
  AlarmText,
  ModalAlarmClickImg,
  ModalAlarmCloseImg,
  ModeControllImg,
  ModeControllerAlarm,
  SaveBox,
  SaveContainer,
  SaveTextItems,
  SaveTourUl,
  SaveTourLi,
  FontSizesm,
  SaveWrapper,
  SaveTourListBox,
  TourListItems,
  SaveInput,
  SaveBtn,
  SaveItemUl,
  SaveTextArea,
  CompelteBox,
  FontSizemd,
} from "./trip_save_components";
import { AnimatePresence, motion } from "framer-motion";
import { auth } from "../../firebase";
import axios from "axios";
import styled from "styled-components";
import { is } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

const MotionSaveContainer = motion(SaveContainer);
const MotionListItems = motion(TourListItems);
const SaveListVariants = {
  initial: { scale: 0.5 },
  inItem: { scale: 1 },
};
const variants = {
  small: { width: "0px" },
  large: { width: "500px" },
};
export function SaveTripInfo({
  dateinfo,
  selectedAreaName,
  saveTourList,
  handleDeleteList,
  isSlideMode,
  setMygeolocation,
  handleSlidemode,
}) {
  const navi = useNavigate();
  const [isAlarm, setIsAlarm] = useState(true);
  const [saveMode, setSaveMode] = useState("tour");
  const [isCompelte, setIsCompelte] = useState(false);
  const saveServer = () => {
    const ftitle = document.getElementById("ftitle").value;
    const notepad = document.getElementById("notepad").value;
    if (auth.currentUser) {
      auth.onAuthStateChanged((user) => {
        console.log("adfdsafdafadf");
        console.log(saveTourList);
        console.log(user.uid);
        console.log(ftitle);
        axios
          .post("/test/addFavorite", {
            saveTourList: { saveTourList },
            uid: user.uid,
            ftitle: ftitle,
            fstart: dateinfo.startDay,
            fend: dateinfo.endDay,
            farea: selectedAreaName.mainAreaName,
            fdate: new Date()
              .toISOString()
              .replace(/-/g, "")
              .replace("T", "")
              .replace(/:/g, "")
              .replace("Z", "")
              .replace(".", ""),
            fnotepad: notepad,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error("favorite오류", error);
          });
      });
      setIsCompelte(true);
    } else {
      alert("로그인이 필요합니다.");
    }
  };
  const gomypage = () => {
    navi("/mypage");
  };
  const modeChange = (e) => {
    const targetId = e.target.id;
    if (targetId === "tour" || targetId === "festival" || targetId === "mt") {
      setSaveMode(targetId);
    }
  };
  useEffect(() => {
    setIsCompelte(false);
  }, [saveTourList]);
  console.log(saveMode);
  console.log(saveTourList);
  console.log(isCompelte);
  return (
    <div>
      <AnimatePresence>
        <MotionSaveContainer
          className={isSlideMode ? "on" : null}
          initial="small"
          animate={isSlideMode ? "large" : "true"}
          variants={variants}
        >
          <SaveBox>
            {dateinfo.endDay && (
              <SaveWrapper>
                <div>
                  {dateinfo.endDay && (
                    <>
                      <SaveTextItems>
                        <FontSizesm style={{ color: "#0071B0" }}>
                          일정
                        </FontSizesm>
                        <span>
                          {dateinfo.startDay}
                          {dateinfo.startDayofWeek} ~ {dateinfo.endDay}
                          {dateinfo.endDayofWeek}
                        </span>
                      </SaveTextItems>
                    </>
                  )}
                  {selectedAreaName.mainAreaName && (
                    <SaveTextItems style={{ marginTop: "1rem" }}>
                      <FontSizesm>목적지</FontSizesm>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>{selectedAreaName.mainAreaName}</span>
                        <span style={{ paddingLeft: "3rem" }}>
                          {selectedAreaName.subAreaName}
                        </span>
                      </div>
                    </SaveTextItems>
                  )}
                </div>
                {saveTourList.length > 0 ? (
                  <>
                    <div>
                      <SaveItemUl>
                        <li>
                          <FontSizesm
                            style={{
                              padding: "2.5rem 0 1rem 0",
                            }}
                            id="tour"
                            onClick={modeChange}
                          >
                            관광지
                          </FontSizesm>
                        </li>
                        <li>
                          <FontSizesm
                            style={{
                              padding: "2.5rem 0 1rem 0",
                            }}
                            id="festival"
                            onClick={modeChange}
                          >
                            축제
                          </FontSizesm>
                        </li>
                        <li>
                          <FontSizesm
                            style={{
                              padding: "2.5rem 0 1rem 0",
                            }}
                            id="mt"
                            onClick={modeChange}
                          >
                            숙소
                          </FontSizesm>
                        </li>
                      </SaveItemUl>

                      <Activebar saveMode={saveMode}></Activebar>
                    </div>
                    {saveMode === "tour" && (
                      <SaveTourListBox
                        className="con"
                        style={{ overflowY: "scroll", overflowX: "hidden" }}
                      >
                        {saveTourList.map(
                          (tour, index) =>
                            tour.contenttypeid === "12" && (
                              <MotionListItems
                                key={tour.contentid}
                                variants={SaveListVariants}
                                initial="initial"
                                animate="inItem"
                                onClick={() => {
                                  setMygeolocation({
                                    lat: tour.clatitude,
                                    long: tour.clongitude,
                                  });
                                }}
                                style={{ fontSize: "2rem" }}
                              >
                                <div
                                  style={{
                                    boxShadow:
                                      "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "1rem",
                                    borderRadius: "10px",
                                  }}
                                >
                                  <div>
                                    <img
                                      src={
                                        tour.cfirstimage
                                          ? tour.cfirstimage
                                          : "/img/TourSpot_No_IMG.svg"
                                      }
                                      alt=""
                                      style={{
                                        width: "80px",
                                        height: "80px",
                                        borderRadius: "10px",
                                      }}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      width: "100%",
                                    }}
                                  >
                                    <div style={{ padding: "1.5rem" }}>
                                      <FontSizesm>{tour.ctitle}</FontSizesm>
                                      <p style={{ fontSize: "1.5rem" }}>
                                        {tour.caddr1}
                                      </p>
                                    </div>
                                    <img
                                      src="/img/modalAlarm_Close.png"
                                      alt=""
                                      onClick={() => {
                                        handleDeleteList(tour.contentid);
                                      }}
                                      style={{
                                        paddingLeft: "0.5rem",
                                        width: "30px",
                                        height: "30px",
                                        cursor: "pointer",
                                      }}
                                    />
                                  </div>
                                </div>
                              </MotionListItems>
                            )
                        )}
                      </SaveTourListBox>
                    )}
                    {saveMode === "festival" && (
                      <SaveTourListBox
                        className="con"
                        style={{ overflowY: "scroll", overflowX: "hidden" }}
                      >
                        {saveTourList.map(
                          (tour, index) =>
                            tour.contenttypeid !== "12" &&
                            tour.contenttypeid !== "32" && (
                              <MotionListItems
                                variants={SaveListVariants}
                                key={index}
                                initial="initial"
                                animate="inItem"
                                style={{ fontSize: "2rem" }}
                                onClick={() => {
                                  setMygeolocation({
                                    lat: tour.clatitude,
                                    long: tour.clongitude,
                                  });
                                }}
                              >
                                <div
                                  style={{
                                    boxShadow:
                                      "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "1rem",
                                    borderRadius: "10px",
                                  }}
                                >
                                  <div>
                                    <img
                                      src={
                                        tour.cfirstimage
                                          ? tour.cfirstimage
                                          : "/img/TourSpot_No_IMG.svg"
                                      }
                                      alt=""
                                      style={{
                                        width: "80px",
                                        height: "80px",
                                        borderRadius: "10px",
                                        objectFit: "cover",
                                      }}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      width: "100%",
                                    }}
                                  >
                                    <div style={{ padding: "1.5rem" }}>
                                      <FontSizesm>{tour.ctitle}</FontSizesm>
                                      <p style={{ fontSize: "1.5rem" }}>
                                        {tour.caddr1}
                                      </p>
                                    </div>
                                    <img
                                      src="/img/modalAlarm_Close.png"
                                      alt=""
                                      onClick={() => {
                                        handleDeleteList(tour.contentid);
                                      }}
                                      style={{
                                        paddingLeft: "0.5rem",
                                        width: "30px",
                                        height: "30px",
                                        cursor: "pointer",
                                      }}
                                    />
                                  </div>
                                </div>
                              </MotionListItems>
                            )
                        )}
                      </SaveTourListBox>
                    )}
                    {saveMode === "mt" && (
                      <SaveTourListBox
                        className="con"
                        style={{ overflowY: "scroll", overflowX: "hidden" }}
                      >
                        {saveTourList.map(
                          (tour, index) =>
                            tour.contenttypeid === "32" && (
                              <MotionListItems
                                variants={SaveListVariants}
                                key={index}
                                initial="initial"
                                animate="inItem"
                                style={{ fontSize: "2rem" }}
                                onClick={() => {
                                  setMygeolocation({
                                    lat: tour.clatitude,
                                    long: tour.clongitude,
                                  });
                                }}
                              >
                                <div
                                  style={{
                                    boxShadow:
                                      "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "1rem",
                                    borderRadius: "10px",
                                  }}
                                >
                                  <div>
                                    <img
                                      src={
                                        tour.cfirstimage
                                          ? tour.cfirstimage
                                          : "/img/TourSpot_No_IMG.svg"
                                      }
                                      alt=""
                                      style={{
                                        width: "80px",
                                        height: "80px",
                                        borderRadius: "10px",
                                        objectFit: "cover",
                                      }}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      width: "100%",
                                    }}
                                  >
                                    <div style={{ padding: "1.5rem" }}>
                                      <FontSizesm>{tour.ctitle}</FontSizesm>
                                      <p style={{ fontSize: "1.5rem" }}>
                                        {tour.caddr1}
                                      </p>
                                    </div>
                                    <img
                                      src="/img/modalAlarm_Close.png"
                                      alt=""
                                      onClick={() => {
                                        handleDeleteList(tour.contentid);
                                      }}
                                      style={{
                                        paddingLeft: "0.5rem",
                                        width: "30px",
                                        height: "30px",
                                        cursor: "pointer",
                                      }}
                                    />
                                  </div>
                                </div>
                              </MotionListItems>
                            )
                        )}
                      </SaveTourListBox>
                    )}

                    <FontSizesm>여행메모</FontSizesm>
                    <SaveTextArea
                      id="notepad"
                      placeholder="메모(선택사항)"
                    ></SaveTextArea>

                    {isCompelte === true ? (
                      <CompelteBox>
                        <FontSizemd>저장되었습니다 !</FontSizemd>
                        <FontSizesm style={{ paddingTop: "0.5rem" }}>
                          저장하신정보는{" "}
                          <span
                            style={{
                              color: "#132B89",
                              borderBottom: "2px solid #132B89",
                              cursor: "pointer",
                            }}
                            onClick={gomypage}
                          >
                            마이페이지
                          </span>{" "}
                          에서 확인가능합니다
                        </FontSizesm>
                      </CompelteBox>
                    ) : (
                      <form
                        onSubmit={saveServer}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "1rem",
                          marginTop: "5rem",
                        }}
                      >
                        <SaveInput
                          type="text"
                          id="ftitle"
                          placeholder="별명을 지어주세요"
                          autoComplete="off"
                          maxlength="13"
                          required
                        ></SaveInput>
                        <SaveBtn type="submit">저장</SaveBtn>
                      </form>
                    )}
                  </>
                ) : null}
              </SaveWrapper>
            )}
          </SaveBox>

          <ModeController>
            <ModeControllImg
              src="/img/Right.svg"
              className={isSlideMode ? "on" : null}
              onClick={handleSlidemode}
            />
            {isAlarm && !isSlideMode ? (
              <ModeControllerAlarm>
                <ModalAlarmClickImg src="/img/modalAlarm_Click.png" alt="" />
                <AlarmText>
                  버튼을 클릭하여 현재 정보를 <br />
                  확인할 수 있습니다
                </AlarmText>
                <ModalAlarmCloseImg
                  src="/img/modalAlarm_Close.png"
                  onClick={() => {
                    setIsAlarm(false);
                  }}
                />
              </ModeControllerAlarm>
            ) : // <div>X</div>
            null}
          </ModeController>
        </MotionSaveContainer>
      </AnimatePresence>
    </div>
  );
}

const Activebar = styled.div`
  width: 142.5px;
  height: 3px;
  transition: all 0.5s;

  background-color: ${(props) => {
    if (props.saveMode === "tour") {
      return "#52C2F2";
    } else if (props.saveMode === "festival") {
      return "#EC6E4C";
    } else if (props.saveMode === "mt") {
      return "#41B74F";
    } else {
      return "#f0f0f0"; // 기본 값
    }
  }};
  transform: ${(props) => {
    if (props.saveMode === "tour") {
      return "translateX(0)";
    } else if (props.saveMode === "festival") {
      return "translateX(142.5px)";
    } else if (props.saveMode === "mt") {
      return "translateX(283px)";
    } else {
      return "translateX(0)"; // 기본 값
    }
  }};
`;
