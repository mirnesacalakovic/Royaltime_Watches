import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, createTheme, ThemeProvider } from "@mui/material";
import { currencyFormat } from "../../app/util/util";
import { useAppSelector } from "../../app/store/configureStore";

interface Props {
    subtotal?: number;
}

export default function BasketSummary({subtotal}: Props) {
    const {basket} = useAppSelector(state => state.basket);

    if (subtotal === undefined) 
        subtotal = basket?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
    const deliveryFee = subtotal > 50000 ? 0 : 5000;

    const theme = createTheme({
        components: {
          MuiTableContainer: {
            styleOverrides: {
              // Name of the slot
              root: {
                // Some CSS
                backgroundColor: '#FFFBF5',
                borderRadius: '10px',
              },
            },
          },
        }
    });
    
    return (
        <>
            <ThemeProvider theme={theme}>
                <TableContainer component={Paper} variant={'outlined'} style={{borderRadius: '10px', backgroundColor: '#FFFBF5'}}>
                    <Table>
                        <TableBody>
                            <TableRow >
                                <TableCell colSpan={2} >Subtotal</TableCell>
                                <TableCell align="right" >{currencyFormat(subtotal)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2}>Delivery fee*</TableCell>
                                <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2}>Total</TableCell>
                                <TableCell align="right">{currencyFormat(subtotal + deliveryFee)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <span style={{fontStyle: 'italic'}}>*Orders over $500 qualify for free delivery</span>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </ThemeProvider>
        </>
    )
}