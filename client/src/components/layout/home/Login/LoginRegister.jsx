import React, { useState } from 'react';
import { SignInForm } from './forms/SignInForm';
import { UserorCompany } from './OptionUserorCompany/UserorCompany';
import '../Login/LoginRegister.css'
import { NavLink } from 'react-router-dom';

export const LoginRegister = () => {
  const [isSignInActive, setIsSignInActive] = useState(true);

  const toggleSignInActive = () => {
    setIsSignInActive(!isSignInActive);
  };

  return (
    <div className="container">
      <div className="vertical-line"></div>
      <div className="frame">
        <div className="nav">
          <ul className="links">
            <li className={isSignInActive ? 'signin-active' : 'signup-inactive'}>
              <NavLink to="/login">
                <a className="btn" onClick={toggleSignInActive}>
                  Sign in
                </a>
              </NavLink>
            </li>
            <li className={isSignInActive ? 'signup-inactive' : 'signin-active'}>
              <NavLink to="/register">
                <a className="btn" onClick={toggleSignInActive}>
                  Sign up
                </a>
              </NavLink>
            </li>
          </ul>
        </div>
        {isSignInActive ? <SignInForm /> : <UserorCompany />}
      </div>
    </div>
  );
}
