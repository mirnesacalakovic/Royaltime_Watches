import { LoadingButton } from "@mui/lab";
import { Paper, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import * as Yup from "yup";
import { useQuery } from "../../app/hooks/useQuery";
import ValidationError from "./ValidationError";
import agent from "../../app/api/agent";
import { ResetPasswordDto } from "../../app/models/user";
import { signOut } from "./AccountSlice";
import { useAppDispatch } from "../../app/store/configureStore";

function ResetPassword() {
    const email = useQuery().get('email') as string;
    const token = useQuery().get('token') as string;
    const dispatch = useAppDispatch();

    const theme = createTheme({
        components: {
          MuiTableContainer: {
            styleOverrides: {
              // Name of the slot
              root: {
                // Some CSS
                color: '#163020',
                backgroundColor: '#FFFBF5',
                borderRadius: '10px',
              },
              
            },
          },
        }
    });

    return (
        <Grid2 xs={12} sm={12} md={12} lg={12} xl={12} container
            sx={{
                marginTop: "50px",
                fontFamily: "Montserrat, sans-serif",
                height: '450px',
                display: "flex",
                flexDirection: "row",
            }}
        >
            <Grid2 xs={12} sm={12} md={6} lg={6} xl={6}
                component={Paper}
                elevation={3}
                sx={{
                    padding: "20px",
                    height: "fit-content",
                    width: "fit-content",
                    maxWidth: "100%",
                    margin: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    borderRadius: "10px",
                    backgroundColor: '#FFFBF5',
                    color: '#163020',
                }}
            >

                <Typography
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "500",
                        fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1.2rem" },
                        color:'#163020'
                    }}
                >
                    Enter your email and we will send you a link to reset your password
                </Typography>
                
                <Formik
                    onSubmit={(values, { setErrors }) => {
                        const dto: ResetPasswordDto = {
                            email: email,
                            token: token,
                            password: values.password,
                            confirmPassword: values.confirmPassword
                        };
                        agent.Account.resetPassword(dto)
                        .then(() => dispatch(signOut()))
                        .catch(error => setErrors({ error: error }))
                    }}
                    initialValues={{ password: '', confirmPassword: '', error: null }}
                    validationSchema={Yup.object({
                        password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
                        confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Passwords must match")
                    })}
                >
                    {({ isSubmitting, isValid, handleSubmit, dirty, errors }) => (
                        <Form style={{ 
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "15px",
                        }} onSubmit={handleSubmit}>
                            <Field name="password">
                                {(props: FieldProps) => (
                                    <ThemeProvider theme={theme}> 
                                        <TextField 
                                            {...props.field}
                                            label="Password"
                                            type="password"
                                            variant="outlined"
                                            sx={{
                                                width: "100%",
                                                fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1.2rem" },
                                            }}
                                            error={props.meta.touched && Boolean(props.meta.error)}
                                            helperText={props.meta.touched && props.meta.error}
                                        />
                                    </ThemeProvider>
                                )}
                            </Field>

                            <Field name="confirmPassword">
                                {(props: FieldProps) => (
                                    <ThemeProvider theme={theme}> 
                                        <TextField 
                                            {...props.field}
                                            label="Confirm Password"
                                            type="password"
                                            variant="outlined"
                                            sx={{
                                                width: "100%",
                                                fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1.2rem" },
                                            }}
                                            error={props.meta.touched && Boolean(props.meta.error)}
                                            helperText={props.meta.touched && props.meta.error}
                                        />
                                    </ThemeProvider>
                                )}
                            </Field>

                            <ErrorMessage name="error" render={() => <ValidationError errors={errors.error} />} />

                            <LoadingButton
                                variant="contained"
                                color="secondary"
                                loading={isSubmitting}
                                disabled={!isValid || isSubmitting || !dirty}
                                type="submit"
                                sx={{
                                    width: "100%",
                                    fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1.2rem" }
                                }}
                            >
                                SUBMIT
                            </LoadingButton>
                        </Form>
                    )}
                </Formik>
            </Grid2>
            <Grid2 xs={0} sm={0} md={6} lg={6} xl={6}>
          <img 
            style={{
              height: "100%",
              width: "100%",
              marginTop: '-3rem'
            }} 
            src="/images/clock.png" alt="" 
          />
        </Grid2>
      </Grid2>
    );
}

export default ResetPassword;