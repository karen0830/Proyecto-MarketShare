import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom'
import { UserSignUpForm } from '../../../user/components/LoginRegister/UserSignUpForm.jsx'
import { CompanySignUpForm } from '../../../company/components/RegiterCompany/companySignUpForm.jsx';
import "./Registro.css"
export const UserorCompany = () => {
    const location = useLocation()

    const locationRegister = location.pathname === "/registerUser"

    return (
        <div className="companyorUser">
            <div className='options'>
                <NavLink className={locationRegister === false ? 'signUpUserCompany-active' : 'signupUserCompany-inactive'} to="/registerCompany">
                    Empresa
                </NavLink>
                <p>o</p>
                <NavLink className={locationRegister ? 'signUpUserCompany-active' : 'signupUserCompany-inactive'} to="/registerUser">
                    Usuario
                </NavLink>
            </div>
            {location.pathname === "/registerCompany" && <CompanySignUpForm />}
            {location.pathname === "/registerUser" && <UserSignUpForm />}
        </div>
    );
};
