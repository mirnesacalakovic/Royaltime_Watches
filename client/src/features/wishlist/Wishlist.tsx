import { Typography } from "@mui/material";
import { RootState, useAppSelector } from "../../app/store/configureStore";
import WishlistTable from "./WishlistTable";

export default function Wishlist(){
    const { items } = useAppSelector((state: RootState) => state.wishlist); // Specify the type of the state parameter

    if(items === null) return <Typography sx={{ color: 'secondary.main', fontFamily: 'Salsa', fontSize: '2.5rem',  textAlign: 'center', alignSelf: 'center', justifyContent: 'center', display: 'flex'}}>Your basket is empty, go fill it!</Typography>

    return (
        <>
           <WishlistTable wishes={items}/>
        </>
    )
}