import NotFound from "./routers/NotFound";
import Login from "./routers/Login";
import Trip from "./routers/Trip";
import Register from "./routers/Register";
import Loot from "./routers/Loot";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import styled from "styled-components";
import {
  // BrowserRouter,
  // Route,
  RouterProvider,
  // Routes,
  createBrowserRouter,
} from "react-router-dom";
import { Mypage } from "./components/Mypage/Mypage";
import { Loading } from "./components/atoms/Loading";

const LoadingScreen = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 100px;
  }
  img {
    margin-left: 20px;
    width: 100px;
    height: 100px;
  }
`;

const router = createBrowserRouter([
  /*  {
     path: "/", // 루트페이지
     element: (
       <ProtectedRoute>
         <Layout />
       </ProtectedRoute>
     ),
     // route에 넣을 또 다른 배열을 만드는 것
     // Outlet 구성 요소가 수행하는 작업 : / profile을 쓰면 layout과 children안에있는 path 가 profile 인 component를 출력 > <Layout/> 과 <Profile /> 차례대로 출력 > 이것이 outlet이 하는 기능 / layout.tsx에 <Outlet />를 <Profile />가 대체

     // children이 Layout에 감싸져있기때문에 "/"경로 뒤에 children 안에있는 path 경로가 들어오면 <Layout /> 컴포넌트는 무조건 출력되고 그다음 차례로 해당 경로 컴포넌트가 출력
     children: [
       {
         path: "",
         element: <Home></Home>,
       },
       {
         path: "profile",
         element: <Profile />,
       },
     ],
   },
  */
  {
    path: "/",
    element: <Loot />,
  },
  {
    path: "/notfound",
    element: <NotFound />,
  },
  {
    path: "/trip",
    element: <Trip />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/how",
    element: <Loot />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/mypage",
    element: <Mypage />,
  },
]);
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    /* wait for firebase
      firebase를 기다리기 위해서 await을 시작
      authStateReady() : 최종 인증 상태가 완료될 때 실행되는 
      promise를 return 해줌 / 즉,firebase가 쿠키와 토큰을 읽고 백엔드와 소통해서 로그인여부를 확인하는동안 기다리겠다는 뜻
 */

    await auth.authStateReady(); // 새로고침을 해도 로그인이 풀리지않도록

    setIsLoading(false);
    // setTimeout(() => setLoading(false), 2000);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen>
          <h1>Loading</h1>
          <Loading></Loading>
        </LoadingScreen>
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
}

export default App;
/*
 <BrowserRouter>
          <Routes>
            <Route path="/" element={<Loot></Loot>}></Route>
            <Route path="/notfound" element={<NotFound></NotFound>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/trip" element={<Trip />}></Route>
            <Route path="/help" element={<Loot></Loot>}></Route>
            <Route path="/how" element={<Loot></Loot>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/mypage" element={<Register></Register>}></Route>
          </Routes>
        </BrowserRouter>
         */
