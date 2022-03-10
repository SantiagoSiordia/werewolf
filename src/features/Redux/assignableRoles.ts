import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoleNamesRef } from '~/src/services';

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

export type RolesInitialState = {
    allAssignableRoles: Array<RoleNamesRef>;
    numberOfAssignableRoles: number;
    availableRoles: PartialRecord<RoleNamesRef, number>
}

const initialState: RolesInitialState = {
  allAssignableRoles: [],
  numberOfAssignableRoles: 0,
  availableRoles: {}
}

const assignableRoles = createSlice({
  name: 'assignableRoles',
  initialState,
  reducers: {
    addAssignableRole: (state, action: PayloadAction<RoleNamesRef>) => {

      // @ts-expect-error
      if(state.availableRoles[action.payload]) state.availableRoles[action.payload] = state.availableRoles[action.payload] + 1;
      else state.availableRoles[action.payload] = 1;

      if(state.allAssignableRoles.includes(action.payload)) return;
      state.allAssignableRoles = [ ...state.allAssignableRoles, action.payload ];
      state.numberOfAssignableRoles = state.numberOfAssignableRoles - 1;
    },
    removeAssignableRole: (state, action: PayloadAction<RoleNamesRef>) => {

      // @ts-expect-error
      if(state.availableRoles[action.payload]) state.availableRoles[action.payload] = state.availableRoles[action.payload] - 1;

      state.allAssignableRoles = state.allAssignableRoles.filter(role => role !== action.payload);
      state.numberOfAssignableRoles = state.numberOfAssignableRoles + 1;
    },
    clearAssignableRoles: (state) => {
      state.allAssignableRoles = [];
      state.availableRoles = {};
    },
    decreaseAssignableRoles: (state, action: PayloadAction<RoleNamesRef>) => {
      
      const value = state.availableRoles[action.payload];
      if(value) state.availableRoles[action.payload] = value + 1;
      
      state.numberOfAssignableRoles = state.numberOfAssignableRoles - 1;
    },
    increaseAssignableRoles: (state, action: PayloadAction<RoleNamesRef>) => {

      const value = state.availableRoles[action.payload];
      if(value) state.availableRoles[action.payload] = value - 1;

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