import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoleNamesRef } from '~/src/services';

export type RolesInitialState = {
    allRoles: Array<RoleNamesRef>;
    numberOfAvailableRoles: number;
}

const initialState: RolesInitialState = {
    allRoles: [],
    numberOfAvailableRoles: 0
}

const availableRoles = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    addAvailableRole: (state, action: PayloadAction<RoleNamesRef>) => {
      if(state.allRoles.includes(action.payload)) return;
      state.allRoles = [ ...state.allRoles, action.payload ];
      state.numberOfAvailableRoles = state.numberOfAvailableRoles - 1;
    },
    removeAvailableRole: (state, action: PayloadAction<RoleNamesRef>) => {
      state.allRoles = state.allRoles.filter(role => role !== action.payload);
      state.numberOfAvailableRoles = state.numberOfAvailableRoles + 1;
    },
    clearAvailableRoles: (state) => {
      state.allRoles = [];
    },
    decreaseAvailableRoles: (state) => {
      state.numberOfAvailableRoles = state.numberOfAvailableRoles - 1;
    },
    increaseAvailableRoles: (state) => {
      state.numberOfAvailableRoles = state.numberOfAvailableRoles + 1;
    },
    setNumberOfAvailableRoles: (state, action: PayloadAction<number>) => {
      state.numberOfAvailableRoles = action.payload
    }
  }
})

export const { addAvailableRole, clearAvailableRoles, removeAvailableRole, decreaseAvailableRoles, increaseAvailableRoles, setNumberOfAvailableRoles } = availableRoles.actions

export default availableRoles.reducer;