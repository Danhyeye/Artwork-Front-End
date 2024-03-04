import apiService from "./ApiService";

export const CartsService = {
    getCarts: async () => {
        return apiService.get('Carts')
    },
    getCart: async (id) => {
        return apiService.get(`Carts/${id}`)
    },
    addCart: async (artwork) => {
        return apiService.post('Carts', artwork)
    },
    deleteCart: async (id) => {
        return apiService.delete(`Carts/${id}`)
    }
}
