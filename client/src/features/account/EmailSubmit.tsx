import { LoadingButton } from "@mui/lab";
import { Paper, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Field, FieldProps, Form, Formik } from "formik";
import * as Yup from "yup";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";

function EmailSubmit() {

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
                        color: '#163020',
                        fontWeight: "500",
                        fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1.2rem" },
                    }}
                >
                    Enter your email and we will send you a link to reset your password
                </Typography>
                
                <Formik
                    onSubmit={(values) => {
                        agent.Account.requestPasswordReset(values.email)
                        .then(() => {
                            toast.success("Check your email for the reset link");
                        })
                    }}
                    initialValues={{ email: '' }}
                    validationSchema={Yup.object({
                        email: Yup.string().required("Email is required").email("Email is invalid"),
                    })}
                >
                    {({ isSubmitting, isValid, handleSubmit, dirty }) => (
                        <Form style={{ width: "100%", color: "#163020" }} onSubmit={handleSubmit}>
                            <Field name="email" style={{color: '#163020'}}>
                                {(props: FieldProps) => (
                                    <ThemeProvider theme={theme}> 
                                        <TextField 
                                            {...props.field}
                                            label="Email"
                                            variant="outlined"
                                            sx={{
                                                width: "100%",
                                                color: '#163020',
                                                fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1.2rem" },
                                            }}
                                            error={props.meta.touched && Boolean(props.meta.error)}
                                            helperText={props.meta.touched && props.meta.error}
                                        />
                                        </ThemeProvider>
                                )}
                            </Field>

                            <LoadingButton
                                variant="contained"
                                color="secondary"
                                loading={isSubmitting}
                                disabled={!isValid || isSubmitting || !dirty}
                                type="submit"
                                sx={{
                                    width: "100%",
                                    fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1.2rem" },
                                    marginTop: "15px",
                                    backgroundColor: 'secondary.primary',
                                    '&disabled': 'transparent',
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

export default EmailSubmit;