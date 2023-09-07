import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../../../context/AuthContext";
export const UserSignUpForm = () => {
  const { register, handleSubmit } = useForm()
  const {signUp, user} = useAuth()
  console.log(user);
  const onSubmit = handleSubmit(async(values) => {
    signUp(values)
  })
  return (
    <>
      <form className="form-signup" onSubmit={onSubmit}>
        <label for="fullname">Full name</label>
        <input
          class="form-styling"
          type="text"
          {...register('username', { required: true })}
        />
        <label for="email">Email</label>
        <input class="form-styling" type="text"
          {...register('email', { required: true })} />
        <label for="password">Password</label>
        <input
          class="form-styling"
          type="password"
          {...register('password', { required: true })}
        />
        <label for="confirmpassword">Confirm password</label>
        <input
          class="form-styling"
          type="password"
          {...register('confirmpassword', { required: true })}
        />
        <button type="submit" ng-click="checked = !checked" class="btn-signup">
          Sign Up
        </button>
      </form>
    </>
  );
};
