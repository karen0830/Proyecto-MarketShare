import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
export const UserSignUpForm = () => {
  const [className, setClassName] = useState("hidden")

  const { register, handleSubmit, formState: {
    errors
  } } = useForm()
  const { signup, isAuthenticated, errors: registerErrors } = useAuth()
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (isAuthenticated) navigate("/profile")
  // }, [])

  const onSubmit = handleSubmit(async (values) => {
    signup(values)
  })
  return (
    <>
      {
        registerErrors.map((error, i) => (
          <div key={i} className="bg-red-500 text-white">
            {error}
          </div>
        ))
      }
      <form className="form-signup" onSubmit={onSubmit}>
        <label for="fullname">Full name</label>
        <input
          class="form-styling"
          type="text"
          onChange={className}
          {...register('username', { required: true })}
        />
        {
          errors.username && (
            <p className="text-red-500">Username is required</p>
          )
        }
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

        <label for="confirmpassword">Confirm password</label>
        <input
          class="form-styling"
          type="password"
          {...register('confirmpassword', { required: true })}
        />
        {
          errors.confirmpassword && (
            <p className="text-red-500">confirmpassword is required</p>
          )
        }

        <button type="submit" ng-click="checked = !checked" class="btn-signup">
          Sign Up
        </button>
      </form>

    </>
  );
};
