import React from "react";
import { Link, NavLink } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { useAuth } from "../../../../../context/AuthContext";
export const SignInForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const {signIn, errors: signinErrors} = useAuth()

  const onSubmit = handleSubmit(data => {
    signIn(data);
  })
  return (
    <>
    {
        signinErrors.map((error, i) => (
          <div key={i} className="bg-red-500 text-white">
            {error}
          </div>
        ))
      }
      <form className="form-signin" onSubmit={onSubmit}>
        <label for="email">Email</label>
        <input class="form-styling" type="email"
          {...register('email', { required: true })} />
        {
          errors.email && (
            <p className="text-red-500">Email is required</p>
          )
        }
        <label for="password">Password</label>
        <input
          class="form-styling"
          type="password"
          {...register('password', { required: true })}
        />
        {
          errors.password && (
            <p className="text-red-500">password is required</p>
          )
        }
        <div class="btn-animate">
          <button type="submit" >
            <a class="btn-signin">Sign in</a>
          </button>
        </div>
        
      </form>
      <p className="flex gap-x-2 justify-between">
        Don't have an account?
        <Link to="/register" className="text-sky-500">Sign up</Link>
        </p>
    </>
  );
}
