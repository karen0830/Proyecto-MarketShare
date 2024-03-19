import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";

/**
 * The basic info tab.
 */
function BasicInfoTab() {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  return (
    <div>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            required
            label="Nombre"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="description"
            label="Descripción"
            type="text"
            multiline
            rows={5}
            variant="outlined"
            fullWidth
          />
        )}
      />
      <button>Mejorar Descripcion</button>
    </div>
  );
}

export default BasicInfoTab;
