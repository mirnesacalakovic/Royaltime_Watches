import "./login.css";
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './AccountSlice';
import { useEffect } from "react";
import Aos from "aos";


// TODO remove, this demo shouldn't need to reset the theme.


export default function Login() {
  
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const {register, handleSubmit, formState: {isSubmitting, errors, isValid}} = useForm({
      mode: 'all',
    })

    useEffect( () => {
      Aos.init({duration: 1000});
    }, [])


    async function submitForm(data: FieldValues){
      try {
        await dispatch(signInUser(data));
        navigate(location.state?.from || '/catalog');
      } catch (error) {
        console.log(error);
      }
    }

  return (
        
    <>
        <div className="reg-cont">
              <img data-aos='fade-right' style={{width: '60%', height: 'calc(100vh - 100px)', borderRadius: '10px 0 0 10px'}} className="log-img" src="/images/login.jpg" alt="" />
              <Container className="forma" component={Paper}  sx={{
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
                Login
              </Typography>
              <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Username"
                  autoFocus
                  {...register('username', {required: 'Username is required'})} //koristimo iz useForma
                  error={!!errors.username}
                  helperText={errors?.username?.message as string}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Password"
                  type="password"
                  {...register('password', {required: 'Password is required'})}
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
                  Sign In
                </LoadingButton>
                <Grid container>
                  <Grid item >
                    <Link to='/register' style={{color: '#c15811'}} > 
                      {"Don't have an account? Register"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
          </Container>
        </div>
    </>
          
        
        

      
  );
}