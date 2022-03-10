import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoleNamesRef } from '~/src/services';

export type RolesInitialState = {
    allRoles: Array<RoleNamesRef>;
}

const initialState: RolesInitialState = {
    allRoles: [],
}

const availableRoles = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    addAvailableRole: (state, action: PayloadAction<RoleNamesRef>) => {
      if(state.allRoles.includes(action.payload)) return;
      state.allRoles = [ ...state.allRoles, action.payload ]
    },
    removeAvailableRole: (state, action: PayloadAction<RoleNamesRef>) => {
      state.allRoles = state.allRoles.filter(role => role !== action.payload);
    }
  }
})

export const { addAvailableRole, removeAvailableRole } = availableRoles.actions

export default availableRoles.reducer;