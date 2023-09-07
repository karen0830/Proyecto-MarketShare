import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { UserSignUpForm } from '../forms/UserSignUpForm';
import { CompanySignUpForm } from '../forms/companySignUpForm';

export const UserorCompany = () => {
    const [isSignUpActiveUser, setIsSignUpActiveUser] = useState(true);
    const [isSignUpActiveCompany, setIsSignUpActiveCompany] = useState(false);

    const toggleSignUpActiveUser = () => {
        setIsSignUpActiveUser(true);
        setIsSignUpActiveCompany(false);
    };

    const toggleSignUpActiveCompany = () => {
        setIsSignUpActiveUser(false);
        setIsSignUpActiveCompany(true);
    };

    // useEffect para isSignUpActiveUser
    useEffect(() => {
        // Coloca aquí el código que quieres ejecutar cuando isSignUpActiveUser cambie.
        console.log("isSignUpActiveUser cambió a:", isSignUpActiveUser);
    }, [isSignUpActiveUser]);

    // useEffect para isSignUpActiveCompany
    useEffect(() => {
        // Coloca aquí el código que quieres ejecutar cuando isSignUpActiveCompany cambie.
        console.log("isSignUpActiveCompany cambió a:", isSignUpActiveCompany);
    }, [isSignUpActiveCompany]);

    return (
        <div className="ml-2 flex flex-wrap gap-6">
            <NavLink to="/registerC">
                <button className={isSignUpActiveCompany ? 'signUpUserCompany-active' : 'signupUserCompany-inactive'} onClick={toggleSignUpActiveCompany}>
                    Company
                </button>
            </NavLink>
            <p>or</p>
            <NavLink to="/register">
                <button className={isSignUpActiveUser ? 'signUpUserCompany-active' : 'signupUserCompany-inactive'} onClick={toggleSignUpActiveUser}>
                    User
                </button>
            </NavLink>
            {isSignUpActiveUser ? <UserSignUpForm /> : <CompanySignUpForm />}
        </div>
    );
};