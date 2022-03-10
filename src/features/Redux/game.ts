import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type GameInitialState = {
    currentGame: Game;
    currentGameId: string;
}

const initialState: GameInitialState = {
    currentGameId: "",
    currentGame: {
        moderator: "",
        players: [],
        balance: 0,
        numberOfPlayers: 0,
        allRoles: []
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