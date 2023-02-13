import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@/app/store'

export interface BasicState {
  theme: 'light' | 'dark'
}

const initialState: BasicState = {
  theme: 'light',
}

export const basicSlice = createSlice({
  name: 'basic',
  initialState,
  reducers: {
    updateTheme: (state, { payload }: PayloadAction<BasicState['theme']>) => {
      state.theme = payload
    },
  },
})

export const { updateTheme } = basicSlice.actions

export const selectTheme = (state: RootState) => state.basic.theme

export default basicSlice.reducer
