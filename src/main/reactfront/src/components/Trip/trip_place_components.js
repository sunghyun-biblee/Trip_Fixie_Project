import styled from "styled-components";
import { motion } from "framer-motion";
import "../../fonts/font.css";

export const TripWrapper = styled.div`
  display: flex;
  height: 100vh;
  font-family: "NotoSans";
`;
export const Tripbox = styled.div`
  width: 100%;
`;
export const Li = styled.li`
  font-size: 1.4rem;
  text-align: center;
  padding: 10px 0;
  color: darkcyan;
  border: 1px solid #27d7ea;
  border-radius: 5px;
  cursor: pointer;
  background-color: #cbf0f4;
`;
export const Areabox = styled.div`
  display: grid;
  list-style: none;
  grid-template-columns: repeat(4, 24%);
  padding: 10px 0 0 0;
  gap: 4px;
  overflow: hidden;

  &.on {
    display: flex;
    justify-content: center;
  }
`;
export const PlaceWrapper = styled(TripWrapper)`
  padding-top: 2rem;

  height: 100%;
`;
export const SelectAreaUl = styled.ul`
  padding: 10px 0 0 0;
  overflow: hidden;
  width: 100%;
`;

export const TripArea = styled(motion.div)`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Motion_AreaName = styled(motion.div)`
  position: relative;

  height: 100px;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
