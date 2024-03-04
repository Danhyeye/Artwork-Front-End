import apiService from "./ApiService";

export const ArtworksService = {
    getArtworks: async () => {
        return apiService.get('ArtWorks')
    },
    getArtwork: async (id) => {
        return apiService.get(`ArtWorks/${id}`)
    },
    createArtwork: async (artwork) => {
        return apiService.post('ArtWorks', artwork)
    },
    deleteArtwork: async (id) => {
        return apiService.delete(`ArtWorks/${id}`)
    }
}

