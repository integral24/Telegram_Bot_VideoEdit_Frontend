import { Fragment } from 'react';
import { TextField } from '../../ui/TextField';
import { AreaField } from '../../ui/AreaField';
import {
	ICommon,
	IFelds,
	IParamsHandler,
	TCnEvent,
	keyCommon,
} from '../../../types/propses';
import { useAppDispatch, useAppSelector } from '../../../state/hookRtk';
import {
	addExtraVideo,
	addExtraPresent,
	changeExtra,
	setValue,
	selectorCommon,
} from '../../../state/formSlice';

const labelList: ICommon = {
	loading: 'Описание для загрузки на ГК:',
	description: 'ТЗ, вырезки, комментарии:',
	tags: 'Теги через пробел:',
};

interface IProps {
	debounceSaveLs: () => void;
}

export const PsiForm: React.FC<IProps> = (props): JSX.Element => {
	const dispatch = useAppDispatch();

	const common = useAppSelector(selectorCommon);

	const video = useAppSelector((state) => state.formSlice.video);
	const getCourse = useAppSelector((state) => state.formSlice.getCourse);
	const present = useAppSelector((state) => state.formSlice.present);
	const extraPresent = useAppSelector((state) => state.formSlice.extraPresent);
	const extraVideo = useAppSelector((state) => state.formSlice.extraVideo);

	const inputHandler = (
		event: TCnEvent,
		name: IParamsHandler,
		idx?: number
	) => {
		const { value } = event.target;

		if (name === 'extraVideo' && typeof idx === 'number') {
			dispatch(changeExtra({ type: 'video', value, idx }));
		} else if (name === 'extraPresent' && typeof idx === 'number') {
			dispatch(changeExtra({ type: 'present', value, idx }));
		} else {
			dispatch(setValue({ name, value }));
		}
		props.debounceSaveLs();
	};

	const addFieldHandler = (type: 'video' | 'present') => {
		if (type === 'present' && extraPresent.length < 4) {
			dispatch(addExtraPresent());
		}

		if (type === 'video' && extraVideo.length < 4) {
			dispatch(addExtraVideo());
		}
	};

	return (
		<>Ссылка на ГК:
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
						disabled={extraVideo.length >= 4 || video.length < 1}
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
						disabled={extraPresent.length >= 4 || present.length < 1}
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
				return key === 'loading' || key === 'description' ? (
					<Fragment key={key}>
						{labelList[key as keyCommon]}
						<AreaField
							plaseholder={key}
							value={common[key as keyCommon]}
							setValue={(e) => inputHandler(e, key)}
							name={key}
							className="field area"
						/>
					</Fragment>
				) : (
					<Fragment key={key}>
						{labelList[key as keyCommon]}
						<TextField
							plaseholder={key}
							value={common[key as keyCommon]}
							setValue={(e) => inputHandler(e, key as keyCommon)}
							name={key as keyof IFelds}
							className="field input"
						/>
					</Fragment>
				);
			})}
		</>
	);
};
