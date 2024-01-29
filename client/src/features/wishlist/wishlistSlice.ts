import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WishlistItem } from "../../app/models/wishlist";
import agent from "../../app/api/agent";

interface WishlistState {
    items: WishlistItem[] | null;
    status: string;
}

const initialState: WishlistState = {
    items: null,
    status: 'idle'
};

//3 asynkThunks (fetch, add, remove)
export const fetchWishlistAsync = createAsyncThunk<WishlistItem[]>(
    'wishlist/fetchWishlistAsync',
    async (_: any, thunkAPI: any) => {
        try {
            return await agent.Wishlist.wishlist();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});            
        }
    }
)
export const addToWishlistAsync = createAsyncThunk<WishlistItem, { productId: number, name?: string  }>(
    'wishlist/addToWishlistAsync',
    async ({ productId }, thunkAPI: any) => {
        try {
            return await agent.Wishlist.add(productId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const removeFromWishlistAsync = createAsyncThunk<WishlistItem[], { productId: number, name?: string }>(
    'wishlist/removeFromWishlistAsync',
    async ({ productId }, thunkAPI: any) => {
        try {
            return await agent.Wishlist.remove(productId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }

)
//extraReducers su zbog asynkThunks
export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
         setWishlist: (state, action) => {
            state.items = action.payload;
            state.status = 'idle';
         },
         clearWishlist: (state) => {
            state.items = null;
         }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWishlistAsync.pending, (state) => {
            state.status = 'pendingFetchingWishlist';
        });
        builder.addCase(addToWishlistAsync.pending, (state, action) => {
            state.status = 'pendingAddingToWishlist' + action.meta.arg.productId + action.meta.arg.name;
        });
        builder.addCase(removeFromWishlistAsync.pending, (state, action) => {
            state.status = 'pendingRemovingFromWishlist' + action.meta.arg.productId + action.meta.arg.name;
        });
        builder.addCase(fetchWishlistAsync.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'idle';
        });
        builder.addCase(addToWishlistAsync.fulfilled, (state, action) => {
            state.items?.push(action.payload);
            state.status = 'idle';
        });
        builder.addCase(removeFromWishlistAsync.fulfilled, (state, action) => {
            const { productId } = action.meta.arg;
            const itemIndex = state.items?.findIndex(i => i.productId === productId);
            if (itemIndex === -1 || itemIndex === undefined) return;
            state.items!.splice(itemIndex, 1);
            state.status = 'idle';
        });
        builder.addCase(fetchWishlistAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });
        builder.addCase(addToWishlistAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });
        builder.addCase(removeFromWishlistAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });

    }
})

export const { setWishlist, clearWishlist } = wishlistSlice.actions;


