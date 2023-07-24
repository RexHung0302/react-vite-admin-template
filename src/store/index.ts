import { configureStore } from '@reduxjs/toolkit';

// Slices
import authSlice from '@/store/slices/auth';

export const store = configureStore({
  reducer: {
    // ...
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
