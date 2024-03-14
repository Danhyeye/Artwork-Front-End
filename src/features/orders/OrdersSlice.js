import { OrdersThunk } from "./OrdersThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialOrders = JSON.parse(localStorage.getItem("orders")) || [];

export const ordersSlice = createSlice({
    name: "orders",
    initialState: { value: initialOrders },
    reducers: {
        addOrders: (state, action) => {
            localStorage.setItem("orders", JSON.stringify(state.value));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(OrdersThunk.getAllOrders.fulfilled, (state, action) => {
                console.log("call api success", action?.payload);
                state.value = action?.payload;
            })
            .addCase(OrdersThunk.getAllOrders.rejected, (state, action) => {
                console.log("call api failed");
            })
            .addCase(OrdersThunk.getAllOrders.pending, (state, action) => {
                console.log("call api pending");
            })

    }
})
export default ordersSlice.reducer;
export const { addOrders } = ordersSlice.actions;
