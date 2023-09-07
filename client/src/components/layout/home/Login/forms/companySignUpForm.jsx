import React from "react";
import { useForm } from "react-hook-form";
import { registerCompanyReques } from "../../../../../api/auth";
export const CompanySignUpForm = () => {
  const { register, handleSubmit } = useForm()
  return (
    <>
      <form className="form-signup" onSubmit={handleSubmit(async(values) => {
        console.log(values);
        values.phoneNumber = parseInt(values.phoneNumber)
        values.taxIdentity = parseInt(values.taxIdentity)
        const res = await registerCompanyReques(values)
        console.log(res);
      })}>
        <label for="companyName">Nombre de la compañía</label>
        <input
          class="form-styling"
          type="text"
          {...register('companyName', { required: true })}
        />
        <label for="legalEntity">Entidad Legal</label>
        <textarea
          class="form-styling"
          type="text"
          {...register('legalEntity', { required: true })}
        />
        <label for="companyAddress">Dirección</label>
        <textarea
          class="form-styling"
          type="text"
          {...register('companyAddress', { required: true })}
        />
        <label for="activityDescription">Activity description</label>
        <textarea
          class="form-styling"
          type="text"
          {...register('activityDescription', { required: true })}
        />
        <label for="phoneNumber">Phone number</label>
        <input
          class="form-styling"
          type="number"
          {...register('phoneNumber', { required: true })}
        />
        <label for="email">Correo</label>
        <input class="form-styling" type="email" {...register('email', { required: true })} />
        <label for="taxIdentity">Identidad fiscal</label>
        <input
          class="form-styling"
          type="number"
          {...register('taxIdentity', { required: true })}
        />
        <label for="password">Contraseña</label>
        <input
          class="form-styling"
          type="text"
          {...register('password', { required: true })}
        />
        <label for="confirmpassword">Confirmar contraseña</label>
        <input
          class="form-styling"
          type="text"
          {...register('confirmpassword', { required: true })}
        />
        <button ng-click="checked = !checked" class="btn-signup" type="submit">
          Registrarse
        </button>
      </form>
    </>
  );
};