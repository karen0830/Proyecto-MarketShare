import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";

/**
 * The shipping tab.
 */
function ShippingTab() {
  const methods = useFormContext();
  const { control } = methods;
  return (
    <div>
      <div className="flex -mx-4">
        <Controller
          name="width"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16 mx-4"
              label="Ancho"
              autoFocus
              id="width"
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          name="height"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16 mx-4"
              label="Alto"
              id="height"
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          name="depth"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16 mx-4"
              label="Profundo"
              id="depth"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </div>

      <Controller
        name="weight"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Peso"
            id="weight"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="extraShippingFee"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Tarifa de envío adicional"
            id="extraShippingFee"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            fullWidth
          />
        )}
      />
    </div>
  );
}

export default ShippingTab;
