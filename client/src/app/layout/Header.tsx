import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Toolbar } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './styles.css';

// eslint-disable-next-line react-refresh/only-export-components
export const midLinks= [
    {title: 'catalog', path: '/catalog'},
    {title: 'about', path: '/about'},
    {title: 'contact', path: '/contact'}
]
// eslint-disable-next-line react-refresh/only-export-components
export const rightLinks= [
    {title: 'login', path: '/login'},
    {title: 'register', path: '/register'}
]

export interface Props{
  darkMode: boolean;
  handleThemeChange: () => void;
}

const navStyles = { 
  color: 'inherit', 
  textDecoration:'none',
  typography: 'h6',
  '&:hover': {
    color: 'grey.500'
  },
  '&.active': {
    color: 'text.secondary'
  },
  underline: 'none'
}

export default function Header({ darkMode, handleThemeChange }: Props) {
  const {basket} = useAppSelector(state => state.basket);
  const { items } = useAppSelector(state => state.wishlist);
  const {user} = useAppSelector(state => state.account);

  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
  const itemFavCout = items?.length;
  return (
      //<ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ bgcolor: 'primary.light', color: 'text.primary', '&:hover': 'ED7D31', width: '100%', minWidth: '100%', margin: '0px'}}>
          <Toolbar sx={{display: 'flex', flexWrap: 'wrap', justifyContent:'space-between', alignItems: 'center'}}>

            <Box display='flex' alignItems='center'>
              <Link to='/'>
                <img style={{width: '130px', marginTop: '10px'}} src="images/logo.png" alt="Royaltime logo" />
              </Link>
              {/* <FormControlLabel checked={darkMode} onChange={handleThemeChange} label
                control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
              /> */}
            </Box>

            <List className="header-list" sx={{ display: 'flex', gap:'0.5rem'}}>
                {midLinks.map(({ title, path }) => {
                    if ((user?.roles?.includes('Brand') || (user?.roles?.includes('Admin'))) && title === 'catalog')
                      return null;

                    return (
                      <ListItem
                          component={NavLink}
                          to={path}
                          key={path}
                          sx={navStyles}
                          className="header-list-item"
                      >
                          {title.toUpperCase()}
                      </ListItem>
                    )
                })}
                {user && (user.roles?.includes('Admin') || (user.roles?.includes('Brand'))) &&
                    <ListItem
                        component={NavLink}
                        to={'/inventory'}
                        sx={navStyles}
                        className="header-list-item"
                    >
                        INVENTORY
                    </ListItem>
                }
                {user && user.roles?.includes('Admin') &&
                    <ListItem
                      component={NavLink}
                      to={'/brands'}
                      sx={navStyles}
                      className="header-list-item"
                    >
                        AMBASSADORS
                    </ListItem>
                }
            </List>
            
                <Box display='flex' alignItems='center'>
                { !(user?.roles?.includes('Admin') || user?.roles?.includes('Brand')) && (
                  <>
                    <IconButton component={Link} to="basket" size='large' edge='start' color='inherit' sx={{mr: 2}}>
                      <Badge badgeContent={itemCount} color='secondary'>
                        <ShoppingCart />
                      </Badge>
                    </IconButton>
                    <IconButton component={Link} to="wishlist" size='large' edge='start' color='inherit' sx={{mr: 2}}>
                      <Badge badgeContent={itemFavCout} color='secondary'>
                        <FavoriteBorderIcon /> 
                      </Badge>
                    </IconButton>
                  </>
                ) 
                }
            
                {user ? (
                  <SignedInMenu />
                ) : (
                  <List sx={{ display: 'flex' }}>
                    {rightLinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}
                            className="header-list-item"
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
                )}

                <IconButton sx={{ ml: 1 }} onClick={handleThemeChange} color="inherit">
                  {darkMode ? <Brightness7Icon sx={{ color: "white" }} /> : <Brightness4Icon />}
                </IconButton>
                
              </Box>
              

          </Toolbar>
      </AppBar>
      //</ThemeProvider>
  );
}