import styled, { keyframes } from "styled-components";

export const ModeControllImg = styled.img`
  width: 35px;
  height: 35px;
  transition: transform 0.7s;
  &.on {
    transform: rotateY(-0.5turn);
  }
`;
export const ModeControllerAlarm = styled.div`
  position: absolute;
  right: -220px;
  height: 60px;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
`;
export const AlarmText = styled.p`
  display: block;
  font-size: 1.4rem;
  padding: 10px;
  font-weight: 900;
`;
const rotateAnimation = keyframes`
  from {
    transform: rotateX(-0.5turn) translateX(0) translateY(0)
  }
  to {
    transform: rotateX(-0.5turn) translateX(-10px) translateY(-10px)
  }
`;
export const ModalAlarmClickImg = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  top: -35%;
  left: -5%;
  transform: rotateX(-0.5turn);
  animation: ${rotateAnimation} 0.7s infinite alternate;
`;

export const ModalAlarmCloseImg = styled.img`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 25px;
  height: 25px;
  cursor: pointer;
`;
export const SaveContainer = styled.div``;

export const SaveBox = styled.div`
  height: 100vh;
`;
export const Saveitems = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
export const SaveTextItems = styled.div`
  font-size: 3rem;
`;
export const SaveItemContainer = styled.div`
  width: 260px;
  height: 300px;
  border: 1px solid black;
`;
