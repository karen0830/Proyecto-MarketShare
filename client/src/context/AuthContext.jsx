import { createContext, useState, useContext, useEffect } from 'react'
import { registerRequest, loginRequest, registerCompanyRequest, verityTokenRequest, logoutUser } from "../api/auth";
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
        console.log(user);
        const res = await registerRequest(user)
        if (res.data) {
            console.log(res.data);
            setUser(res.data)
            setIsAuthenticated(false)
        } else {
            if (res.response.data.message) {
                setErrors([[res.response.data.message]])
                console.log(res.response.data.message);
            }else setErrors([res.response.data])
        }

    }

    const signupCompany = async (company) => {
        try {
            console.log(company);
            const res = await registerCompanyRequest(company)
            console.log(res.data);
            setUser(res.data)
            setIsAuthenticated(false)
        } catch (error) {
            console.log(error.response);
            setErrors(error.response.data)
        }

    }


    const signIn = async (user) => {
        const res = await loginRequest(user)
        console.log(res.data);
        if (res.data) {
            console.log(res);
            setIsAuthenticated(true)
            setUser(res.data)
        } else {
            setErrors([[res.response.data]])
        }

    }

    const logoutUsers = async () => {
        try {
            const cookies = Cookies.get()
            console.log(cookies);
            logoutUser(cookies.token)
            setIsAuthenticated(false)
            setUser(null)
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                setErrors(error.response.data)
                console.log(error.response.data);
            }
            setErrors([error.response.data.message])
        }
    }

    useEffect(() => {
        console.log(errors);
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
                setLoading(false)
                return setUser(null);
            } else {
                try {
                    const res = await verityTokenRequest(cookies.token)
                    console.log(res.data);
                    if (!res.data) {
                        setIsAuthenticated(false);
                        setLoading(false);
                        return;
                    } else {
                        setIsAuthenticated(true)
                        setUser(res.data)
                        setLoading(false)
                    }
                } catch (error) {
                    console.log(error);
                    setIsAuthenticated(false)
                    setUser(null)
                    setLoading(false);
                }
            }
        }
        checkLogin()
    }, [])
    return (
        <AuthContext.Provider value={{ signup, user, isAuthenticated, errors, signIn, signupCompany, loading, logoutUsers, setUser }}>
            {children}
        </AuthContext.Provider>
    )
} 
