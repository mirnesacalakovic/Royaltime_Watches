import "./login.css";
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from '../../app/api/agent';
import { toast } from 'react-toastify';
import { useEffect } from "react";
import Aos from "aos";


export default function Register() {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {isSubmitting, errors, isValid}, setError} = useForm({
      mode: 'all',
    })

    useEffect( () => {
        Aos.init({duration: 2500});
    }, [])


    function handleApiErrors(errors: any) {
        if (errors) {
            errors.forEach((error: string) => {
                if(error.includes('Password')){
                    setError('password', {message: error})
                }else if(error.includes('Email')){
                    setError('email', {message: error});
                }else if (error.includes('Username')){
                    setError('username', {message: error});
                }
            });
        }
    }


  return (

        <>
            <div className="reg-cont">
                <img data-aos='fade-right' style={{width: '60%', height: 'calc(100vh - 100px)', borderRadius: '10px 0 0 10px'}} className="reg-img" src="/images/register.jpg" alt="" />
            
                <Container className="paper" component={Paper} maxWidth="sm" sx={{
                display: 'flex', 
                flexDirection:'column', 
                padding: '10px',
                borderRadius: '0 10px 10px 0',
                alignItems:'center', 
                alignSelf: 'center',
                bgcolor: 'primary.light', 
                color: 'text.main',
                width: '40%', 
                height: 'calc(100vh - 100px)'
                }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" 
                    onSubmit={handleSubmit((data: FieldValues) => agent.Account.register(data)
                        .then(() => {
                            toast.success('Registration successful');
                            navigate(`/registerSuccess?email=${data["email"]}`);
                        })
                        .catch(error => handleApiErrors(error)))} 
                    noValidate sx={{ mt: 1 }}>
                    <TextField
                    margin="normal"
                    fullWidth
                    label="Username"
                    autoFocus
                    {...register('username', {required: 'Username is required'})} 
                    error={!!errors.username}
                    helperText={errors?.username?.message as string}
                    />
                    <TextField
                    margin="normal"
                    fullWidth
                    label="Email"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                            message: 'Not a valid email address!'
                        }
                        })} //koristimo iz useForma
                    error={!!errors.email}
                    helperText={errors?.email?.message as string}
                    />
                    <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    {...register('password', {
                        required: 'Password is required',
                        pattern: {
                            value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                            message: 'Password does not meet complexity requirments'
                        }

                    })}
                    error={!!errors.password}
                    helperText={errors?.password?.message as string}
                    />
                    
                    <LoadingButton
                    loading={isSubmitting}
                    disabled={!isValid}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor: '#ED7D31', color: '#EEF0E5', '&:hover': {backgroundColor: '#c15811'} }}
                    >
                    Register
                    </LoadingButton>
                    <Grid container>
                    <Grid item>
                        <Link to='/login' style={{color: '#c15811'}}>
                        {"Already have an account? Sign In!"}
                        </Link>
                    </Grid>
                    </Grid>
                </Box>
            </Container>
            
            
            </div>
      
            
        </>
            
        
      
  );
}