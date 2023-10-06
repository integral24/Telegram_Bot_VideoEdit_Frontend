import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { FormContainer } from './components/formContainer';
import { EForm } from './types/propses';
import { nameForm } from './constants';
import { SendButton } from './components/sendButton';
import { useAppDispatch } from './state/hookRtk';
import { getFromLocalstoragePsiho } from './state/formSlicePsiho';
import { getFromLocalstorageVill } from './state/formSliceVill';

function App() {
	const [typeForm, setTypeForm] = useState<null | EForm>(null);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (typeForm === EForm.PSIHO) {
			dispatch(getFromLocalstoragePsiho());
		}
		if (typeForm === EForm.VILL) {
			dispatch(getFromLocalstorageVill());
		}
	}, [dispatch, typeForm]);

	return (
		<div id="form" className="app-form">
			<div className="app-form__top-buttons">
				<button
					onClick={() => setTypeForm(EForm.PSIHO)}
					className={cn({
						btn: true,
						select: typeForm === 'psiho',
					})}
				>
					Психология
				</button>
				<button
					onClick={() => setTypeForm(EForm.VILL)}
					className={cn({
						btn: true,
						select: typeForm === 'vill',
					})}
				>
					Vill
				</button>
			</div>
			{typeForm && (
				<>
					<h3>Форма для {nameForm[typeForm]}</h3>
					<FormContainer typeForm={typeForm} />
					<br></br>
					<br></br>
					<SendButton departament={typeForm} />
					<br></br>
				</>
			)}
		</div>
	);
}

export default App;
