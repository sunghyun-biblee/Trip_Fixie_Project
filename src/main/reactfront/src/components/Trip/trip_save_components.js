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
export const FontSizesm = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
`;
export const FontSizemd = styled.p`
  font-size: 2.5rem;
`;

export const FontSizeLg = styled.p`
  font-size: 4rem;
`;

export const SaveBox = styled.div`
  height: 100vh;
  padding: 3rem 2rem 0 1rem;
  margin-left: 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const SaveWrapper = styled.div`
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 1.5rem;
  width: 100%;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  flex-direction: column;
`;
export const SaveTextItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  p {
    font-size: 2.5rem;
    font-weight: 700;
  }
  span {
    font-size: 2rem;
    font-weight: 600;
  }
`;

export const SaveTourListBox = styled.div`
  width: 100%;
  height: 50vh;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    height: 30%;
    border-radius: 1rem;
    background-color: #5ea3ec;
  }
  &::-webkit-scrollbar-track {
    border-radius: 1rem;
    background-color: rgba(33, 122, 244, 0.1);
  }
`;

export const TourListItems = styled.div`
  font-size: 1rem;
  padding: 0.5rem 1.1rem 0.5rem 0.5rem;
  margin-top: 1rem;
`;
export const SaveInput = styled.input`
  font-size: 1.5rem;
  color: #0a0b12;

  padding: 1rem 2rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  &::placeholder {
    color: #0a0b12;
  }
  &:focus {
    outline: none;
  }
`;
export const SaveBtn = styled.button`
  color: #f0f4f5;
  background-color: #5ea3ec;
  font-size: 1.5rem;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  width: 25%;
  cursor: pointer;
`;
export const SaveItemContainer = styled.div`
  width: 260px;
  height: 300px;
  border: 1px solid black;
`;
export const SaveItemUl = styled.ul`
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
`;
export const SaveTextArea = styled.textarea`
  height: 20%;
  margin-top: 1rem;
  resize: none;
  border: 2px solid rgba(0, 0, 0, 0.1);
  font-size: 1.3rem;
  padding: 1rem;
  &:focus {
    outline: none;
  }
`;
export const CompelteBox = styled.div`
  height: 10%;
  margin-top: 1rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  span {
    font-size: 1.5rem;
  }
`;
