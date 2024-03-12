import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";

/**
 * The pricing tab.
 */
function PricingTab() {
  const methods = useFormContext();
  const { control } = methods;
  return (
    <div>
      <Controller
        name="priceTaxExcl"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Precio sin impuestos"
            id="priceTaxExcl"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            type="number"
            variant="outlined"
            autoFocus
            fullWidth
          />
        )}
      />

      <Controller
        name="priceTaxIncl"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Precio con impuestos"
            id="priceTaxIncl"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            type="number"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="taxRate"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Tasa de impuesto"
            id="taxRate"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            type="number"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="comparedPrice"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Precio comparado"
            id="comparedPrice"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            type="number"
            variant="outlined"
            fullWidth
            helperText="Add a compare price to show next to the real price"
          />
        )}
      />
    </div>
  );
}

export default PricingTab;
