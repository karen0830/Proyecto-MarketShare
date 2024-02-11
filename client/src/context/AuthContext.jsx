import { createContext, useState, useContext, useEffect } from 'react'
import { registerRequest, loginRequest, registerCompanyRequest, verityTokenRequest, logoutUser, getPublications, getProfileImage } from "../api/auth";
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
    const [publications, setPublications] = useState(null);
    const [profileImage, setProfileImage] = useState(null)
    const [profileData, setProfileData] = useState(null);

    const signup = async (user) => {
        console.log(user);
        const res = await registerRequest(user)
        if (res.data) {
            console.log(res.data);
            setUser(res.data)
            setIsAuthenticated(false)
        } else {
            console.log(res.response);
            if (res.response.data.message) {
                setErrors([[res.response.data.message]])
                console.log(res.response.data.message);
            } else setErrors([res.response.data])
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
            if (res.response.data.message) {
                setErrors([[res.response.data.message]])
                console.log(res.response.data.message);
            } else setErrors([res.response.data])
        }

    }


    const signIn = async (user) => {
        const res = await loginRequest(user)
        console.log(res.data);
        if (res.data) {
            console.log(res);
            localStorage.setItem('token', res.data.token);
            const resverify = await verityTokenRequest(res.data.token);
            console.log(resverify );
            setIsAuthenticated(true);
            setUser(res.data);
            setPublications(res.data.publications)
            setProfileImage(res.data.profileImage)
        } else {
            setErrors([[res.response.data.message]])
        }
    }

    const logoutUsers = async () => {
        try {
            logoutUser()
            setIsAuthenticated(false)
            setUser(null)
        } catch (error) {
            console.log(error);
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
            const Token = localStorage.getItem('token');
            if (!Token) {
                setIsAuthenticated(false)
                setLoading(false)
                return setUser(null);
            } else {
                try {
                    const res = await verityTokenRequest(Token)
                    console.log(res.data);
                    if (!res.data) {
                        setIsAuthenticated(false);
                        setLoading(false);
                        return;
                    } else {
                        const getPublicationResponse = await getPublications();
                        const getImageProfile = await getProfileImage()
                        console.log(getPublicationResponse.data.publications);
                        setPublications(getPublicationResponse.data.publications);
                        setProfileImage(getImageProfile.data.profileImage);
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
        <AuthContext.Provider value={{ signup, user, isAuthenticated, errors, signIn, signupCompany, loading, logoutUsers, setUser, setPublications, publications, profileImage, setProfileImage, profileData, setProfileData }}>
            {children}
        </AuthContext.Provider>
    )
} 
