
import { Avatar, Box, Container, Paper, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import { LockOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

export default function BrandRegister() {
    const {register, handleSubmit, formState: {isSubmitting, errors, isValid}, setError} = useForm({
      mode: 'all',
    })

    function handleApiErrors(errors: any) {
        if (errors) {
            errors.forEach((error: string) => {
                if(error.includes('Password')){
                    setError('password', {message: error})
                }else if(error.includes('Email')){
                    setError('email', {message: error});
                }else if (error.includes('Brand')){
                    setError('brand', {message: error});
                }
            });
        }
    }
    
    const theme = createTheme({
        components: {
          
          MuiContainer:{
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
          MuiAvatar:{
            styleOverrides: {
              // Name of the slot
              root: {
                // Some CSS
                backgroundColor: '#ED7D31',
              },
            },
          },
          MuiButton:{
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

    return (
        <>
        
        <Typography variant="h4" display='flex' justifyContent='center' margin='1rem' >Create Brand Ambassadors</Typography>
            <ThemeProvider theme={theme}> 
            <Container component={Paper} maxWidth='sm' sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ m: 1, bgcolor: '#ED7D31' }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form"
                    onSubmit={handleSubmit(data => agent.Account.brandRegister(data)
                        .then(() => {
                            toast.success('Registration successful.');
                        })
                        .catch(error => handleApiErrors(error)))}
                    noValidate sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Brand Name"
                        autoFocus
                        {...register('username', { required: 'Brands name is required' })}
                        error={!!errors.username}
                        helperText={errors?.username?.message as string}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        {...register('email', { 
                            required: 'Email is required',
                            pattern: {
                                value: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
                                message: 'Not a valid email address'
                            }
                        })}
                        error={!!errors.email}
                        helperText={errors?.email?.message as string}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        {...register('password', { 
                            required: 'password is required',
                            pattern: {
                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                                message: 'Password does not meet complexity requirements'
                            }
                        })}
                        error={!!errors.password}
                        helperText={errors?.password?.message as string}
                    />
                    
                    <LoadingButton
                        disabled={!isValid}
                        loading={isSubmitting}
                        type="submit"
                        fullWidth
                        variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: '#ED7D31', color: '#FFFBF5'}}
                    >
                        Register
                    </LoadingButton>
                </Box>
            </Container>
            </ThemeProvider>
        
        </>

    );
    
}