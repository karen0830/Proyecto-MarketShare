import React, { useState } from 'react';
import { SignInForm } from './forms/SignInForm';
import { UserorCompany } from './OptionUserorCompany/UserorCompany';
import '../Login/LoginRegister.css'

export const LoginRegister =() =>{
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
              <a className="btn" onClick={toggleSignInActive}>
                Sign in
              </a>
            </li>
            <li className={isSignInActive ? 'signup-inactive' : 'signin-active'}>
              <a className="btn" onClick={toggleSignInActive}>
                Sign up
              </a>
            </li>
          </ul>
        </div>
        {isSignInActive ? <SignInForm /> : <UserorCompany />}
      </div>
    </div>
  );
}
