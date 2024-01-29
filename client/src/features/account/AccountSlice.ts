import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import { router } from "../../app/router/Routes";
import { toast } from "react-toastify";
import { setBasket } from "../basket/basketSlice";
import { setWishlist } from "../wishlist/wishlistSlice";

interface AccountState {
    user: User | null;
    users?: User[];
}

const initialState: AccountState = {
    user: null
}

export const signInUser = createAsyncThunk<User, FieldValues>(
    'account/signInUser',
    async (data, thunkAPI) => {
        try {
            const userDto = await agent.Account.login(data);
            const {basket, wishlistItems, ...user} = userDto; //basket je u svoj property, ostatak userDto-a je u user
            if(basket) thunkAPI.dispatch(setBasket(basket));
            if (wishlistItems) thunkAPI.dispatch(setWishlist(wishlistItems));
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            console.log(data);
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)


export const fetchCurrentUser = createAsyncThunk<User>(
    'account/fetchCurrentUser',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
        try {
            const userDto = await agent.Account.currentUser();
            const {basket, wishlistItems, ...user} = userDto; //basket je u svoj property, ostatak userDto-a je u user
            if(basket) thunkAPI.dispatch(setBasket(basket));
            if (wishlistItems) thunkAPI.dispatch(setWishlist(wishlistItems));
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }, 
    {
        condition: () => {
            if(!localStorage.getItem('user')) return false;
        }

    }
)

export const fetchAllBrands = createAsyncThunk<User[]>(
    'account/fetchAllBrands',
    async (_, thunkAPI) => {
        try {
            const brands = await agent.Account.fetchAllBrands();
            return brands;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            router.navigate('/');
        },
        setUser: (state, action) => {
            const claims = JSON.parse(atob(action.payload.token.split('.')[1]));
            const roles = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
            state.user = {...action.payload, roles: typeof(roles) === 'string' ? [roles] : roles};
        }
    }, 
    extraReducers: (builder => {
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem('user');
            toast.error ('Session expired - please login again'); 
            router.navigate('/');
        });
        builder.addCase(fetchAllBrands.fulfilled, (state, action) => {
            state.users = action.payload;
        });
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            const claims = JSON.parse(atob(action.payload.token.split('.')[1]));
            const roles = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
            state.user = {...action.payload, roles: typeof(roles) === 'string' ? [roles] : roles}; //payload je email i token
        });
        
        builder.addMatcher(isAnyOf(signInUser.rejected, fetchAllBrands.rejected), (_state, action) => {
            throw action.payload;
        });
        
    })
})

export const {signOut, setUser} = accountSlice.actions;