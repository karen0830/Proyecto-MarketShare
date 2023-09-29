import { createContext, useState, useContext, useEffect } from 'react'
import { registerRequest, loginRequest, registerCompanyRequest, verityTokenRequest } from "../api/auth";
import Cookies from "js-cookie";
export const AuthContext = createContext()
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be ussed within an AutProvider")
    }
    return context;
}
export const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    
    const signup = async (user) => {
        try {
            console.log(user);
            const res = await registerRequest(user)
            console.log(res.data);
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error.response);
            setErrors(error.response.data)
        }

    }

    const signupCompany = async (company) => {
        try {
            console.log(company);
            const res = await registerCompanyRequest(company)
            console.log(res.data);
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error.response);
            setErrors(error.response.data)
        }

    }


    const signIn = async (user) => {
        try {
            const res = await loginRequest(user)
            console.log(res);
            setIsAuthenticated(true)
            setUser(res.data)
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                setErrors(error.response.data)
                console.log(error.response.data);
            }
            setErrors([error.response.data.message])
        }

    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()
            console.log(cookies);
            if (!cookies.token) {
                setIsAuthenticated(false)
                setLoading(false);
                return setUser(null);
            }
            try {
                const res = await verityTokenRequest(cookies.token)
                console.log(res);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return ;
                }

                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false);
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false);
            }
        }
        checkLogin()
    }, [])
    return (
        <AuthContext.Provider value={{ signup, user, isAuthenticated, errors, signIn, signupCompany, loading }}>
            {children}
        </AuthContext.Provider>
    )
} 
