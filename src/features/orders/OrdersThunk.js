import { createAsyncThunk } from "@reduxjs/toolkit";
import { OrdersService } from "../../services/OrdersService";

export const OrdersThunk = {
    getAllOrders: createAsyncThunk("orders/get-all", async (userId) => {
        return OrdersService.getOrders(userId);
    })
}
