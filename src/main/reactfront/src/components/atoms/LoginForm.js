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

  const onLogin = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
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

  const onClick = (event) => {
    event.preventDefault();
    navigate("/Register");
  };

  const onCancelClick = () => {
    closeModal();
  };

  return (
    <div className="LoginForm_container">
      <h1 className="LoginText">Login 👪</h1>
      <form className="LoginForm" onSubmit={onLogin}>
        <input
          className="Login_Input"
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
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
        <input className="Content_Input" type="submit" value="Login"></input>
        <input
          className="Content_Input"
          type="button"
          value="Register"
          onClick={onClick}
        ></input>
        <input
          className="Content_Input"
          type="button"
          value="취소"
          onClick={onCancelClick}
        ></input>
      </form>
    </div>
  );
}

export default LoginForm;
