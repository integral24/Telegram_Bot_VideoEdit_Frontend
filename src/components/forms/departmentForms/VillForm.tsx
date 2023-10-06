import { Fragment } from 'react';
import { TextField } from '../../ui/TextField';
import { AreaField } from '../../ui/AreaField';
import {
	ICommon,
	ICommonVill,
	IFelds,
	IParamsHandler,
	IParamsHandlerVill,
	TCnEvent,
	keyCommon,
  keyCommonVill,
} from '../../../types/propses';
import { useAppDispatch, useAppSelector } from '../../../state/hookRtk';
import {
	addExtraVideoVill,
	addExtraPresentVill,
	changeExtraVill,
	setValueVill,
	selectorCommon,
} from '../../../state/formSliceVill';
// import useDebounce from '../../../hooks/useDebounce';
// import { AnyAction } from '@reduxjs/toolkit';

const labelList: ICommonVill = {

	description: 'ТЗ, вырезки, комментарии:',
	tags: 'Теги через пробел:',
};

interface IProps {
	debounceSaveLs: () => void;
}

export const VillForm: React.FC<IProps> = (props): JSX.Element => {
	const dispatch = useAppDispatch();
	const common = useAppSelector(selectorCommon);
	const video = useAppSelector((state) => state.formSliceVill.video);
	const getCourse = useAppSelector((state) => state.formSliceVill.getCourse);
	const present = useAppSelector((state) => state.formSliceVill.present);
	const extraPresent = useAppSelector(
		(state) => state.formSliceVill.extraPresent
	);
	const extraVideo = useAppSelector((state) => state.formSliceVill.extraVideo);

	// const useDispachDebounce = (fn: () => any) => useDebounce(100, fn);

	const inputHandler = (
		event: TCnEvent,
		name: IParamsHandlerVill,
		idx?: number
	) => {
		const { value } = event.target;

		if (name === 'extraVideo' && typeof idx === 'number') {
			// useDebounce(100, () =>
				dispatch(changeExtraVill({ type: 'video', value, idx }))
			// )();
			// useDispachDebounce(() =>
			// 	dispatch(changeExtraPsiho({ type: 'video', value, idx }))
			// );
		} else if (name === 'extraPresent' && typeof idx === 'number') {
			dispatch(changeExtraVill({ type: 'present', value, idx }));
		} else {
			dispatch(setValueVill({ name, value }));
		}
		props.debounceSaveLs();
	};

	const addFieldHandler = (type: 'video' | 'present') => {
		if (type === 'present' && extraPresent.length < 1) {
			dispatch(addExtraPresentVill());
		}

		if (type === 'video' && extraVideo.length < 10) {
			dispatch(addExtraVideoVill());
		}
	};

	return (
		<>
			Ссылка на ГК:
			<TextField
				name="getCourse"
				className="field"
				plaseholder="getCourse"
				setValue={(e) => inputHandler(e, 'getCourse')}
				value={getCourse}
			/>
			<div className="dinamic-elements">
				Ссылка на видео:
				<div className="wrapper">
					<TextField
						name="video"
						className="field"
						plaseholder="video"
						setValue={(e) => inputHandler(e, 'video')}
						value={video}
					/>
					<button
						className="btn add-field"
						disabled={extraVideo.length >= 9 || video.length < 1}
						onClick={() => addFieldHandler('video')}
					>
						+
					</button>
				</div>
				{extraVideo.map((v, i) => (
					<TextField
						key={i}
						name="video"
						className="field"
						plaseholder="video"
						setValue={(e) => inputHandler(e, 'extraVideo', i)}
						value={v}
					/>
				))}
			</div>
			<div className="dinamic-elements">
				Ссылка на презентацию:
				<div className="wrapper">
					<TextField
						name="present"
						className="field"
						plaseholder="present"
						setValue={(e) => inputHandler(e, 'present')}
						value={present}
					/>
					<button
						className="btn add-field"
						disabled={extraPresent.length >= 9 || present.length < 1}
						onClick={() => addFieldHandler('present')}
					>
						+
					</button>
				</div>
				{extraPresent.map((v, i) => (
					<TextField
						key={i}
						name="present"
						className="field"
						plaseholder="present"
						setValue={(e) => inputHandler(e, 'extraPresent', i)}
						value={v}
					/>
				))}
			</div>
			{Object.keys(common).map((key: string) => {
				return key === 'description' ? (
					<Fragment key={key}>
						{labelList[key as keyCommonVill]}
						<AreaField
							plaseholder={key}
							value={common[key as keyCommonVill]}
							setValue={(e) => inputHandler(e, key)}
							name={key}
							className="field area"
						/>
					</Fragment>
				) : (
					<Fragment key={key}>
						{labelList[key as keyCommonVill]}
						<TextField
							plaseholder={key}
							value={common[key as keyCommonVill]}
							setValue={(e) => inputHandler(e, key as keyCommonVill)}
							name={key as keyof IFelds}
							className="field input"
						/>
					</Fragment>
				);
			})}
		</>
	);
};
// function dispatch(arg0: {
// 	payload: { type: 'video' | 'present'; value: string; idx: number };
// 	type: 'form/changeExtraPsiho';
// }) {
// 	throw new Error('Function not implemented.');
// }
