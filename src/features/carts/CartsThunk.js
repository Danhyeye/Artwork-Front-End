import {createAsyncThunk} from "@reduxjs/toolkit";
import {CartsService} from "../../services/CartsService";

export const CartsThunk = {
    getAllCarts: createAsyncThunk("carts/get-all", async () => {
        return CartsService.getCarts();
    }),
    getCart: createAsyncThunk("carts/get-by-id", async (id) => {
        return CartsService.getCart(id);
    }),
    addCart: createAsyncThunk("carts/create-artworks",  async (artwork) => {
        return CartsService.addCart(artwork);
    }),
    deleteCart: createAsyncThunk("carts/delete-by-id", async (id) => {
        return CartsService.deleteCart(id);
    })
}
