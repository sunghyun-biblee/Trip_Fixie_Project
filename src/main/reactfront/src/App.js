import Main from "./routers/Main";
import NotFound from "./routers/NotFound";
import Login from "./routers/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Trip from "./routers/Trip";
import Register from "./routers/Register";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main></Main>}></Route>
          <Route path="/notfound" element={<NotFound></NotFound>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/trip" element={<Trip></Trip>}></Route>
          <Route path="/help" element={<Main></Main>}></Route>
          <Route path="/how" element={<Main></Main>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
