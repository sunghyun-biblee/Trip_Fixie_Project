import { useState } from "react";
import "../css/TripStep.css";
import { Stepbox } from "./TripComponent";

function TripStep({ onChangeMode }) {
  const [mode, setMode] = useState("date");
  const changemode = (type) => {
    console.log("!@#");
    console.log(type);
    console.log(mode);
    if (type === "date") {
      console.log("date");
      setMode("date");
    } else if (type === "place") {
      console.log("place");
      setMode("place");
    } else if (type === "mt") {
      console.log("mit");
      setMode("mt");
    }
  };
  return (
    <div className="stepcontainer">
      <div className="stepbox">
        <div>CH</div>
        <Stepbox onClick={() => changemode("date")}>
          STEP1 <br />
          날짜 확인
        </Stepbox>
        <Stepbox onClick={() => changemode("place")}>
          STEP2 <br />
          장소 선택
        </Stepbox>
        <Stepbox onClick={() => changemode("mt")}>
          STEP3 <br />
          숙소 설정
        </Stepbox>
      </div>
      <div>
        <label htmlFor="next">다음</label>
        <button id="next">123</button>
      </div>
    </div>
  );
}

export default TripStep;
