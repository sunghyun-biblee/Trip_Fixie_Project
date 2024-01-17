import { useState } from "react";
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
} from "./trip_save_components";
import { AnimatePresence, motion } from "framer-motion";
import { auth } from "../../firebase";
import axios from "axios";

const MotionSaveContainer = motion(SaveContainer);
const MotionListItems = motion(TourListItems);
const SaveListVariants = {
  initial: { x: "-100%" },
  inItem: { x: 0, transition: { duration: 0.3 } },
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
  const [isAlarm, setIsAlarm] = useState(true);

  const saveServer = () => {
    const ftitle = document.getElementById("ftitle").value;

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
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error("favorite오류", error);
          });
      });
    } else {
      alert("로그인이 필요합니다.");
    }
  };
  console.log(saveTourList);
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
                          시작일
                        </FontSizesm>
                        <span>
                          {dateinfo.startDay}
                          {dateinfo.startDayofWeek}
                        </span>
                      </SaveTextItems>
                      <SaveTextItems>
                        <FontSizesm style={{ color: "#F57576" }}>
                          종료일
                        </FontSizesm>
                        <span>
                          {dateinfo.endDay}
                          {dateinfo.endDayofWeek}
                        </span>
                      </SaveTextItems>
                    </>
                  )}
                  {selectedAreaName.mainAreaName && (
                    <SaveTextItems style={{ marginTop: "2rem" }}>
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
                    <FontSizesm
                      style={{
                        paddingLeft: "1rem",
                        marginTop: "3rem",
                      }}
                    >
                      관광지
                    </FontSizesm>
                    <SaveTourListBox
                      className="con"
                      style={{ overflowY: "scroll" }}
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
                    <FontSizesm
                      style={{
                        paddingLeft: "1rem",
                        marginTop: "3rem",
                      }}
                    >
                      행사
                    </FontSizesm>
                    <SaveTourListBox
                      className="con"
                      style={{ overflowY: "scroll" }}
                    >
                      {saveTourList.map(
                        (tour, index) =>
                          tour.contenttypeid !== "12" && (
                            <MotionListItems
                              variants={SaveListVariants}
                              key={index}
                              initial="initial"
                              animate="inItem"
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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "1rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      <SaveInput
                        type="text"
                        id="ftitle"
                        placeholder="별명을 지어주세요"
                        autoComplete="off"
                      ></SaveInput>
                      <SaveBtn type="button" onClick={saveServer}>
                        저장
                      </SaveBtn>
                    </div>
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
