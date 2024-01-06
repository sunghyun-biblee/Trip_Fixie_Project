import styled from "styled-components";
import { useState } from "react";
import { ModeController } from "./TripComponents";
const Img = styled.img`
  width: 30px;
  height: 30px;
  transition: transform 0.5s;
  &.on {
    transform: rotate(0.5turn);
  }
`;
const SaveContainer = styled.div``;

const SaveBox = styled.div`
  height: 50%;
  background-color: beige;
`;
const Saveitems = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
export function SaveTripInfo({ dateinfo, selectedAreaName }) {
  const [slidemode, setSlidemode] = useState(false); // 서브창 확장,
  const handleSlidemode = () => {
    setSlidemode((mode) => !mode);
  };
  console.log(dateinfo);
  console.log(selectedAreaName);
  return (
    <SaveContainer className={slidemode ? "on" : null}>
      <SaveBox>
        <Saveitems>
          <div style={{ fontSize: "30px" }}>
            {dateinfo.startDay}
            {dateinfo.startDayofWeek}
          </div>
          <div style={{ fontSize: "30px" }}>
            {dateinfo.endDay}
            {dateinfo.endDayofWeek}
          </div>
          <div style={{ fontSize: "30px" }}>
            {selectedAreaName.mainAreaName}
          </div>
          <div style={{ fontSize: "30px" }}>{selectedAreaName.subAreaName}</div>
        </Saveitems>
      </SaveBox>

      <ModeController onClick={handleSlidemode}>
        <Img src="/img/Left.svg" className={slidemode ? "on" : null} />
      </ModeController>
    </SaveContainer>
  );
}
