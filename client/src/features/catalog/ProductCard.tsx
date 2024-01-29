import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, IconButton, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { currencyFormat, truncate } from "../../app/util/util";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addToWishlistAsync, removeFromWishlistAsync } from "../wishlist/wishlistSlice";
import { useEffect, useState } from "react";

interface Props {
    product: Product;
}

export default function ProductCard({product} : Props) {

    const {status} = useAppSelector(state => state.basket);
    const { items, status: wishlistStatus } = useAppSelector(state => state.wishlist);
    const dispatch = useAppDispatch();
    const [loadingWishlist, setLoadingWishlist] = useState(false);


    useEffect(() => {
        if((wishlistStatus.includes('pendingAddingToWishlist' + product.id + 'add')) || wishlistStatus.includes('pendingRemovingFromWishlist' + product.id + 'rem')) setLoadingWishlist(true);
        else setLoadingWishlist(false);
    }, [wishlistStatus, product.id, items]);

    return (
        <Card 
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: 'primary.light',
                borderRadius: '13px',
            }}
        >
        <CardHeader
            title = {truncate(product.name, 55)}
            titleTypographyProps={{
                sx: {fontWeight: "bold", color: 'primary', fontSize: '0.8rem'}
            }}
        />
        <CardMedia
            sx={{ height: 140, backgroundSize: "contain", bgcolor: 'white' }}
            image={product.pictureUrl}
            title={product.name}
        />
        <CardContent>
            <Typography gutterBottom color='secondary.dark' variant="h5">
            {currencyFormat(product.price)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.model} / {product.gender}
            </Typography>
        </CardContent>
        
        <CardActions
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <div>
                <LoadingButton sx={{color: 'text.primary'}} loading={status === 'pendingAddItem' + product.id} onClick={() => dispatch(addBasketItemAsync({productId: product.id}))} size="small">Add to cart</LoadingButton>
                <Button sx={{color: 'text.primary'}} component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
            </div>

            {
                (!loadingWishlist && product) ? (
                    <IconButton
                        onClick={() => {
                            items?.some(x => x.productId === product.id) ? dispatch(removeFromWishlistAsync({ productId: product.id, name: 'rem' })) : dispatch(addToWishlistAsync({ productId: product.id, name: 'add'  }))
                        }}
                    >
                        {items?.some(x => x.productId === product.id) ? <FavoriteIcon sx={{color: 'secondary.dark'}}/> : <FavoriteBorderIcon sx={{color: 'secondary.dark'}}/>}
                    </IconButton>
                ) : (
                    <CircularProgress color="secondary" key={product.id} size="1.5rem" />
                )
            }
        </CardActions>
    </Card>
    );
}