import React, { useEffect } from 'react'
import {Navigate, Outlet} from "react-router-dom";
import { useAuth } from './context/AuthContext'

const ProtectedRouter = () => {
    const { loading, user, isAuthenticated } = useAuth()
    if (loading) return <h1>Loading...</h1>
    if(!loading && !isAuthenticated) return (<Navigate to="/loginUser"/>)
    useEffect(()=>{
        if(isAuthenticated) return (<Navigate to="/start"/>)
    }, [isAuthenticated])

    return <Outlet/>
}

export default ProtectedRouter