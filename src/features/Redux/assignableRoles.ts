import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoleNamesRef } from '~/src/services';

export type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

export type RolesInitialState = {
    allAssignableRoles: Array<RoleNamesRef>;
    numberOfAssignableRoles: number;
    availableRoles: PartialRecord<RoleNamesRef, number>;
    balance: number;
}

const initialState: RolesInitialState = {
  allAssignableRoles: [],
  numberOfAssignableRoles: 0,
  availableRoles: {},
  balance: 0
}

const assignableRoles = createSlice({
  name: 'assignableRoles',
  initialState,
  reducers: {
    addAssignableRole: (state, action: PayloadAction<{
      roleRef: RoleNamesRef,
      points: number;
    }>) => {

      // @ts-expect-error
      if(state.availableRoles[action.payload.roleRef]) state.availableRoles[action.payload.roleRef] = state.availableRoles[action.payload] + 1;
      else state.availableRoles[action.payload.roleRef] = 1;

      if(state.allAssignableRoles.includes(action.payload.roleRef)) return;
      state.allAssignableRoles = [ ...state.allAssignableRoles, action.payload.roleRef ];
      state.numberOfAssignableRoles = state.numberOfAssignableRoles - 1;
      state.balance = state.balance + action.payload.points
    },
    removeAssignableRole: (state, action: PayloadAction<{
      roleRef: RoleNamesRef,
      points: number;
    }>) => {

      // @ts-expect-error
      if(state.availableRoles[action.payload.roleRef]) state.availableRoles[action.payload.roleRef] = state.availableRoles[action.payload.roleRef] - 1;

      state.allAssignableRoles = state.allAssignableRoles.filter(role => role !== action.payload.roleRef);
      state.numberOfAssignableRoles = state.numberOfAssignableRoles + 1;
      state.balance = state.balance - action.payload.points
    },
    clearAssignableRoles: (state) => {
      state.allAssignableRoles = [];
      state.availableRoles = {};
      state.balance = 0;
    },
    decreaseAssignableRoles: (state, action: PayloadAction<{
      roleRef: RoleNamesRef,
      points: number;
    }>) => {
      
      const value = state.availableRoles[action.payload.roleRef];
      if(value) state.availableRoles[action.payload.roleRef] = value + 1;
      
      state.numberOfAssignableRoles = state.numberOfAssignableRoles - 1;

      state.balance = state.balance + action.payload.points
    },
    increaseAssignableRoles: (state, action: PayloadAction<{
      roleRef: RoleNamesRef,
      points: number;
    }>) => {

      const value = state.availableRoles[action.payload.roleRef];
      if(value) state.availableRoles[action.payload.roleRef] = value - 1;

      state.numberOfAssignableRoles = state.numberOfAssignableRoles + 1;

      state.balance = state.balance - action.payload.points
    },
    setNumberOfAssignableRoles: (state, action: PayloadAction<number>) => {
      state.numberOfAssignableRoles = action.payload
    },
    assignRole: (state, action: PayloadAction<RoleNamesRef>) => {
      const value = state.availableRoles[action.payload];
      if(value) state.availableRoles[action.payload] = value - 1;
    }
  }
})

export const { 
  addAssignableRole,
  clearAssignableRoles,
  decreaseAssignableRoles,
  increaseAssignableRoles,
  removeAssignableRole,
  setNumberOfAssignableRoles,
  assignRole
} = assignableRoles.actions

export default assignableRoles.reducer;