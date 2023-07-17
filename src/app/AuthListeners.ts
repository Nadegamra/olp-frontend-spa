import { listenerMiddleware } from './Store'

import apiSlice from '../features/api/ApiSlice'
import store from './Store'
import { personalDataFetched, sessionEnded, sessionRefreshed } from '../features/auth/AuthSlice'

listenerMiddleware.startListening({
    matcher: apiSlice.endpoints.login.matchFulfilled,
    effect: (action, listenerApi) => {
        store.dispatch(sessionRefreshed(action.payload))
        // store.dispatch(apiSlice.endpoints.profile.initiate(undefined))
    }
})

listenerMiddleware.startListening({
    matcher: apiSlice.endpoints.refreshToken.matchFulfilled,
    effect: (action, listenerApi) => {
        store.dispatch(sessionRefreshed(action.payload))
    }
})

listenerMiddleware.startListening({
    matcher: apiSlice.endpoints.profile.matchFulfilled,
    effect: (action, listenerApi) => {
        store.dispatch(personalDataFetched(action.payload))
    }
})
