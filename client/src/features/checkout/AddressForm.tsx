import { Typography, Grid, Checkbox, FormControlLabel, createTheme, ThemeProvider } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";

/*interface Props extends UseControllerProps {
  label: string;
  disabled: boolean;
}*/
const theme = createTheme({
  components: {
    MuiGrid: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          backgroundColor: '#FFFBF5',
          color: '#163020',
          borderRadius: '10px',
        },
      },
    },
  }
});

export default function AddressForm() {
  const { control, formState } = useFormContext();
  const { field } = useController({control: control, name: "saveAddress", disabled: !formState.isDirty , defaultValue: false});
  return (
    <>
    <ThemeProvider theme={theme}> 
      <Typography variant="h6" sx={{marginBottom: '2rem'}}>
        Shipping address
      </Typography>

        <Grid container spacing={3} color='#163020' sx={{borderRadius: '10px', color:'#163020'}}>
          <Grid item xs={12} sm={12} sx={{borderRadius: '10px', color: '#163020'}}>
            <AppTextInput control={control} name="fullName" label="Full name"/>
          </Grid>
          <Grid item xs={12}>
            <AppTextInput control={control} name="address1" label="Address 1"/>
          </Grid>
          <Grid item xs={12}>
            <AppTextInput control={control} name="address2" label="Address 2"/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name="city" label="City"/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name="state" label="State"/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name="zip" label="Zip"/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name="country" label="Country"/>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel 
              control={
                  <Checkbox 
                      {...field}
                      checked={field.value}
                      color='secondary'
                      disabled={!formState.isDirty}
                  />
              }
              label = "Save this as default address"
          />
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}