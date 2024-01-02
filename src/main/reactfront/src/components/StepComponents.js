import styled from "styled-components";

export const StepContainer = styled.div`
  padding-top: 62px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const Stepbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  cursor: pointer;
`;
export const StepUl = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const StepLi = styled.li`
  color: gray;
  width: 110px;
  text-align: center;
  padding: 32px 0;
  list-style: none;
  text-transform: uppercase;
  font-weight: 600;
`;
