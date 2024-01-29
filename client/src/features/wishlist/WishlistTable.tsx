import { Grid, Typography } from "@mui/material";
import { WishlistItem } from "../../app/models/wishlist";
import WishlistItemCard from "./WishlistItemCard";
import { isEmptyArray } from "formik";

interface Props {
    wishes: WishlistItem[];
    isWishlist?: boolean;
}

export default function WishlistTable({wishes}: Props) {

    if(isEmptyArray(wishes)) return <Typography sx={{ color: 'secondary.main', fontFamily: 'Salsa', fontSize: '2.5rem',  textAlign: 'center', alignSelf: 'center', justifyContent: 'center', display: 'flex'}}>Your wishlist is empty, go fill it!</Typography>
    

    return (
        <>
        <Typography sx={{ color: 'secondary.main', fontFamily: 'Salsa', fontSize: '2.5rem',  textAlign: 'center', alignSelf: 'center', justifyContent: 'center', display: 'flex', marginBottom: '1rem'}}>This is your wishlist, make it come true!</Typography>
        <Grid container xs={12} sm={12} md={12} lg={12} xl={12} spacing={4}>
            {wishes.map((wish, index) => (
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={index}>
                    <WishlistItemCard wish={wish} />
                </Grid>
            ))}
        </Grid></>
    );
}
