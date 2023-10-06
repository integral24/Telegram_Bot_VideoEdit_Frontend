import { configureStore } from '@reduxjs/toolkit';
import formSlicePsiho from './formSlicePsiho';
import formSliceVill from './formSliceVill';

export const store = configureStore({
	reducer: {
		formSlicePsiho,
		formSliceVill,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
