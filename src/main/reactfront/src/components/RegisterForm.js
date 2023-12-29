import React, {useState} from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function RegisterForm(){
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onChange = (event)=>{
        const {
          target: { name, value },
        } = event;
        if (name === "email"){
          setEmail(value);
        } else if (name === "password"){
          setPassword(value);
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
            alert(user+"님 섹스.");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
    }

    return (
        <>
        <h1>회원가입</h1>
        <a>email<input type="email" name="email" onChange={onChange}></input></a>
        <a>password<input type="text" name="password" onChange={onChange}></input></a>
        <input type="button" value="signUp" onClick={signUp}></input>
        </>

    );
}

export default RegisterForm;