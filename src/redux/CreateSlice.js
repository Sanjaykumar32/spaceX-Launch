import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  spaceData: [],
}

export const counterSlice = createSlice({
  name: 'spaceXdata',
  initialState,
  reducers: {
    spaceXdata: (state, action) => {
          state.spaceData.push(action.payload)
    },
  },
})

export const { spaceXdata } = counterSlice.actions

export default counterSlice.reducer


