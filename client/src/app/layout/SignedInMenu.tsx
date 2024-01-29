import { Button, Menu, Fade, MenuItem } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { signOut } from "../../features/account/AccountSlice";
import { clearBasket } from "../../features/basket/basketSlice";
import { Link } from "react-router-dom";
import { clearWishlist } from "../../features/wishlist/wishlistSlice";

export default function SignedInMenu() {

    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.account); 
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


  return (
    <>
      <Button
        color= 'inherit'
        onClick={handleClick} 
        sx={{typography: 'h6'}}>
        {user?.email}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        sx={{borderRadius: '10px', padding: '10px', marginTop: '5px'}}
      >
        { !(user?.roles?.includes('Admin') || user?.roles?.includes('Brand')) && 
            <MenuItem component={Link} to='/orders'>My orders</MenuItem>
        }
        
        <MenuItem component={Link} to='/settings'>Settings</MenuItem>
        <MenuItem onClick={() => {
          dispatch(signOut())
          dispatch(clearBasket())
          dispatch(clearWishlist())
          }}>Logout</MenuItem>
      </Menu>
    </>
  );


}