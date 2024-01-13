import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./css/LoginForm.css";
import { useNavigate } from "react-router-dom";

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
                type="submit"
                value="gitHub"
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
