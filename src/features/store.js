import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {artWorkSlice} from "./artworks/ArtworksSlice";
import {cartsSlice} from "./carts/CartsSlice";

const rootReducer = combineReducers({
    artworks: artWorkSlice.reducer,
    carts: cartsSlice.reducer,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})

export default store
export {store};
