import apiService from "./ApiService";

export const NoticeService = {
    getNotice: async (userId) => {
        return apiService.get(`notices/user?userId=${userId}`);
    }
}

