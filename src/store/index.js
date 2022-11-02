import {configureStore} from '@reduxjs/toolkit'
import {emapdataApi} from './emapdata/emapdata.api'
import {setupListeners} from '@reduxjs/toolkit/query'
import {reqresApi} from "./reqres/reqres.api";

export const store = configureStore({
  reducer: {
    [emapdataApi.reducerPath]: emapdataApi.reducer,
    [reqresApi.reducerPath]: reqresApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(emapdataApi.middleware, reqresApi.middleware)
})

setupListeners(store.dispatch)
