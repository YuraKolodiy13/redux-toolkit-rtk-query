import {createSlice} from '@reduxjs/toolkit'

const LS_FAV_KEY = 'rfk'

const initialState = {
  favourites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]')
}

export const emapdataSlice = createSlice({
  name: 'emapdata',
  initialState,
  reducers: {

  }
})

export const emapdataReducer = emapdataSlice.reducer