import { useEffect, useState } from "react";
import { WishlistItem } from "../../app/models/wishlist";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat, truncate } from "../../app/util/util";
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, IconButton, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { addBasketItemAsync } from "../basket/basketSlice";
import { removeFromWishlistAsync, addToWishlistAsync } from "./wishlistSlice";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
    wish: WishlistItem;
}

export default function WishlistItemCard({wish}: Props) {
    const {status} = useAppSelector(state => state.basket);
    const { items, status: wishlistStatus } = useAppSelector(state => state.wishlist);
    const dispatch = useAppDispatch();
    const [loadingWishlist, setLoadingWishlist] = useState(false);


    useEffect(() => {
        if((wishlistStatus.includes('pendingAddingToWishlist' + wish.productId + 'add')) || wishlistStatus.includes('pendingRemovingFromWishlist' + wish.productId + 'rem')) setLoadingWishlist(true);
        else setLoadingWishlist(false);
    }, [wishlistStatus, wish.productId, items]);

    return (
        <Card 
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: 'primary.light',
            }}
        >
            <CardHeader
                title = {truncate(wish.name, 55)}
                titleTypographyProps={{
                    sx: {fontWeight: "bold", color: 'primary', fontSize: '0.8rem'}
                }}
            />
            <CardMedia
                sx={{ height: 140, backgroundSize: "contain", bgcolor: 'white' }}
                image={wish.pictureUrl}
                title={wish.name}
            />
            <CardContent>
                <Typography gutterBottom color='secondary.dark' variant="h5">
                {currencyFormat(wish.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {wish.brand} / {wish.model} / {wish.gender}
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
                    <LoadingButton sx={{color: 'text.primary'}} loading={status === 'pendingAddItem' + wish.productId} onClick={() => dispatch(addBasketItemAsync({productId: wish.productId}))} size="small">Add to cart</LoadingButton>
                    <Button sx={{color: 'text.primary'}} component={Link} to={`/catalog/${wish.productId}`} size="small">View</Button>
                </div>

                {
                    (!loadingWishlist && wish) ? (
                        <IconButton
                            onClick={() => {
                                items?.some(x => x.productId === wish.productId) ? dispatch(removeFromWishlistAsync({ productId: wish.productId, name: 'rem' })) : dispatch(addToWishlistAsync({ productId: wish.productId, name: 'add'  }))
                            }}
                        >
                            {items?.some(x => x.productId === wish.productId) ? <FavoriteIcon sx={{color: 'secondary.dark'}}/> : <FavoriteBorderIcon sx={{color: 'secondary.dark'}}/>}
                        </IconButton>
                    ) : (
                        <CircularProgress color="secondary" key={wish.productId} size="1.5rem" />
                    )
                }
            </CardActions>
        </Card>
    );
}