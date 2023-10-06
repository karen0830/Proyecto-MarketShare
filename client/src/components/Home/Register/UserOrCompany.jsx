import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom'
import { UserSignUpForm } from './UserSignUpForm.jsx'
import { CompanySignUpForm } from './companySignUpForm.jsx';

export const UserorCompany = () => {
    const location = useLocation()
    
    const locationRegister = location.pathname === "/register"

    return (
        <div className="ml-2 flex flex-wrap gap-6">
            <NavLink to="/registerCompany">
                <button className={locationRegister === false ? 'signUpUserCompany-active' : 'signupUserCompany-inactive'}>
                    Company
                </button>
            </NavLink>
            <p>or</p>
            <NavLink to="/register">
                <button className={locationRegister ? 'signUpUserCompany-active' : 'signupUserCompany-inactive'}>
                    User
                </button>
            </NavLink>
            {location.pathname === "/registerCompany" && <CompanySignUpForm />}
            {location.pathname === "/register" && <UserSignUpForm />}
        </div>
    );
};