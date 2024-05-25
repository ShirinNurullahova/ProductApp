import { PropsWithChildren, useEffect } from "react"
import { useAppSelector } from "../redux/store"
import { selectAuthorizedUser } from "../redux/slices/authSlices"
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


const AuthWrapper = ({ children }: PropsWithChildren) => {
    const location = useLocation();
   
    const currentUser = useAppSelector(selectAuthorizedUser);
    const navigate = useNavigate();
    



    useEffect(()=>{
        if(!currentUser){
            navigate('/');
            return
        }
        if (currentUser?.role === "user" && location.pathname !== '/products') {
            navigate(-1);
            return
        }
    },[])
    
    return (
        <>
            {children}
        </>
    )
}

export default AuthWrapper