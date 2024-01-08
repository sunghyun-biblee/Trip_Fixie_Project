import { useState } from "react";
import "../css/TripStep.css";
import { Stepbox } from "./TripComponent";

function TripStep() {
  const [mode, setMode] = useState("date");
  const [lastClickedId, setLastClickedId] = useState(null);
  const onChangeMode = (event) => {
    const clickTargetId = event.target.id;
    if (clickTargetId !== "date") {
      document.getElementById("date").style.color = "gray";
      document.getElementById("date").style.transform = "scale(1)";
    }
    event.target.style.color = "#03A9F4"; //#50DCEF > 연파랑 , #03A9F4> 찐파랑
    event.target.style.fontWeight = 900;
    event.target.style.scale = 1;
    setLastClickedId(clickTargetId);
    // console.log(lastClickedId);

    if (lastClickedId && lastClickedId !== clickTargetId) {
      /*  lastClickedId가 true 이고 , lastClickedId와 clickedId 클릭한 태그의 아이디가 다르다면 이전에 클릭한태그의 아이디값을 참조하여 해당태그의 컬러색을 gray색으로 변경
       이와같은 형식이 가능한 이유는 React의 useState 훅에서 setState함수는
       비동기로 동작하며, 즉시 상태를 업데이트하지 않는다. 대신 리액트는 일련의 업데이트를 큐에 넣고, 현재 함수가 완전히 종료된 후에 큐를 처리하여 상태를 업데이트한다

       //비동기이기때문에 setState 함수를 지나쳐 다음코드를 실행하기 떄문에 다음함수가 끝난후에 함수가 적용됨

       하지만 아래와 같이 함수형으로 setState를 사용하면 이전 상태값을 기반으로 새로운 상태를 설정할 수 있으며, 이 경우 최신의 상태를 보장한다
      const [count, setCount] = useState(0);

      const handleClick = () => {
      setCount(prevCount => prevCount + 1);
      여기서의 prevCount는 업데이트 이전의 값

        */
      const lastClicked = document.getElementById(lastClickedId);
      if (lastClicked) {
        lastClicked.style.color = "gray";
        lastClicked.style.fontWeight = 600;
        lastClicked.style.scale = 0.8;
      }
    }

    if (event.target.id === "date") {
      setMode("date");
    } else if (event.target.id === "space") {
      setMode("space");
    } else if (event.target.id === "mt") {
      setMode("mt");
    }
  };
  return (
    <div className="stepcontainer">
      <div className="stepbox">
        <div>CH</div>
        <Stepbox onClick={onChangeMode} id="space">
          STEP1 <br />
          날짜 확인
        </Stepbox>
        <Stepbox onClick={onChangeMode} id="mt">
          STEP2 <br />
          장소 선택
        </Stepbox>
        <Stepbox onClick={onChangeMode} id="kr">
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
