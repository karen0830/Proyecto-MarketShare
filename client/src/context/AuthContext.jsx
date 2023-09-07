import {createContext, useState, useContext} from 'react'
import { registerRequest } from "../api/auth";
export const AuthContext = createContext()
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be ussed within an AutProvider")
    }
    return context;
}
export const AuthProvider = ({children})=>{

    const [user, setUser] = useState(null)

    const signup = async (user) =>{
        console.log(values);
        const res = await registerRequest(user)
        console.log(res.data);
        setUser(res.data)
    }

    return(
        <AuthContext.Provider value={{signup, user}}>
            {children}
        </AuthContext.Provider>
    )
} 
