import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import axios from "axios";
import "./css/RegisterForm.css";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [profile, setProfile] = useState("");
  const [uid, setUid] = useState("");
  const navigate = useNavigate();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "name") {
      setName(value);
    } else if (name === "nickname") {
      setNickname(value);
    } else {
      setProfile(value);
    }
  };
  const signUp = async (event) => {
    event.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);
        setUid(user.uid);
        serverSignUp(user.uid);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        // ..
      })
      .finally(()=>{
        navigate("/trip");
      })
  };
  console.log("");

  const serverSignUp = (userid) => {
    axios
      .post("/test/signup", {
        uid: userid,
        email: email,
        name: name,
        nickname: nickname,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("서버회원가입오류", error);
      });
  };

  // useEffect(() => {
  //   if (uid && email && name && nickname) {
  //     // uid 값이 존재하는 경우에만 serverSignUp 함수 실행
  //     serverSignUp();
  //   }
  // }, [uid, email, name, nickname]); // uid 값이 변경될 때마다 useEffect 내의 코드 실행
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="regist_Container">
        <div className="regist_BackgroundImg">
          <img src="/img/registe_Background.jpg" alt="" />
        </div>
        <div className="register_box_wrapper">
          <div className="register_box">
            <h1>Create Account</h1>
            <div className="register_form">
              <label>EMAIL</label>
              <input
                type="email"
                name="email"
                placeholder="Write Your Email"
                onChange={onChange}
                autoComplete="off"
              />
              <label>PASSWORD</label>
              <input
                type="password"
                name="password"
                placeholder="Write Password"
                onChange={onChange}
                autoComplete="off"
              />
              <label>NAME</label>
              <input
                type="text"
                name="name"
                placeholder="Write Your Name"
                onChange={onChange}
                autoComplete="off"
              />
              <label>NICKNAME</label>
              <input
                type="text"
                name="nickname"
                placeholder="Write Your NickName"
                onChange={onChange}
                autoComplete="off"
              />

              <input
                type="button"
                className="signup"
                value="Sign Up"
                onClick={signUp}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
