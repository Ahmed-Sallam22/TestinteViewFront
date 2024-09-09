import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'client' | 'admin';

interface UserState {
  role: UserRole;
}

const initialState: UserState = {
  role: 'client',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<UserRole>) => {
      state.role = action.payload;
      localStorage.setItem('userRole', action.payload); 
    },
    clearRole: (state) => {
      state.role = 'client'; 
      localStorage.removeItem('userRole'); 
    },
    setRoleFromStorage: (state) => {
      const storedRole = localStorage.getItem('userRole') as UserRole;
      state.role = storedRole || 'client'; 
    },
  },
});

export const { setRole, clearRole, setRoleFromStorage } = userSlice.actions;
export default userSlice.reducer;
