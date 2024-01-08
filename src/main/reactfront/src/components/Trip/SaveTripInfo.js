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
  Saveitems,
} from "./trip_save_components";
import { motion } from "framer-motion";

const MotionSaveContainer = motion(SaveContainer);

const variants = {
  small: { width: "30px" },
  large: { width: "300px" },
};
export function SaveTripInfo({ dateinfo, selectedAreaName }) {
  const [isSlideMode, setIsSlideMode] = useState(false); // 서브창 확장,
  const [isAlarm, setIsAlarm] = useState(true);
  const handleSlidemode = () => {
    setIsSlideMode((mode) => !mode);
  };

  return (
    <>
      <MotionSaveContainer
        className={isSlideMode ? "on" : null}
        initial="small"
        animate={isSlideMode ? "large" : "true"}
        variants={variants}
      >
        <SaveBox>
          <Saveitems>
            <SaveTextItems>
              {dateinfo.startDay}
              {dateinfo.startDayofWeek}
            </SaveTextItems>
            <SaveTextItems>
              {dateinfo.endDay}
              {dateinfo.endDayofWeek}
            </SaveTextItems>
            <SaveTextItems>{selectedAreaName.mainAreaName}</SaveTextItems>
            <SaveTextItems>{selectedAreaName.subAreaName}</SaveTextItems>
          </Saveitems>
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
    </>
  );
}
