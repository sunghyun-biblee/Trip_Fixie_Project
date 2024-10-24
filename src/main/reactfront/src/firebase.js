import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


// 도메인 , api key 등 여러가지 키 값들이 포함된 config 개체
/* 이러한 config 옵션을 통해서 아래에 app을 생성하고, 
   그리고 그 app에 대한 인증서비스를 사용하고싶다는 것을 코드로 작성  */
const firebaseConfig = {
  apiKey: "AIzaSyB_RAg8bDxYDOxwHxOGCOo0YP65lyCFyTg",
  authDomain: "ch-project-43805.firebaseapp.com",
  projectId: "ch-project-43805",
  storageBucket: "ch-project-43805.appspot.com",
  messagingSenderId: "145105252716",
  appId: "1:145105252716:web:02086516b516c6d182c349",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// 로그인 기능을 추가하는 코드 (인증)
// 기능을 사용할수 있도록 export 해주기
export const auth = getAuth(app);

// 2023/12/18 : 데이터베이스와 스토리지에 대한 엑세스 권한 얻기를 해봄
export const storage = getStorage(app);
export const db = getFirestore(app);

/* 
Firebase 의 데이터베이스는 Collectio과 Doucment 라는 것으로 동작함
Collenction = 폴더
Document = 데이터값 (예외로 Document 안에 Collenction이 존재)

*/
