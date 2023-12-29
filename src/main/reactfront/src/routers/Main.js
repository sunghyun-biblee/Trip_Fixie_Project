import MainSection from "../components/MainSection";
import Navi from "../components/Navi";
import "../css/Main.css";

function Main() {
  return (
    <div className="main_container">
      <Navi />
      <MainSection />
    </div>
  );
}

export default Main;
