import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../user/context/AuthContext.jsx";
export const CompanySignUpForm = () => {
  const { register, handleSubmit, formState: {
    errors
  } } = useForm()
  const { signupCompany, isAuthenticated, errors: registerErrors } = useAuth()
  const [classNameModal, setClassNameModal] = useState("hidden");

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    values.phoneNumber = parseInt(values.phoneNumber)
    values.taxIdentity = parseInt(values.taxIdentity)
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
          errors.companyName && (
            <p className="text-red-500">Nombre de la compañía es requerido</p>
          )
        }
        <label htmlFor="companyName">Nombre de la compañía</label>
        <input
          className="form-styling"
          type="text"
          {...register('companyName', { required: true })}
        />
        {
          errors.legalEntity && (
            <p className="text-red-500">Correo electrónico es requerido</p>
          )
        }
        <label htmlFor="legalEntity">orreo electrónico: </label>
        <input
          className="form-styling"
          type="text"
          {...register('legalEntity', { required: true })}
        />
        {
          errors.activityDescription && (
            <p className="text-red-500">Tipo de empresa es requerido</p>
          )
        }
        <label htmlFor="activityDescription">Tipo de empresa:</label>
        <input
          className="form-styling"
          type="text"
          {...register('activityDescription', { required: true })}
        />
        {
          errors.phoneNumber && (
            <p className="text-red-500">Número de telefono es requerido</p>
          )
        }
        <label htmlFor="phoneNumber">Telefono:</label>
        <input
          className="form-styling"
          type="number"
          {...register('phoneNumber', { required: true })}
        />
        {
          errors.password && (
            <p className="text-red-500">Contraseña es requerida</p>
          )
        }
        <label htmlFor="password">Contraseña</label>
        <input
          className="form-styling"
          type="password"
          {...register('password', { required: true })}
        />

        {
          errors.confirmpassword && (
            <p className="text-red-500">Confirmar contraseña es requerida</p>
          )
        }
        <label htmlFor="confirmpassword">Confirmar contraseña</label>
        <input
          className="form-styling"
          type="text"
          {...register('confirmpassword', { required: true })}
        />
        <button onClick={ButtonOpenModal} ng-click="checked = !checked" className="btn-signup" type="submit">
          Registrarse
        </button>
      </form>
    </>
  );
};