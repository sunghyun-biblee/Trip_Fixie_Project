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
  Saveitems,
  SaveItemContainer,
} from "./trip_save_components";
import { motion } from "framer-motion";
import { auth } from "../../firebase";
import axios from "axios";
import { list } from "firebase/storage";


const MotionSaveContainer = motion(SaveContainer);

const variants = {
  small: { width: "30px" },
  large: { width: "300px" },
};
export function SaveTripInfo({ dateinfo, selectedAreaName, saveTourList, isSlideMode, handleSlidemode }) {
  const [isAlarm, setIsAlarm] = useState(true);
   
  const saveServer = ()=>{
    const ftitle = document.getElementById("ftitle").value;
    
    auth.onAuthStateChanged((user) =>{
        console.log("adfdsafdafadf");
        console.log(saveTourList);
        console.log(user.uid);
        console.log(ftitle);
      axios.post('/test/addFavorite',{
        saveTourList : {saveTourList},
        uid : user.uid,
        ftitle: ftitle,
        fstart: dateinfo.startDay,
        fend: dateinfo.endDay,
        farea: selectedAreaName.mainAreaName,
      })
      .then(response =>{
        console.log(response);
      })
      .catch(error =>{
        console.error("favorite오류", error);
      });
    })
  }

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
           
              <>
                <SaveItemContainer>
                {saveTourList.map((tour, index)=>(
                  tour.contenttypeid === "12" ?
                    (<SaveTextItems 
                    style={{cursor: "pointer"}}
                    key={index}>{tour.ctitle}</SaveTextItems>  
                    ): null                  
                  ))
                }
                </SaveItemContainer>        
                <SaveItemContainer>
                {saveTourList.map((tour, index)=>(
                  tour.contenttypeid === "12" ?
                    null: (<SaveTextItems 
                      style={{cursor: "pointer"}}
                      key={index}>{tour.ctitle}</SaveTextItems>  
                      )
                  ))
                }
                </SaveItemContainer> 
              </>
               
            <input type="text" id="ftitle" placeholder="별명을 지어주세요"></input>
            <button>중복확인</button>
            <button onClick={saveServer}>
              저장
            </button>
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
