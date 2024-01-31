import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import axios from "axios";
import "./css/RegisterForm.css";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { FirebaseStorage } from "firebase/storage";
import { storage } from "../../firebase";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [preProfile, setPreProfile] = useState();
  const [profile, setProfile] = useState();
  const [uid, setUid] = useState("");
  const [preview, setPreview] = useState(false);
  const navigate = useNavigate();
  


  const onChange = (event) => {
    const {
      target: { name, value, files },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }else if(name === "passwordCheck"){
      setPasswordCheck(value);
    }else if (name === "name") {
      setName(value);
    } else if (name === "nickname") {
      setNickname(value);
    } else {
      if(files && files.length > 0){        
        const reader = new FileReader();        
        reader.readAsDataURL(files[0]);
        reader.onload = function(e) {
          setPreProfile(e.target.result);
        }
      setProfile(files[0]);
      }
    }
  };

  useEffect(()=>{
    if(profile){
        if(preview === false){
          setPreview(true);
        }
    }
  },[profile])


  const signUp = async (event) => {
    event.preventDefault();
    if(password === passwordCheck){
      await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);
        setUid(user.uid);
        console.log(profile);

        const storageRef = ref(storage, `imageBox/${email}`);
        const uploadTask = uploadBytes(storageRef, profile);

        uploadTask.then((snapshot)=>{
          getDownloadURL(snapshot.ref).then((downloadURL)=>{
            console.log("불러오기", downloadURL);
            setPreProfile(downloadURL);
            serverSignUp(user.uid, downloadURL);

            updateProfile(user, {photoURL: downloadURL});
          });
        });
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        // ..
      })
      .finally(()=>{
        navigate("/trip");
      })
    }else{
      alert("비밀번호를 정확하게 입력해주세요.");
      return;
    }

  };

  
  const serverSignUp = (userid, uprofile) => {
    axios
      .post("/test/signup", {
        uid: userid,
        email: email,
        name: name,
        nickname: nickname,
        profile: uprofile,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("서버회원가입오류", error);
      });
  };



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
          {preview ?
            <img src={preProfile} alt="" />
            :<img src="/img/registe_Background.jpg" alt="" />}
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
              <label>PASSWORD CHECK</label>
              <input
                type="password"
                name="passwordCheck"
                placeholder="Write PasswordCheck"
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
              
              <label>PROFILE</label>
              <input
                type="file"
                name="profile"
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
