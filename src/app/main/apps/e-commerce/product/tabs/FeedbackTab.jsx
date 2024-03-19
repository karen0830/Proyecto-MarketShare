import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
const FeedbackTab = () => {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      {/*AÑADIR FORM PARA ENVIAR INFO*/}
      <form onSubmit={handleSubmit(onsubmit)}>
        <Controller
          name="feedback"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              disabled //desactivado
              label="Retroalimentacion"
              autoFocus
              id="feedback"
              variant="outlined"
              fullWidth
              multiline
              error={!!errors.name}
              helperText={errors?.name?.message}
            />
          )}
        ></Controller>
        <button type="submit">Generar</button>
      </form>
    </>
  );
};
export default FeedbackTab;
