import styled from "styled-components";
import fairy from "../img/fairy2.svg";
import axios from "axios";

const Img = styled.img`
  width: 15px;
  height: 15px;
`;
function TripPlace() {
  // https://openapi.naver.com/v1/search/local.json?query=상인동 내과&display=5

  // X-Naver-Client-Id : a334rOkoOaZduh1GVUcc
  //  X-Naver-Client-Secret : sRVFhnY_y7
  const getdata = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <div>
        <p>
          해당 지역 날씨는? <br /> 23"c, 흐림
        </p>

        <p>경주</p>
        <p>2024.01.02(화)~2024.01.03(수)</p>
        <div>
          <p>장소선택</p>
          <p>신규 장소 등록</p>
        </div>
        <input type="text" placeholder="장소명을 검색하세요" />
        <button>
          <Img src={fairy} alt="" />
        </button>
        <button onClick={getdata}>!@# </button>
        {/* {contents.map((items) => {
          <div>
            <img src="" alt="" />
            <div>
              <p>lorem</p>
              <span>lorem</span>
              <div>
                <div>
                  <img src="" alt="" />
                  <span>2222</span>
                </div>
                <div>
                  <img src="" alt="" />
                  <span>2222</span>
                </div>
              </div>
            </div>
            <input type="checkbox" name="" id="" />
          </div>;
        })} */}
      </div>
    </div>
  );
}

export default TripPlace;
