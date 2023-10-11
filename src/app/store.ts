import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/AuthSlice'
import apiSlice from '../features/api/ApiSliceAuth'

const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware)
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
