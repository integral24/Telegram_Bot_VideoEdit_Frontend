import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../state/hookRtk';
import { clearState } from '../state/formSlice';

export const SendButton: FC = (): JSX.Element => {
	const data = useAppSelector((state) => state.formSlice);
	const dispatch = useAppDispatch();
	const sendHandler = () => {
		if (window.Telegram && data) {
      const extraPrepare = (arr: string[]) => {
        return arr.length > 0 ? '\n' + arr.join('\n') : '';
      }
      const newData = {
        title: !!data.title ? data.title : '',
        urgency: `${!!data.date ? data.date : ''} ${!!data.time ? data.time : ''}`.trim(),
        linkGC: !!data.getCourse ? data.getCourse : '',
        linkVideo: `${!!data.video ? data.video : ''} ${extraPrepare(data.extraVideo)}`.trim(),
        linkPresent: `${!!data.present ? data.present : ''} ${extraPrepare(data.extraPresent)}`.trim(),
        description: !!data.description ? data.description : '',
        loading: !!data.loading ? data.loading : '',
        tags: !!data.tags ? data.tags : '',
      }
      console.log(JSON.stringify(newData));
			window.Telegram.WebApp.sendData(JSON.stringify(newData));
			dispatch(clearState());
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
