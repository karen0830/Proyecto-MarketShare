import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import "./LoginRegister.css";
import { SignInForm } from '../../user/components/LoginRegister/SignInForm.jsx';
import { SignInCompany } from '../../company/components/LoginCompany/SignInCompany .jsx';

export const SignInUserorCompany = () => {
    const location = useLocation();

    const locationRegister = location.pathname === "/loginUser";

    return (
        <div className="companyorUser">
            <div className='options'>
                <NavLink className={locationRegister === false ? 'signUpUserCompany-active' : 'signupUserCompany-inactive'} to="/loginCompany">
                    Empresa
                </NavLink>
                <p>o</p>
                <NavLink className={locationRegister ? 'signUpUserCompany-active' : 'signupUserCompany-inactive'} to="/loginUser">
                    Usuario
                </NavLink>
            </div>
            {location.pathname === "/loginCompany" && <SignInCompany />}
            {location.pathname === "/loginUser" && <SignInForm />}
            {location.pathname === "/" && <SignInCompany/>}
        </div>
    );
};
