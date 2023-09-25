import React from 'react'
import {Navigate, Outlet} from "react-router-dom";
import { useAuth } from './context/AuthContext'

const ProtectedRouter = () => {
    const { user, isAuthenticated } = useAuth()

    if(!isAuthenticated) return (<Navigate to="/register"/>)

    return <Outlet/>
}

export default ProtectedRouter