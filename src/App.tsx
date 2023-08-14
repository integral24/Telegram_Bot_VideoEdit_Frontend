import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { FormContainer } from './components/formContainer';
import { TForm } from './types/propses';
import { nameForm } from './constants';
import { SendButton } from './components/sendButton';
import { useAppDispatch } from './state/hookRtk';
import { setFromLocalstorage } from './state/formSlice';

function App() {
	const [typeForm, setTypeForm] = useState<null | TForm>(null);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setFromLocalstorage());

		const script = document.createElement('script');

		script.src = 'https://telegram.org/js/telegram-web-app.js';
		script.async = true;
		document.body.appendChild(script);

		// window.Telegram?.utils.sessionStorageSet('web-app', '{value: ok}');

		return () => {
			document.body.removeChild(script);
		};
	}, [dispatch]);

	return (
		<div id="form" className="app-form">
			<div className="app-form__top-buttons">
				<button
					onClick={() => setTypeForm('psiho')}
					className={cn({
						btn: true,
						select: typeForm === 'psiho',
					})}
				>
					Психология
				</button>
				{/* <button
					onClick={() => setTypeForm('vill')}
					className={cn({
						btn: true,
						select: typeForm === 'vill',
					})}
				>
					Vill
				</button> */}
			</div>
			{typeForm && (
				<>
					<h3>Форма для {nameForm[typeForm]}</h3>
					<FormContainer typeForm={typeForm} />
          <br></br>
          <br></br>
					<SendButton />
          <br></br>
				</>
			)}
		</div>
	);
}

export default App;
