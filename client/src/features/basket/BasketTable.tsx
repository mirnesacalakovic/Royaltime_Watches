import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, ThemeProvider, createTheme } from "@mui/material";
import { removeBasketItemAsync, addBasketItemAsync } from "./basketSlice";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { BasketItem } from "../../app/models/basket";

interface Props {
    items: BasketItem[];
    isBasket?: boolean;
}
const theme = createTheme({
    components: {
      MuiTableContainer: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            color: '#163020',
            backgroundColor: '#FFFBF5',
            borderRadius: '10px',
          },
          
        },
      },
    }
});
export default function BasketTable ({items, isBasket = true}: Props) {
    const {status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    return (
        <ThemeProvider theme={theme}> 
            <TableContainer component={Paper} style={{borderRadius: '10px', backgroundColor: '#FFFBF5'}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                        {isBasket && 
                        <TableCell align="right"></TableCell>}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {items.map(item => (
                        <TableRow
                        key={item.productId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            <Box display='flex' alignItems='center'>
                                <img src={item.pictureUrl} alt={item.name} style={{height: 50, margin: 10}}></img>
                                <span>{item.name}</span>
                            </Box>
                        </TableCell>
                        <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
                        <TableCell align="center">
                            {isBasket && 
                                <LoadingButton 
                                onClick={() => dispatch(removeBasketItemAsync({productId: item.productId, quantity: 1, name: 'rem' }))} 
                                loading={status.includes('pendingRemoveItem' + item.productId + 'rem')}  
                                color="error" size="small"  >
                                    <Remove style={{color:'#ED7D31'}}/>
                                </LoadingButton> }  
                            {item.quantity}
                            {isBasket && 
                                <LoadingButton 
                                onClick={() => dispatch(addBasketItemAsync({productId: item.productId}))} 
                                loading={status === ('pendingAddItem' + item.productId)}  
                                color="secondary" size="small">
                                    <Add style={{color:'#f0530f'}}/>
                                </LoadingButton> }
                            
                        </TableCell>
                        <TableCell align="right">{((item.price*item.quantity)/100).toFixed(2)}</TableCell>
                        {isBasket && 
                            <TableCell align="right">
                                <LoadingButton  color='error' size="small"
                                onClick={() => dispatch(removeBasketItemAsync({productId: item.productId, quantity: item.quantity, name: 'del'}))} 
                                loading={status === 'pendingRemoveItem' + item.productId + 'del'} >
                                    <Delete />
                                </LoadingButton>
                            </TableCell> }
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
    )
}