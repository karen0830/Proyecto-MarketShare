import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../common/context/AuthContext";

export const CompanySignUpForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signupCompany, isAuthenticated, errors: registerErrors } = useAuth();
  const [classNameModal, setClassNameModal] = useState("hidden");

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    values.phoneNumber = parseInt(values.phoneNumber);
    signupCompany(values);
  });

  function ButtonOpenModal() {
    if (isAuthenticated) {
      if (classNameModal == "hidden") {
        setClassNameModal("visible");
      } else setClassNameModal("hidden");
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
            <p className="text-red-500">El usuario de la empresa es obligatorio</p>
          )
        }
        <label htmlFor="userNameCompany">Usuario de la empresa</label>
        <input
          className="form-styling"
          type="text"
          {...register('userNameCompany', { required: true })}
        />
        {
          errors.email && (
            <p className="text-red-500">El correo electrónico es obligatorio</p>
          )
        }
        <label htmlFor="email">Correo electrónico: </label>
        <input
          className="form-styling"
          type="text"
          {...register('email', { required: true })}
        />
        {
          errors.typeCompany && (
            <p className="text-red-500">El tipo de empresa es obligatorio</p>
          )
        }
        <label htmlFor="typeCompany">Tipo de empresa:</label>
        <input
          className="form-styling"
          type="text"
          {...register('typeCompany', { required: true })}
        />
        {
          errors.phoneNumber && (
            <p className="text-red-500">El número de teléfono es obligatorio</p>
          )
        }
        <label htmlFor="phoneNumber">Número de teléfono:</label>
        <input
          className="form-styling"
          type="number"
          {...register('phoneNumber', { required: true })}
        />
        {
          errors.password && (
            <p className="text-red-500">La contraseña es obligatoria</p>
          )
        }
        <label htmlFor="password">Contraseña:</label>
        <input
          className="form-styling"
          type="password"
          {...register('password', { required: true })}
        />

        {
          errors.confirmpassword && (
            <p className="text-red-500">Confirmar contraseña es obligatorio</p>
          )
        }
        <label htmlFor="confirmpassword">Confirmar contraseña:</label>
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
