# Trip_Fixied 여행계획 도움 서비스

<img src="./mainpage2.jpg" width="300px" >


 > ## ✔    개발인원 , 개발기간 및 역할 
    개발인원 : 기존 4명 (프론트엔드 2명, 백엔드 2명) -> 최종 2명 (프론트엔드 1명, 백엔드 1명)

    역할 담당 : 프론트엔드 담당(팀장), 기여도 (55%)

    개발기간 : 2023.12.30 ~ 2024.02.02

    

<br/>

 > ## ✍ 사용된 기술 스택  

### Front-End
<div style={display:flex}>
 <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white" height="25px">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white" height="25px">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" height="25px"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black" height="25px">
<img src="https://img.shields.io/badge/styled components-DB7093?style=flat-square&logo=styled-components&logoColor=white" height="25px"/> 
<img src="https://img.shields.io/badge/Framer-0055FF?style=for-the-badge&logo=Framer&logoColor=white"height="25px">
</div>

<hr/>

### Back-End
<div style={display:flex}>
<img src="https://img.shields.io/badge/Firebase-DD2C00?style=for-the-badge&logo=Firebase&logoColor=white">
<img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=Spring Boot&logoColor=white">
<img src="https://img.shields.io/badge/DBeaver-382923?style=for-the-badge&logo=DBeaver&logoColor=white">
</div>

<hr/>

### ETC
<img src="https://img.shields.io/badge/Sourcetree-0052CC?style=for-the-badge&logo=Sourcetree&logoColor=white">

<br/>

> ## 🖐 프로젝트 소개

**Trip_Fixied 는 사용자의 여행 일정에 맞춰 관광지, 축제 정보, 숙소 등 다양한 선택지를 제공하여 여행 일정을 계획하고 비교하는 데 도움을 주는 서비스입니다**

 여행지를 정하고 나서도 어떤 활동을 할지 모르거나, 해당 지역의 관광 정보를 찾기 어려운 경우가 많습니다. <br/>
 저 또한 여행을 계획할 때 이러한 불편함을 겪어봤었고, 누군가가 추천해주는 시스템이 있다면 <br/>어떨까라는 고민과 함께 개발하게 되었습니다. 


<br/>

> ## ✨ 프로젝트 핵심 기능

 1. TourAPI(4.0)를 활용하여 여행 일정에 맞춰 관광지,축제,숙소 상세정보를 제공

2. 제공된 장소의 위치정보를 Naver Maps API를 활용해 장소 표시

 3. 여행 일정 기간 동안 OpenWeatherAPI를 통해 날씨정보 제공

 4. 세워둔 여행계획을 마이리스트에 저장 후 비교 가능하도록 구현

<br/>

> ## ⭐ 프로젝트 기여도
 1.  **페이지 전환 애니메이션 구현**
        - 페이지 전환 시 애니메이션을 적용해보자 라는 생각에 Framer-Motion 을 활용하여, 컴포넌트가 마운트 및 언마운트될 때 애니메이션을 추가했습니다.

 2. **여행지 위치정보를 Naver Maps API를 활용해 장소 표시**
    - 제공된 여행지 리스트에서 여행지를 클릭하면 Naver Maps의 지도의 위치가 해당 장소가 포커스됩니다. 추가로 계획에 해당 장소를 추가하면 지도에 마커가 생성됩니다

 3. **OpenWeatherAPI 를 통해 날씨정보 제공**
    - 여행 일정에 지역과 날짜를 기반으로, 여행 날짜가 어플리케이션 접속일로부터 14일 이내라면 해당 지역의 날짜의 날씨 정보를 제공합니다.
만약, 14일을 초과할 경우 접속일 기준으로 최대 14일까지의 날씨 정보를 제공합니다.
 4. **TourAPI(4.0) 를 활용하여 여행 일정에 맞춰 각각의 정보를 제공**
    - 여행 일정에 추가된 지역을 기반으로 관광지 정보를 제공하며, 해당 지역과 날짜를 기준으로 여행일정에 포함된 날짜에 열리는 축제 정보만 제공합니다. 또한, 여행 지역을 기반으로 숙소 정보를 제공합니다.
 5. **여행계획을 마이리스트에 저장 후 비교 가능하도록 구현**
    - 모든 일정을 계획 완료하면 저장하기 버튼을 통해 마이페이지의 마이리스트에 계획 정보가 저장됩니다. 이를 통해 지금까지 세운 계획을 마이페이지에서 확인할 수 있습니다.

