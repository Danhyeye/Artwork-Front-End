import apiService from "./ApiService";

export const OrdersService = {
    get: async () => {
        return apiService.get(`orders`);
    },
    getOrders: async (userId) => {
        return apiService.get(`orders/user?userId=${userId}`);
    },
    createOrder: async (order) => {
        return apiService.post(`orders`, order);
    },
}

