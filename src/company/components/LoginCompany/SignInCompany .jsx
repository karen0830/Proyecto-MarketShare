import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../common/context/AuthContext";

export const SignInCompany = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInCompany, isAuthenticatedCompany, isAuthenticated, errors: signinErrors } = useAuth();

  const onSubmit = handleSubmit(data => {
    console.log(data);
    signInCompany(data);
  });

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
        <label htmlFor="email">Correo electrónico</label>
        <input className="form-styling" type="email" {...register('email', { required: true })} />
        {
          errors.email && (
            <p className="text-red-500">El correo electrónico es obligatorio</p>
          )
        }
        <label htmlFor="password">Contraseña</label>
        <input
          className="form-styling"
          type="password"
          {...register('password', { required: true })}
        />
        {
          errors.password && (
            <p className="text-red-500">La contraseña es obligatoria</p>
          )
        }
        <div className="btn-animate">
          <button type="submit" >
            <a className="btn-signin">Iniciar sesión</a>
          </button>
        </div>
      </form>
    </>
  );
};