<br/>

> ## 💫 트러블 슈팅
    여행지의 데이터를 제공하는 과정에서 일일 API 호출 트래픽 초과 
    
### [문제점] 
 여행지의 정보를 무한스크롤로 적용하여 리스트로 보여주게되는데 뷰포트가 바닥을 감지하였을때 API를 호출하다보니 일일 API 호출 트래픽이 짧은 시간에 초과하는 상황

 ### [해결방안]
 첫 데이터 호출 시 모든 데이터를 가져와 이중 배열로 나누어 저장하고, 스크롤 이벤트 발생 시 index를 증가시키고 ,증가된 index를 참조하여 데이터를 출력 하도록 하여 API 호출 수를 약 90% 가량 감소시켰습니다


<br/>
<br/>

> ## 📷 화면구성 
> **배포사이트가 없는 관계로 사진을 대신 첨부 하는점 양해부탁드립니다.**

<br/>

 ##  메인페이지 (intersection observer를 활용한 스크롤 애니메이션)                                    

 ![mainpage_gif](https://github.com/user-attachments/assets/74a47cfc-9150-4960-9464-284cf0de4a1e) 

<br/>

##  날짜 선택 챕터 

![날짜선택2](https://github.com/user-attachments/assets/fc0af9f0-d101-46a4-a72b-ef89a1e0d34f) 

<br/>

## 장소 및 축제 선택 챕터

![장소, 축제 선택](https://github.com/user-attachments/assets/561b3b86-8823-4778-afea-e2aa2206b843) 

<br/>

##  숙소 선택 챕터

![숙소 선택](https://github.com/user-attachments/assets/f8f45c3e-9b83-4ed3-8c40-65d13776406d) 

<br/>

##  추가한 장소를 클릭시 해당 장소의 상세 정보를 알려주며, 지도가 해당 위치로 포커스 

 ![계획에 추가된 장소 클릭시 상세설명](https://github.com/user-attachments/assets/78cc4cf2-5161-4195-970d-516752b5afdf)

<br/>

## 여행지 계획에 추가된 장소 및 숙소를 우측 맵에서 확인 가능

![여행 메모지에 추가된 장소 및 숙소를 우측 맵에서 확인 가능](https://github.com/user-attachments/assets/a09bfbb1-0bad-45a5-a278-9c719e5a9ac2)

<br/>

##  마이페이지에서 나의 계획 확인 가능 

 ![마이페이지 계획확인2](https://github.com/user-attachments/assets/5ff0ebc7-c527-475f-a15f-222fb8b558c9)

<br/>

## 조회한 계획을 관광지, 축제, 숙소 별로 확인 가능

 ![마이페이지 계획 카테고리별로 확인가능](https://github.com/user-attachments/assets/889894e7-d128-436d-8a43-d703cf9a23b0)

<br/>

##  피드백을 받기 위한 페이지

![피드백을 받기위한 페이지](https://github.com/user-attachments/assets/a6869e91-0a2b-47c7-a06d-dd928eff6c9e) 


<br/>

> ## 💭 회고
    한동안 html,css,javascript만 사용하여 프로젝트를 진행하던 저는
    이번 프로젝트를 진행하면서 많은 양의 코드를 혼자 작성해야했고, 
    말로만 듣던 SPA(single page application)도 경험해보고 싶었기 때문에 React라는 새로운 프레임워크 및 라이브러리를 사용하게 되었습니다.

    확실히 SPA로 개발하다보니, 화면깜빡임이 최소화되어, 눈의 피로감이 많이 줄어들었습니다.

    React를 처음사용하면서 느낀점은 Javascript로 구현할때에는 많은 양의 코드를 필요로 했었지만, 
    React로는 짧은코드로도 구현 가능하다는 것에 매력을 느끼게 되었고,
    React를 자세히 알아보고자, 기본원리와 생명주기를 알아보았습니다.

    그 과정속에서 React의 Hooks이라고 불리는 useState,useEffect,useRef 등을 사용할 수 있게 되었습니다.

    그리고 깊게는 아니지만 firebase를 통하여 인증서비스의 OAuth 기능을 사용하여 소셜로그인을 구현해보았고, 
    해당 기능으로 로그인을 구현할때 필요로 하던 CRUD 과정이 사라지니, 많은 시간을 절약할 수 있던것이 좋았습니다.

    새로운 기술들을 적용하여, 많은 배움을 얻을 수 있던 프로젝트 였습니다.
