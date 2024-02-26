import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../common/context/AuthContext";
export const CompanySignUpForm = () => {
  const { register, handleSubmit, formState: {
    errors
  } } = useForm()
  const { signupCompany, isAuthenticated, errors: registerErrors } = useAuth()
  const [classNameModal, setClassNameModal] = useState("hidden");

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    values.phoneNumber = parseInt(values.phoneNumber)
    signupCompany(values)
  })

  function ButtonOpenModal() {
    if (isAuthenticated) {
      if (classNameModal == "hidden") {
        setClassNameModal("visible")
      } else setClassNameModal("hidden")
    }
  }

  return (
    <>
      {
        registerErrors.map((error, i) => (
          <div key={i} className="errors">
            {Array.isArray(error) ? (
              error.map((line, j) => (
                <p key={j}>{line}</p>
              ))
            ) : (
              <p key={i}>{error}</p>
            )}
          </div>
        ))
      }


      <form className="form-signup" onSubmit={onSubmit}>
        {
          errors.userNameCompany && (
            <p className="text-red-500">Company user is required</p>
          )
        }
        <label htmlFor="userNameCompany">company user</label>
        <input
          className="form-styling"
          type="text"
          {...register('userNameCompany', { required: true })}
        />
        {
          errors.email && (
            <p className="text-red-500">Email is required</p>
          )
        }
        <label htmlFor="email">Email: </label>
        <input
          className="form-styling"
          type="text"
          {...register('email', { required: true })}
        />
        {
          errors.typeCompany && (
            <p className="text-red-500">Company type is required</p>
          )
        }
        <label htmlFor="typeCompany">Company type:</label>
        <input
          className="form-styling"
          type="text"
          {...register('typeCompany', { required: true })}
        />
        {
          errors.phoneNumber && (
            <p className="text-red-500">Telephone number is required</p>
          )
        }
        <label htmlFor="phoneNumber">Phone number:</label>
        <input
          className="form-styling"
          type="number"
          {...register('phoneNumber', { required: true })}
        />
        {
          errors.password && (
            <p className="text-red-500">Password is required</p>
          )
        }
        <label htmlFor="password">Password:</label>
        <input
          className="form-styling"
          type="password"
          {...register('password', { required: true })}
        />

        {
          errors.confirmpassword && (
            <p className="text-red-500">Confirm password is required</p>
          )
        }
        <label htmlFor="confirmpassword">Confirm password:</label>
        <input
          className="form-styling"
          type="text"
          {...register('confirmpassword', { required: true })}
        />
        <button  ng-click="checked = !checked" className="btn-signup">
          Registrarse
        </button>
      </form>
    </>
  );
};