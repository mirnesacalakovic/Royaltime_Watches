import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails(){
    const {basket, status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const {id} = useParams<{id: any}>();
    const product = useAppSelector(state => productSelectors.selectById(state, id!));
    const {status: productStatus} = useAppSelector(state => state.catalog)
    const [quantity, setQuantity] = useState(0);
    const item = basket?.items.find(i => i.productId == product?.id);
     

    useEffect( () => {
        if (item) setQuantity(item.quantity);
        if(!product && id) dispatch(fetchProductAsync(parseInt(id)));
    }, [id, item, dispatch, product]);

    function handleInputChange(event: any) {
        if(event.target.value >= 0) {
            setQuantity(parseInt(event.target.value));
            
        }
    }

    function handleUpdateCart() {
        if(!product) return;
        if(!item || quantity > item.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({productId: product.id!, quantity: updatedQuantity}))
        } else {
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({productId: product.id!, quantity: updatedQuantity}))
        }
    }

    if (productStatus.includes('pending')) return <LoadingComponent message='Loading product...'/>

    if(!product) return <NotFound/>

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt="{product.name}" style={{width: '100%'}}/>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h4">{product.name}</Typography>{/* ovaj product je product iz statea */}
                <Divider sx={{mb: 2}}/>
                <Typography variant="h4" color='secondary'>${(product.price/100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{fontWeight: 'bold'}}>Name</TableCell>
                                <TableCell colSpan={3}>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{fontWeight: 'bold'}}>Description</TableCell>
                                <TableCell colSpan={3}>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{fontWeight: 'bold'}}>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            
                                <TableCell sx={{fontWeight: 'bold'}}>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{fontWeight: 'bold'}}>Gender</TableCell>
                                <TableCell>{product.gender}</TableCell>
                            
                                <TableCell sx={{fontWeight: 'bold'}}>Model</TableCell>
                                <TableCell>{product.model}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{fontWeight: 'bold'}}>Dial Color</TableCell>
                                <TableCell>{product.dialColor}</TableCell>
                            
                                <TableCell sx={{fontWeight: 'bold'}}>Strap Type</TableCell>
                                <TableCell>{product.strapType}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{fontWeight: 'bold'}}>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2} margin="10px 0">
                    <Grid item xs={6}>
                        <TextField
                        onChange={handleInputChange}
                            variant="outlined"
                            type="number"
                            label="Quantity in Cart"
                            fullWidth
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton 
                            disabled={item?.quantity === quantity || !item && quantity === 0}
                            loading={status.includes('pending')}
                            onClick={handleUpdateCart}
                            sx={{height: '55px'}}
                            color="primary"
                            size="large"
                            variant="contained"
                            fullWidth
                        >
                            {item ? "Update quantity" : "Add to Cart"}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}