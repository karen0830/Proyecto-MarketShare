import React from 'react'
import {Navigate, Outlet} from "react-router-dom";
import { useAuth } from './context/AuthContext'

const ProtectedRouter = () => {
    const { loading, user, isAuthenticated } = useAuth()
    console.log(loading, user, isAuthenticated);
    if (loading) return <h1>Loading...</h1>
    if(!loading && !isAuthenticated) return (<Navigate to="/login"/>)

    return <Outlet/>
}

export default ProtectedRouter