import { Link } from "react-router-dom"


export const None = ()=>{
    

    return (
        <>
        <h1>로그인이 필요합니다</h1>
        <Link to={"/Main"}></Link>
        
        </>
    )
}
