import apiService from "./ApiService";

export const RevenuesService = {
    total: async () => {
        return apiService.get('revenue')
    },
    totalMonth: async (month) => {
        return apiService.get(`revenue/month/${month}`)
    },
    totalYear: async (from,to) => {
        return apiService.get(`revenue/day?from=${from}&&to=${to}`)
    },
}
