import { configureStore } from '@reduxjs/toolkit';
import formSlice from './formSlice';

export const store = configureStore({
	reducer: {
		formSlice,
	},
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
