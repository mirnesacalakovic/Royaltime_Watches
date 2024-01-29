import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Dialog, DialogActions, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useNavigate } from 'react-router-dom';
import Grid2 from '@mui/material/Unstable_Grid2';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
    children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function SettingsPage() {
    const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <Grid2 xs={12} sm={12} md={12} lg={12} xl={12} container 
        alignSelf="center" 
        display='flex' 
        flexDirection='row' 
        alignItems="center" 
        justifyContent="space-between"
        spacing={2}
      >
        
        <Grid2 xs={12} sm={12} md={4} lg={6} xl={6}  sx={{backgroundColor: '#FFFBF5', fontFamily:'BlinkMacSystemFont', 
        borderRadius: '10px'}} >
          <Typography variant='h3' sx={{ color:"#ED7D31", fontFamily:'Salsa' }}>Settings</Typography>
          <Box
            sx={{ flexGrow: 1, bgcolor: '#FFFBF5', display: 'flex', height: 224, marginTop: "20px", width: '100%' }}
          >
            <Tabs
              textColor='secondary'
              indicatorColor='secondary'
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              <Tab sx={{fontFamily: 'Montserrat', color: '#163020'}} label="Account" {...a11yProps(0)} />
              <Tab sx={{fontFamily: 'Montserrat', color: '#163020'}} label="Security" {...a11yProps(1)} />
            </Tabs>

            <TabPanel value={value} index={0}>
              <Button
                  variant='contained'
                  color='error'
                  sx={{ width: '100%', backgroundColor: "#ff0003", fontFamily: 'Montserrat' }}
                  onClick={handleClickOpen}
              >
                  Delete account
              </Button>
              <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-describedby="alert-dialog-slide-description"
                  sx={{borderRadius: '10px', padding: '20px', marginTop: '5px', fontFamily: 'Montserrat'}}
              >
                  <DialogTitle>{"Are you sure you want to delete your account?"}</DialogTitle>
                  <DialogActions sx={{ display: "flex", justifyContent: "space-between"}}>
                      <Button onClick={handleClose} variant="contained" style={{backgroundColor: '#163020', color: '#EEF0E5'}}>Cancel</Button>
                      <Button variant="outlined" color="error" sx={{}}
                          onClick={() => {
                            //   deleteProfile();
                              handleClose();
                              navigate('/');
                          }}
                      >DELETE</Button>
                  </DialogActions>
              </Dialog>
            </TabPanel>

            <TabPanel value={value} index={1}>
              <Button
                variant='contained'
                sx={{ width: '100%', backgroundColor: '#ED7D31', fontFamily: 'Montserrat', ':active': '#f0530f' }}
                onClick={() => {
                  navigate('/forgotPassword');
                }}
              >
                Reset password
              </Button>
            </TabPanel>
          </Box>
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
    </>
    
  );
}

export default SettingsPage;