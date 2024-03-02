import { createSlice } from "@reduxjs/toolkit";
import artworks from "../data/Listartworks";
const initialArtwork = JSON.parse(localStorage.getItem("artworks")) || artworks;

export const userSlice = createSlice({
    name: "artworks",
    initialState: { value: initialArtwork },
    reducers: {
        addArtwork: (state, action) => {
            state.value.push(action.payload);
            localStorage.setItem("artworks", JSON.stringify(state.value));
        },
        deleteArtwork: (state, action) => {
            state.value = state.value.filter((artwork) => artwork.id !== action.payload.id);
            localStorage.setItem("artworks", JSON.stringify(state.value));
        },
    }
})
export default userSlice.reducer;
export const { addArtwork, deleteArtwork } = userSlice.actions;
