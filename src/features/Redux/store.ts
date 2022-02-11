import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Game } from '@services'

export type InitialState = {
    currentGame: Game;
    currentGameId: string;
}

const initialState: InitialState = {
    currentGameId: "",
    currentGame: {
        moderator: "",
        players: []
    }
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setCurrentGameId: (state, action: PayloadAction<string>) => {
      state.currentGameId = action.payload
    },
  }
})

export const { setCurrentGameId } = counterSlice.actions

export const store = configureStore({
  reducer: counterSlice.reducer
})