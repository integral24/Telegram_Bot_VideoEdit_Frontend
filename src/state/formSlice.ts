import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { IFormState } from '../types/propses';
import { ls } from '../utils/ls';

const initialState: IFormState = {
	title: '',
	time: '',
	date: '',
	video: '',
	extraVideo: [],
	present: '',
	extraPresent: [],
	getCourse: '',
	loading: '',
	description: '',
	tags: '',
};

// state, action: PayloadAction<string>

export const formSlice = createSlice({
	name: 'form',

	initialState,
	reducers: {
		setValue(
			state,
			action: PayloadAction<{ name: keyof IFormState; value: string }>
		) {
			const { name, value } = action.payload;
			switch (name) {
				case 'date':
					state.date = value;
					break;
				case 'time':
					state.time = value;
					break;
				case 'title':
					state.title = value;
					break;
				case 'video':
					state.video = value;
					break;
				case 'present':
					state.present = value;
					break;
				case 'getCourse':
					state.getCourse = value;
					break;
				case 'loading':
					state.loading = value;
					break;
				case 'description':
					state.description = value;
					break;
				case 'tags':
					state.tags = value;
					break;
			}
		},
		changeExtra(
			state,
			action: PayloadAction<{
				type: 'video' | 'present';
				value: string;
				idx: number;
			}>
		) {
			const { type, value, idx } = action.payload;
			if (type === 'video') state.extraVideo[idx] = value;
			if (type === 'present') state.extraPresent[idx] = value;
		},

		addExtraVideo(state) {
			state.extraVideo.push('');
		},
		addExtraPresent(state) {
			state.extraPresent.push('');
		},
		saveLocalstorage(state) {
			const extraVideo = state.extraVideo.filter((el) => el !== '');
			const extraPresent = state.extraPresent.filter((el) => el !== '');
			ls.set({ ...state, extraPresent, extraVideo });
		},
		setFromLocalstorage(state) {
			const stateLs: IFormState = ls.get();
			if (stateLs) {
				Object.keys(stateLs).forEach((key) => {
					const name = key as keyof IFormState;
					if (stateLs[name]) {
						state[name] = stateLs[name] as string & string[];
					}
				});
			}
		},
		clearState(state) {
			Object.keys(state).forEach((key) => {
				const name = key as keyof IFormState;
				if (name === 'extraPresent') state.extraPresent = [];
				else if (name === 'extraVideo') state.extraVideo = [];
				else {
					state[name] = '';
				}
			});
			ls.clear();
		},
	},
});

export const {
	addExtraVideo,
	addExtraPresent,
	changeExtra,
	setValue,
	saveLocalstorage,
	setFromLocalstorage,
	clearState,
} = formSlice.actions;

export default formSlice.reducer;

export const selectorCommon = createSelector(
	(state: RootState) => state.formSlice,
	(slice) => {
		const { getCourse, description, loading, tags } = slice;
		return {
			getCourse,
			description,
			loading,
			tags,
		};
	}
);
