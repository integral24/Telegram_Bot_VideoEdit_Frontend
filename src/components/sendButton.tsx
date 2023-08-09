import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../state/hookRtk';
import { clearState } from '../state/formSlice';

export const SendButton: FC = (): JSX.Element => {
	const data = useAppSelector((state) => state.formSlice);
	const dispatcjh = useAppDispatch();
	const sendHandler = () => {
		if (window.Telegram && data) {
			console.log(JSON.stringify(data));

			window.Telegram.WebApp.sendData(JSON.stringify(data));
			dispatcjh(clearState());
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
