import React, { useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
import "./css/LoginForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm({ closeModal }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onLogin = async (event) => {
    event.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("sex");
        console.log(user);

        navigate("/trip");

        // ...
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

  const onCreateAccount = (event) => {
    event.preventDefault();
    navigate("/Register");
  };

  const onCancelClick = () => {
    closeModal();
  };

  const signUpGithub = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((data) => {
        console.log("성공");
        console.log(data);
      })
      .catch((err) => {
        console.log("로그인 실패");
        console.log(err);
      })
      .finally(() => {
        if (auth.currentUser) {
          console.log(auth.currentUser);
          const uid = auth.currentUser.uid;
          const user = auth.currentUser;

          axios
            .get("/test/selectUidAll")
            .then((response) => {
              console.log(response);

              if (response.data.includes(uid)) {
                console.log("이미 가입되어 있음");
                navigate("/trip");
                return;
              } else {
                axios
                  .post("/test/signup", {
                    uid: user.uid,
                    email: user.email,
                    name: user.displayName,
                    nickname: user.displayName,
                    profile: user.photoURL,
                  })
                  .then((response) => {
                    console.log("서버 성공");
                    console.log(response);
                    navigate("/trip");
                  })
                  .catch((error) => {
                    console.log("서버 실패");
                    console.log(error);
                  });
              }
            })
            .catch((error) => {
              console.log("서버 실패");
              console.log(error);
            });
        }
      });
  };
  const signUpGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((data) => {
        console.log("성공");
        console.log(data);
      })
      .catch((err) => {
        console.log("로그인 실패");
        console.log(err);
      })
      .finally(() => {
        if (auth.currentUser) {
          console.log(auth.currentUser);
          const uid = auth.currentUser.uid;
          const user = auth.currentUser;

          axios
            .get("/test/selectUidAll")
            .then((response) => {
              console.log(response);

              if (response.data.includes(uid)) {
                console.log("이미 가입되어 있음");
                navigate("/trip");
                return;
              } else {
                axios
                  .post("/test/signup", {
                    uid: user.uid,
                    email: user.email,
                    name: user.displayName,
                    nickname: user.displayName,
                    profile: user.photoURL,
                  })
                  .then((response) => {
                    console.log("서버 성공");
                    console.log(response);
                    navigate("/trip");
                  })
                  .catch((error) => {
                    console.log("서버 실패");
                    console.log(error);
                  });
              }
            })
            .catch((error) => {
              console.log("서버 실패");
              console.log(error);
            });
        }
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="LoginForm_container">
        <div className="Login_Background">
          <img src="/img/login_Background.jpg" alt="" />
        </div>
        <div className="LoginBox">
          <div className="LoginWrapper">
            <form className="LoginForm" onSubmit={onLogin}>
              <div style={{ width: "50%", color: "#f0f4f5" }}>
                <h1 className="LoginText">Login </h1>
              </div>
              <input
                className="Login_Input"
                onChange={onChange}
                name="email"
                value={email}
                placeholder="Your Email"
                type="email"
                required
                autoComplete="off"
              ></input>
              <input
                className="Login_Input"
                onChange={onChange}
                name="password"
                value={password}
                placeholder="password of at least 6 characters"
                type="password"
                autoComplete="off"
                required
              ></input>

              <input
                className="Content_Input "
                type="submit"
                value="Login"
              ></input>
              <input
                className="Content_Input "
                type="button"
                value="gitHub"
                onClick={signUpGithub}
              ></input>
              <input
                className="Content_Input "
                type="button"
                value="google"
                onClick={signUpGoogle}
              ></input>
              <div className="Registe_Box">
                <p>Don't have Account?</p>
                <input
                  className="Register"
                  type="button"
                  value="Create Account"
                  onClick={onCreateAccount}
                ></input>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
