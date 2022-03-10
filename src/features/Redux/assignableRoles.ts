import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoleNamesRef } from '~/src/services';

export type RolesInitialState = {
    allAssignableRole: Array<RoleNamesRef>;
    numberOfAssignableRole: number;
}

const initialState: RolesInitialState = {
  allAssignableRole: [],
  numberOfAssignableRole: 0
}

const assignableRoles = createSlice({
  name: 'assignableRoles',
  initialState,
  reducers: {
    addAssignableRole: (state, action: PayloadAction<RoleNamesRef>) => {
      if(state.allAssignableRole.includes(action.payload)) return;
      state.allAssignableRole = [ ...state.allAssignableRole, action.payload ];
      state.numberOfAssignableRole = state.numberOfAssignableRole - 1;
    },
    removeAssignableRole: (state, action: PayloadAction<RoleNamesRef>) => {
      state.allAssignableRole = state.allAssignableRole.filter(role => role !== action.payload);
      state.numberOfAssignableRole = state.numberOfAssignableRole + 1;
    },
    clearAssignableRoles: (state) => {
      state.allAssignableRole = [];
    },
    decreaseAssignableRoles: (state) => {
      state.numberOfAssignableRole = state.numberOfAssignableRole - 1;
    },
    increaseAssignableRoles: (state) => {
      state.numberOfAssignableRole = state.numberOfAssignableRole + 1;
    },
    setNumberOfAssignableRoles: (state, action: PayloadAction<number>) => {
      state.numberOfAssignableRole = action.payload
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