import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoleCloudFirestore } from '~/src/services';

export type InitialState = {
    availableRoles: RoleCloudFirestore[];
    pickedRoles: RoleCloudFirestore[];
    allRoles: RoleCloudFirestore[];
}

const initialState: InitialState = {
    availableRoles: [],
    pickedRoles: [],
    allRoles: [],
}

const availableRoles = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addAvailableRole: (state, action: PayloadAction<RoleCloudFirestore>) => {
      state.allRoles = [ ...state.availableRoles, action.payload ];
      state.availableRoles = [ ...state.availableRoles, action.payload ];
    },
    pickRole: (state, action: PayloadAction<string>) => {
      state.availableRoles = [ ...state.availableRoles.filter(role => role.ref === action.payload) ];
      state.pickedRoles = [ ...state.availableRoles.filter(role => role.ref !== action.payload) ];
    },
    removeRole: (state, action: PayloadAction<string>) => {
        state.availableRoles = [ ...state.availableRoles.filter(role => role.ref === action.payload) ];
        state.pickedRoles = [ ...state.availableRoles.filter(role => role.ref !== action.payload) ];
      },
  }
})

export const { addAvailableRole } = availableRoles.actions

export default availableRoles.reducer;