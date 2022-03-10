import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoleNamesRef } from '~/src/services';

export type RolesInitialState = {
    allAssignableRoles: Array<RoleNamesRef>;
    numberOfAssignableRoles: number;
}

const initialState: RolesInitialState = {
  allAssignableRoles: [],
  numberOfAssignableRoles: 0
}

const assignableRoles = createSlice({
  name: 'assignableRoles',
  initialState,
  reducers: {
    addAssignableRole: (state, action: PayloadAction<RoleNamesRef>) => {
      if(state.allAssignableRoles.includes(action.payload)) return;
      state.allAssignableRoles = [ ...state.allAssignableRoles, action.payload ];
      state.numberOfAssignableRoles = state.numberOfAssignableRoles - 1;
    },
    removeAssignableRole: (state, action: PayloadAction<RoleNamesRef>) => {
      state.allAssignableRoles = state.allAssignableRoles.filter(role => role !== action.payload);
      state.numberOfAssignableRoles = state.numberOfAssignableRoles + 1;
    },
    clearAssignableRoles: (state) => {
      state.allAssignableRoles = [];
    },
    decreaseAssignableRoles: (state) => {
      state.numberOfAssignableRoles = state.numberOfAssignableRoles - 1;
    },
    increaseAssignableRoles: (state) => {
      state.numberOfAssignableRoles = state.numberOfAssignableRoles + 1;
    },
    setNumberOfAssignableRoles: (state, action: PayloadAction<number>) => {
      state.numberOfAssignableRoles = action.payload
    }
  }
})

export const { 
  addAssignableRole,
  clearAssignableRoles,
  decreaseAssignableRoles,
  increaseAssignableRoles,
  removeAssignableRole,
  setNumberOfAssignableRoles
} = assignableRoles.actions

export default assignableRoles.reducer;