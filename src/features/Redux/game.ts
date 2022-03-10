import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type InitialState = {
    currentGame: Game;
    currentGameId: string;
}

const initialState: InitialState = {
    currentGameId: "",
    currentGame: {
        moderator: "",
        players: [],
        balance: 0,
        numberOfPlayers: 0,
    }
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCurrentGameId: (state, action: PayloadAction<string>) => {
      state.currentGameId = action.payload
    },
  }
})

export const { setCurrentGameId } = gameSlice.actions

export default gameSlice.reducer;