import styled from "styled-components";
import MainSection from "../components/MainSection";
import Navi from "../components/Navi";

import { motion } from "framer-motion";

const MainContainer = styled(motion.div)`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
function Main() {
  return (
    <MainContainer
      initial={{ opacity: 0, y: "30%" }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          type: "spring", // 스프링 효과 사용
          damping: 10, // 감쇠 설정
          stiffness: 30, // 강성 설정
          duration: 2,
        },
      }}
      exit={{ opacity: 0, y: "-100%" }}
    >
      <Navi />
      <MainSection />
    </MainContainer>
  );
}

export default Main;
