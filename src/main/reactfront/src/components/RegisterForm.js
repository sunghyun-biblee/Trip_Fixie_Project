import React, {useEffect, useState} from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";

function RegisterForm(){
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [profile, setProfile] = useState("");
    const [uid, setUid] = useState("");

    useEffect(() => {
      if (uid) { // uid 값이 존재하는 경우에만 serverSignUp 함수 실행
          serverSignUp();
      }
  }, [uid]); // uid 값이 변경될 때마다 useEffect 내의 코드 실행

    const onChange = (event)=>{
        const {
          target: { name, value },
        } = event;
        if (name === "email"){
          setEmail(value);
        } else if (name === "password"){
          setPassword(value);
        } else if (name === "name"){
          setName(value);
        } else if (name === "nickname"){
          setNickname(value);
        } else {
          setProfile(value);
        } 
      };
    const signUp = async (event) =>{
        event.preventDefault();
        
        const result = await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            console.log(user);
            setUid(user.uid);
            alert(user+"님 회원가입 되셨습니다.");
            

          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
    }

    const serverSignUp = () =>{
      
      axios.post('/test/signup',{
        uid: uid,
        email: email,
        name: name,
        nickname: nickname,
      })
      .then(response =>{
        console.log(response);
      })
      .catch(error =>{
        console.error("서버회원가입오류", error);
      });
    }

    return (
        <>
        <h1>회원가입</h1>
        <a>email<input type="email" name="email" onChange={onChange}></input></a>
        <a>password<input type="text" name="password" onChange={onChange}></input></a>
        <a>name<input type="text" name="name" onChange={onChange}></input></a>
        <a>nickName<input type="text" name="nickname" onChange={onChange}></input></a>
        <a>profileImg<input type="file" name="profile" onChange={onChange}></input></a>
        <input type="button" value="signUp" onClick={signUp}></input>
        </>

    );
}

export default RegisterForm;