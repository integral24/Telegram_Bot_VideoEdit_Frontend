import React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hookRtk';
import { clearStatePsiho } from '../state/formSlicePsiho';
import { clearStateVill } from '../state/formSliceVill';
import { EForm } from '../types/propses';
import {compress} from 'lz-string';

interface IProps {
	departament: EForm;
}

export const SendButton: React.FC<IProps> = (props): JSX.Element => {
	const dispatch = useAppDispatch();
	const { departament } = props;

	const cap = (str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	const dep = ('formSlice' + cap(departament)) as
		| 'formSlicePsiho'
		| 'formSliceVill';

	const data = useAppSelector((state) => state[dep]);

	const sendHandler = () => {
		if (window.Telegram && data) {
			const extraPrepare = (arr: string[]) => {
				return arr.length > 0 ? '\n\n' + arr.join('\n\n') : '';
			};
			const newData = {
				departament,
				isUrgency: data.isUrgency,
				title: !!data.title ? data.title : '',
				time: `${!!data.time ? data.time : ''}`.trim(),
				date: `${!!data.date ? data.date : ''}`.trim(),
				linkGC: !!data.getCourse ? data.getCourse : '',
				linkVideo: `${!!data.video ? data.video : ''}${extraPrepare(
					data.extraVideo
				)}`.trim(),
				linkPresent: `${!!data.present ? data.present : ''}${extraPrepare(
					data.extraPresent
				)}`.trim(),
				description: !!data.description ? data.description : '',
				loading: '',
				tags: !!data.tags ? data.tags : '',
			};

			if ('loading' in data) {
				newData['loading'] = data.loading ? data.loading : '';
			}

			try {
				const compressData = compress(JSON.stringify(newData));

				window?.Telegram?.WebApp.sendData(JSON.stringify(compressData));

				dispatch(clearStatePsiho());
				dispatch(clearStateVill());
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<>
			<button onClick={sendHandler} type="button" className="btn">
				ОТПРАВИТЬ ДАННЫЕ
			</button>
		</>
	);
};
