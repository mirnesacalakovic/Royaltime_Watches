import { Button, Grid, Typography } from "@mui/material";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";
import BasketTable from "./BasketTable";

export default function BasketPage() {
    const {basket } = useAppSelector(state => state.basket);

    
    if(basket === null || basket.items.length === 0) return  <Typography sx={{ color: 'secondary.main', fontFamily: 'Salsa', fontSize: '2.5rem',  textAlign: 'center', alignSelf: 'center', justifyContent: 'center', display: 'flex'}}>Your basket is empty, go fill it!</Typography>
 
    
    return (

        <>
            <BasketTable items={basket.items} />

            <Grid container>
                <Grid item xs={6}/>

                <Grid item xs={6}>
                    <BasketSummary /> 
                    <Button component={Link} to="/checkout" variant="contained" color='secondary'  fullWidth sx={{marginBottom: 10, backgroundColor: 'secondary.main', '&:hover': 'secondary.main'}}
                    >
                        Checkout
                    </Button>
                </Grid> 
            </Grid>
        </>
        
    );
}